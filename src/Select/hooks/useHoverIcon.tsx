import React, {useState, useEffect} from 'react';
import {AigcSystemPullDown} from 'loki-icon';

const useHoverIcon = (hoverRef: React.RefObject<HTMLDivElement>,
    clearIcon: React.ReactNode, open: boolean, expandIcon?: React.ReactNode) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasClear = !!clearIcon;
    const pulldownIcon = (
        <span
            className={`text-[--color-text-tertiary]
            transform transition-transform origin-center
             flex-shrink-0 inline-flex items-center ${open ? 'rotate-180' : ''}`}
        >
            {expandIcon && <AigcSystemPullDown />}
        </span>
    );

    useEffect(
        () => {
            if (!hasClear) {
                return;
            }
            const checkIfHovered = (e: MouseEvent) => {
                if (hoverRef.current && hoverRef.current.contains(e.target as Node)) {
                    setIsHovered(true);
                } else {
                    setIsHovered(false);
                }
            };

            document.addEventListener('mousemove', checkIfHovered);
            return () => {
                document.removeEventListener('mousemove', checkIfHovered);
            };
        },
        [hasClear]
    );

    return (
        clearIcon ? (
            <div className="relative flex items-center flex-shrink-0">
                <div className={`absolute flex items-center transition-opacity right-0
                 duration-300 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                >
                    {clearIcon}
                </div>
                <div className={`absolute flex items-center right-0 transition-opacity pointer-events-none
                duration-300 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                >
                    {pulldownIcon}
                </div>
                <div className="invisible">{pulldownIcon}</div>
            </div>
        ) : pulldownIcon
    );
};

export default useHoverIcon;
