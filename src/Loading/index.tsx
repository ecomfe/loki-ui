import React from 'react';
import cn from 'classnames';

interface LoadingProps {
    src: string | React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}


export default function Loading({src, className, style}: LoadingProps) {
    let icon = null;
    if (typeof src === 'string') {
        icon = (
            <div className="w-full h-full">
                <img className="w-full h-full" src={src} />
            </div>
        );
    }
    else if (React.isValidElement(src)) {
        icon = src;
    }

    return (
        <div
            className={cn(className, 'overflow-hidden')}
            style={style}
        >
            {icon}
        </div>
    );
}
