import cn from 'classnames';
import React from 'react';
import type {TabPaneProps} from '../interface';

const TabPanel = React.forwardRef<HTMLDivElement, TabPaneProps>((props, ref) => {
    const {className, style, id, active, tabKey, children} = props;
    return (
        <div
            role="tabpanel"
            aria-labelledby={id && `${id}-tab-${tabKey}`}
            aria-hidden={!active}
            style={style}
            className={cn('w-full', className)}
            ref={ref}
        >
            {children}
        </div>
    );
});

if (process.env.NODE_ENV !== 'production') {
    TabPanel.displayName = 'TabPanel';
}

export default TabPanel;
