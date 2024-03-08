/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable complexity */
import {
    AigcSystemClose,
    AigcSystemRightFace,
    AigcSystemTipsFace,
    AigcSystemWarningFace,
    AigcSystemWrongFace,
} from 'loki-icon';
import cn from 'classnames';
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import {useFocusTrap} from '../_hooks/useFocusTrap';
import {useScrollbar} from '../_hooks/useScrollbar';
import {ModalContext} from './Context';
import ModalBody from './components/Body';
import ModalContent from './components/Content';
import ModalDialog from './components/Dialog';
import ModalFooter from './components/Footer';
import ModalHeader from './components/Header';
import Mask from './components/Mask';
import {modalFooterTheme, modalHeaderTheme, modalTheme} from './theme';
import type {ModalProps, ModalRefType} from './types';
const noop: React.CSSProperties = {};
const ModalIcons = {
    primary: (
        <AigcSystemTipsFace className="text-[--color-info-base]" />
    ),
    success: (
        <AigcSystemRightFace className="text-[--color-success-base]" />
    ),
    warning: (
        <AigcSystemWarningFace className="text-[--color-warning-base]" />
    ),
    error: (
        <AigcSystemWrongFace className="text-[--color-error-base]" />
    ),
};

const Modal = forwardRef<ModalRefType, ModalProps>(({
    title = '提示',
    type,
    open,
    mask = true,
    scrollable = false,
    appendToBody = false,
    children,
    className,
    style = noop,
    maskStyle,
    maskClassName = '',
    headerClassName = '',
    bodyClassName = '',
    footerClassName = '',
    theme: customTheme,
    okText = '确认',
    cancelText = '取消',
    zIndex = 900,

    // 按钮的 Button 类型
    okType = 'primary',
    cancelType = 'default',

    onOk,
    onCancel,
    showCancel = true,

    closable = true,
    keyboard = true,
    leaveHiddenModal = true,
    size = 'm',
    centered = false,
    footer = false,
    onClickLink,
    pure = false,
    onOpen,
    width,
    link,
    linkText = '了解更多',
    isPlayer = false,
    ...props
}, ref) => {
    const theme = {...modalTheme, ...customTheme};
    const {scrollbarHide, scrollbarReset} = useScrollbar();
    const {initFocusTrap, removeFocusTrap} = useFocusTrap();

    const [isOpenModal, setIsOpenModal] = useState(open);
    const [transitionDuration, setTransitionDuration] = useState<number>(0);

    const modalReference = useRef<HTMLDivElement>(null);

    const modalClasses = cn(theme.wrapper, className, isOpenModal ? theme.show : 'hidden');

    const openModal = () => {
        setIsOpenModal(true);
        onOpen?.();
        initFocusTrap(modalReference?.current as HTMLElement);
    };

    const closeModal = (e?: React.MouseEvent<HTMLElement>) => {
        setIsOpenModal(prev => {
            prev && onCancel?.(e);
            return false;
        });
        removeFocusTrap();
    };

    const handleMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== modalReference.current || !mask) {
            return;
        }
        closeModal(e);
    };

    const handleKeydown = useCallback(
        (e: KeyboardEvent) => {
            if (keyboard) {
                if (isOpenModal && e.key === 'Escape') {
                    closeModal();
                }
            }
        },
        [isOpenModal],
    );

    useEffect(
        () => {
            if (open) {
                openModal();
            } else {
                setTimeout(() => {
                    closeModal();
                }, transitionDuration);
            }
        },
        [open]
    );

    useEffect(
        () => {
            isOpenModal ? scrollbarHide() : scrollbarReset();
        },
        [isOpenModal]
    );

    useEffect(
        () => {
            window.addEventListener('keydown', handleKeydown);

            return () => {
                window.removeEventListener('keydown', handleKeydown);
            };
        },
        [handleKeydown]
    );
    if (style.zIndex === undefined) {
        Object.assign(style, {zIndex});
    }

    useImperativeHandle(ref, () => {
        return {
            open: openModal,
            close: closeModal,
            modalRef: modalReference,
        };
    });

    // TODO: 按钮类型抽出去
    const ModalIcon = type && ['primary', 'warning', 'success', 'error'].includes(type) ? ModalIcons[type] : null;
    const modalTemplate = (
        <ModalContext.Provider value={{isOpenModal: open, setTransitionDuration, scrollable}}>
            {(leaveHiddenModal || open) && (
                <div
                    id="loki-modal"
                    ref={modalReference}
                    className={modalClasses}
                    onClick={handleMaskClick}
                    {...(isOpenModal && {'aria-modal': 'true'})}
                    {...(!isOpenModal && {'aria-hidden': 'true'})}
                    style={style}
                    {...props}
                >
                    <ModalDialog size={size} centered={centered} width={width} isPlayer={isPlayer}>
                        <ModalContent pure={pure} isPlayer={isPlayer}>
                            {(!pure && !isPlayer) && (
                                <ModalHeader className={headerClassName}>
                                    <div className={modalHeaderTheme.title}>
                                        {type && (
                                            <span className="float-left mr-[5px] mt-[2px] text-[20px]">
                                                {ModalIcon}
                                            </span>
                                        )}
                                        {title}
                                    </div>
                                    {closable && (
                                        <button
                                            type="button"
                                            className={modalHeaderTheme.closeButton}
                                            onClick={e => closeModal(e)}
                                            aria-label="close"
                                        >
                                            <span className="text-[20px] text-[--color-text-tertiary] hover:text-[--color-text-quaternary]">
                                                <AigcSystemClose />
                                            </span>
                                        </button>
                                    )}
                                </ModalHeader>
                            )}
                            <ModalBody isPlayer={isPlayer} pure={pure} className={bodyClassName}>{children}</ModalBody>
                            {!pure ? (
                                (footer || footer === null) ? (
                                    footer
                                ) : (
                                    <ModalFooter className={footerClassName}>
                                        {link && (
                                            <a
                                                href={link}
                                                target="_blank"
                                                onClick={e => {onClickLink?.(e);}}
                                                className="mr-auto text-[14px] text-[--color-primary-text] hover:text-[--color-primary-text-hover] active:text-[--color-primary-active]"
                                                rel="noreferrer"
                                            >
                                                {linkText}
                                            </a>
                                        )}
                                        {showCancel && (
                                            <div>
                                                <Button type={cancelType} onClick={e => closeModal(e)}>
                                                    {cancelText}
                                                </Button>
                                            </div>
                                        )}
                                        <div className="ml-[--margin-sm]">
                                            <Button type={okType} onClick={e => onOk?.(e)}>
                                                {okText}
                                            </Button>
                                        </div>
                                    </ModalFooter>
                                )
                            ) : (
                                closable && (
                                    <button
                                        type="button"
                                        className={modalFooterTheme.closeButton}
                                        onClick={e => closeModal(e)}
                                        aria-label="close"
                                    >
                                        <AigcSystemClose />
                                    </button>
                                )
                            )}
                        </ModalContent>
                    </ModalDialog>
                </div>
            )}
            {mask && (leaveHiddenModal || open)
                && <Mask show={isOpenModal} style={maskStyle} zIndex={zIndex - 1} className={maskClassName} appendToBody={appendToBody} />}
        </ModalContext.Provider>
    );
    return <>{appendToBody ? ReactDOM.createPortal(modalTemplate, document.body) : modalTemplate}</>;
});

if (process.env.NODE_ENV !== 'production') {
    Modal.displayName = 'Modal';
}
export default Modal;
