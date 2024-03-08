import React, {createRef} from 'react';
import cn from 'classnames';
import useEvent from '../_hooks/useEvent';
import Portal from '../Portal';
import type {NotifyBaseProps, ConfigListType, Placements, Placement, NotifyBaseRef} from './interface';
import NotifyList from './NotifyList';
const defaultGetContainer = () => document.body;
const NotifyBase = React.forwardRef<NotifyBaseRef, NotifyBaseProps>((props, ref) => {
    const {
        collapse,
        getClassName,
        style,
        getContainer = defaultGetContainer,
        maxCount,
        ...rest
    } = props;
    const [configList, setConfigList] = React.useState<ConfigListType>([]);
    const onClose = useEvent((id: React.Key) => {
        const config = configList.find(item => item.id === id);
        if (config) {
            config.onClose?.(id);
            setConfigList(configList.filter(item => item.id !== id));
        }
    });
    const [placements, setPlacements] = React.useState<Placements>({} as Placements);
    React.useEffect(() => {
        const nextPlacements: Placements = {} as Placements;

        configList.forEach(config => {
            const {placement = 'topRight'} = config;

            if (placement) {
                nextPlacements[placement] = nextPlacements[placement] || [];
                nextPlacements[placement].push(config);
            }
        });

        Object.keys(placements).forEach(placement => {
            nextPlacements[placement] = nextPlacements[placement] || [];
        });

        setPlacements(nextPlacements);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configList]);

    React.useImperativeHandle(ref, () => ({
        open: (config: ConfigListType[number]) => {
            setTimeout(() => {
                setConfigList(prevList => {
                    let clone = [...prevList];
                    const index = clone.findIndex(item => item.id === config.id);
                    const innerConfig = {...config, nodeRef: createRef<HTMLDivElement>()};
                    if (index >= 0) {
                        clone[index] = innerConfig;
                    } else {
                        clone.unshift(innerConfig);
                    }

                    if (maxCount > 0 && clone.length > maxCount) {
                        clone = clone.slice(maxCount);
                    }
                    return clone;
                });
            }, 0);
        },
        close: key => {
            onClose(key);
        },
        destroy: () => {
            setConfigList([]);
        },
    }));

    const placementList = Object.keys(placements) as Placement[];
    return (
        <Portal getContainer={getContainer}>
            {
                placementList.map(placement => {
                    const placementConfigList = placements[placement];
                    return (
                        <NotifyList
                            key={placement}
                            configList={placementConfigList}
                            onClose={onClose}
                            placement={placement}
                            {...rest}
                            className={cn(rest.className, getClassName && getClassName(placement))}
                            style={style?.(placement)}
                            collapse={collapse}
                        />
                    );
                })
            }
        </Portal>
    );
});

export default NotifyBase;
