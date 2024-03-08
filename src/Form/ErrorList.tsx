/* eslint-disable max-len */
import classNames from 'classnames';
import {CSSTransition} from 'react-transition-group';
import * as React from 'react';
// import initCollapseMotion from '../_util/motion';
import {FormItemPrefixContext} from './context';
import type {ValidateStatus} from './FormItem';
import useDebounce from './hooks/useDebounce';

const EMPTY_LIST: React.ReactNode[] = [];

interface ErrorEntity {
    error: React.ReactNode;
    errorStatus?: ValidateStatus;
    key: string;
}

function toErrorEntity(
    error: React.ReactNode,
    prefix: string,
    errorStatus?: ValidateStatus,
    index: number = 0,
): ErrorEntity {
    return {
        key: typeof error === 'string' ? error : `${prefix}-${index}`,
        error,
        errorStatus,
    };
}

export interface ErrorListProps {
    fieldId?: string;
    help?: React.ReactNode;
    helpStatus?: ValidateStatus;
    errors?: React.ReactNode[];
    warnings?: React.ReactNode[];
    className?: string;
    onVisibleChanged?: (visible: boolean) => void;
}

const ErrorList: React.FC<ErrorListProps> = ({
    help,
    helpStatus,
    errors = EMPTY_LIST,
    warnings = EMPTY_LIST,
    className: rootClassName,
    fieldId,
    onVisibleChanged,
}) => {
    const {prefixCls} = React.useContext(FormItemPrefixContext);

    // const [, hashId] = useStyle(prefixCls);

    // const collapseMotion: CSSMotionProps = useMemo(() => initCollapseMotion(prefixCls), [prefixCls]);

    // We have to debounce here again since somewhere use ErrorList directly still need no shaking
    // ref: https://github.com/ant-design/ant-design/issues/36336
    const debounceErrors = useDebounce(errors);
    const debounceWarnings = useDebounce(warnings);

    const fullKeyList = React.useMemo<ErrorEntity[]>(() => {
        if (help !== undefined && help !== null) {
            return [toErrorEntity(help, 'help', helpStatus)];
        }

        return [
            ...debounceErrors.map((error, index) => toErrorEntity(error, 'error', 'error', index)),
            ...debounceWarnings.map((warning, index) => toErrorEntity(warning, 'warning', 'warning', index)),
        ];
    }, [help, helpStatus, debounceErrors, debounceWarnings]);
    const helpProps: {id?: string} = {};

    if (fieldId) {
        helpProps.id = `${fieldId}_help`;
    }
    const firstMountChangeRef = React.useRef(false);
    const visible = !!fullKeyList.length;
    React.useEffect(
        () => {
            if (visible) {
                firstMountChangeRef.current = true;
            }
  
            if (visible !== undefined) {
                if (firstMountChangeRef.current || visible) {
                    onVisibleChanged?.(visible);
                }
                firstMountChangeRef.current = true;
            }
        }, 
        [visible]
    );
    return (
        <CSSTransition
            in={!!fullKeyList.length}
            timeout={300}
            classNames={{
                appear: 'opacity-0 scale-y-50',
                appearActive: '!opacity-100 !scale-y-100 transition-[opacity,transform] transform origin-top duration-300 ease',
                enter: 'opacity-0 scale-y-50',
                enterActive: '!opacity-100 !scale-y-100 transition-[opacity,transform] transform origin-top duration-300 ease',
                exit: 'opacity-100 scale-y-100',
                exitActive: '!opacity-0 scale-y-50 transition-[opacity,transform] transform origin-top duration-300 ease',
                exitDone: 'opacity-0'
            }}
            appear
            unmountOnExit
            onExited={() => {
                onVisibleChanged(visible);
            }}
        >

            <div {...helpProps} role="alert">
                {
                    fullKeyList.map(itemProps => {
                        const {
                            key,
                            error,
                            errorStatus,
                        } = itemProps;

                        return (
                            <div
                                key={key}
                                className={classNames({
                                    'text-[--color-error-text] text-[14px] leading-[22px]': errorStatus,
                                })}
                                style={{...(errorStatus ? {} : {height: 0})}}
                            >
                                {error}
                            </div>
                        );
                    })
                }
            </div>
        </CSSTransition>
    );
};

export default ErrorList;
