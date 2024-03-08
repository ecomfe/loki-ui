import React from 'react';
import type {NotifyBaseProps, NotifyAPI, MessageArgs, NotifyBaseRef, NoticeMethodsType} from '../NotifyBase/interface';
import NotifyBase from '../NotifyBase';

const useNotify = (params?: NotifyBaseProps) => {
    const {
        getContainer,
        maxCount,
        className,
        style,
        collapse,
        // renderNotifications,
        ...shareParams
    } = params || {};
    const notifiesRef = React.useRef<NotifyBaseRef>();
    const contextHolder = (
        <NotifyBase
            getContainer={getContainer}
            ref={notifiesRef}
            maxCount={maxCount}
            className={className}
            style={style}
            collapse={collapse}
            {...shareParams}
        // renderNotifications={renderNotifications}
        />
    );
    const api = React.useMemo<NoticeMethodsType & NotifyAPI>(() => {
        const keys = ['info', 'success', 'warning', 'error', 'loading'] as const;
        function open(config) {
            let reslove = (e?: any) => {};
            const retPromise = new Promise(res => {
                reslove = res;
            });
            const oldClose = config.onClose;
            config.onClose = id => {
                oldClose?.(id);
                reslove();
            };
            notifiesRef.current?.open({
                ...config,
                id: config.key || config.id || new Date().getTime().toString(),
            });
            return retPromise;
        }

        const methods: NoticeMethodsType = {} as NoticeMethodsType;
        keys.forEach(key => {
            methods[key] = (jointContent, duration, onClose) => {
                let config = {} as MessageArgs;
                if (jointContent && typeof jointContent === 'object' && 'content' in jointContent) {
                    config = jointContent;
                } else {
                    config = {
                        content: jointContent,
                    };
                }

                const mergedConfig = {
                    onClose: onClose,
                    duration: duration,
                    ...config,
                    type: key,
                };
                return open(mergedConfig);
            };
        });
        return {
            open,
            close: (key: React.Key) => {
                notifiesRef.current?.close(key);
            },
            destroy: (key: React.Key) => {
                if (key === undefined) {
                    notifiesRef.current?.destroy();
                } else {
                    notifiesRef.current?.close(key);
                }
            },
            ...methods,
        };
    }, []);
    return [api, contextHolder] as const;
};

export default useNotify;
