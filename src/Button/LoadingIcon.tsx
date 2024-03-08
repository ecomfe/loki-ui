import cn from 'classnames';
import React, {forwardRef} from 'react';

interface InnerLoadingIconProps {
    prefixCls: string;
    className?: string;
    style?: React.CSSProperties;
}

const InnerLoadingIcon = forwardRef<HTMLSpanElement, InnerLoadingIconProps>(
    ({className, style}, ref) => {
        return (
            <span className={cn('animate-spin', className)} style={style} ref={ref}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="&#229;&#138;&#160;&#232;&#189;&#189;">
                        <path
                            id="Vector"
                            // eslint-disable-next-line max-len
                            d="M3.4854 5.39349C2.04589 7.88681 2.90018 11.0751 5.39348 12.5146C7.88679 13.9541 11.075 13.0998 12.5145 10.6065C12.7216 10.2477 13.1803 10.1248 13.5391 10.3319C13.8978 10.539 14.0207 10.9977 13.8136 11.3565C11.9598 14.5673 7.85422 15.6673 4.64348 13.8136C1.43274 11.9599 0.33264 7.85425 2.18637 4.64349C4.0401 1.43274 8.14568 0.332638 11.3565 2.18638C12.8327 3.03868 13.8636 4.36865 14.3652 5.86713C14.4967 6.25992 14.2848 6.68492 13.892 6.8164C13.4992 6.94787 13.0742 6.73603 12.9427 6.34323C12.5529 5.17855 11.7536 4.14773 10.6064 3.48542C8.11312 2.04589 4.92492 2.90018 3.4854 5.39349Z"
                            fill="currentColor"
                        />
                    </g>
                </svg>
            </span>
        );
    },
);

export interface LoadingIconProps {
    prefixCls?: string;
    existIcon?: boolean;
    loading?: boolean | object;
    className?: string;
    style?: React.CSSProperties;
}

const LoadingIcon: React.FC<LoadingIconProps> = props => {
    const {prefixCls = 'loki', loading, className, style} = props;
    const visible = !!loading;

    return visible ? (
        <InnerLoadingIcon
            prefixCls={prefixCls}
            className={className}
            style={style}
        />
    ) : null;
};

export default LoadingIcon;
