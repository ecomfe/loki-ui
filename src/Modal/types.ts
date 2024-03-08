import {BaseComponent} from '@/types/baseComponent';
import {BaseButtonProps} from '../Button/interface';

interface ModalTheme {
    show?: string;
    static?: string;
    staticProperties?: string;
    wrapper?: string;
}

export interface ModalProps extends BaseComponent {
    open?: boolean;
    title?: string;
    centered?: boolean;
    type?: 'primary' | 'warning' | 'success' | 'error';
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    footerClassName?: string;
    children: React.ReactNode;
    okType?: BaseButtonProps['type'];
    okText?: string;
    appendToBody?: boolean;
    mask?: boolean;
    keyboard?: boolean;
    leaveHiddenModal?: boolean;
    scrollable?: boolean;
    theme?: ModalTheme;
    onHide?: () => void;
    size?: 's' | 'm' | 'l' | 'xl' | 'fullscreen';
    onOpen?: () => void;
    onOk?: (e?: React.MouseEvent<HTMLElement>) => void;
    onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
    onClickLink?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
    footer?: React.ReactNode;
    link?: string;
    linkText?: string;
    pure?: boolean;
    width?: number;
    cancelText?: string;
    zIndex?: number;
}

export interface ModalRefType {
    modalRef: React.MutableRefObject<HTMLDivElement>;
    open: () => void;
    close: () => void;
}

interface ModalContentTheme {
    scrollable?: string;
    wrapper?: string;
}

export interface ModalContentProps extends BaseComponent {
    ref?: React.ForwardedRef<HTMLAllCollection>;
    tag?: React.ComponentProps<any>;
    theme?: ModalContentTheme;
}

interface ModalBodyTheme {
    wrapper?: string;
}

export interface ModalBodyProps extends BaseComponent {
    ref?: React.ForwardedRef<HTMLAllCollection>;
    tag?: React.ComponentProps<any>;
    theme?: ModalBodyTheme;
}

export interface MaskTheme {
    wrapper: string;
}

export interface MaskProps {
    className?: string;
    appendToBody?: boolean;
    show: boolean;
    animate?: boolean;
    theme?: MaskTheme;
    zIndex?: number;
    [rest: string]: any;
}

interface ModalDialogTheme {
    centered?: boolean;
    fullscreen?: string;
    hidden?: string;
    scrollable?: string;
    show?: string;
    sizeDefault?: string;
    wrapper?: string;
    wrapperPositionDefault?: string;
    'bottom-left'?: string;
    'bottom-right'?: string;
    'top-left'?: string;
    'top-right'?: string;
    sm?: string;
    lg?: string;
    xl?: string;
}

export interface ModalDialogProps extends BaseComponent {
    centered?: boolean;
    size?: 's' | 'm' | 'l' | 'xl' | 'fullscreen';
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    ref?: React.ForwardedRef<HTMLAllCollection>;
    tag?: React.ComponentProps<any>;
    theme?: ModalDialogTheme;
}

interface ModalFooterTheme {
    wrapper?: string;
}

export interface ModalFooterProps extends BaseComponent {
    ref?: React.ForwardedRef<HTMLAllCollection>;
    tag?: React.ComponentProps<any>;
    theme?: ModalFooterTheme;
}

interface ModalHeaderTheme {
    wrapper?: string;
}

export interface ModalHeaderProps extends BaseComponent {
    ref?: React.ForwardedRef<HTMLAllCollection>;
    tag?: React.ComponentProps<any>;
    theme?: ModalHeaderTheme;
}
export type ModalOption = Partial<ModalProps>;
interface ModalReturn {
    update: (configUpdate: (prevConfig: ModalOption) => ModalOption) => void;
    destroy: () => void;
}
type StaticFunction = (props: Partial<ModalOption> & {content: React.ReactNode}) => ModalReturn;
export interface StaticModalFunction {
    confirm: StaticFunction;
    warning: StaticFunction;
    error: StaticFunction;
    success: StaticFunction;
}
