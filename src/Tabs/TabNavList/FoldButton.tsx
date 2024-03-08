import React, {useMemo} from 'react';
import {AigcSystemMore} from 'loki-icon';
import Dropdown from '../../Dropdown';
import type {FoldButtonProps} from '../interface';
const FoldButton = (props: FoldButtonProps) => {
    const {items, onSelect} = props;
    const [open, setOpen] = React.useState(false);
    const handleSelect = (val, index: number, e: React.KeyboardEvent | React.MouseEvent) => {
        setOpen(false);
        onSelect?.(val?.value, e);
    };
    const menus = useMemo(
        () => {
            return items.map(item => ({
                label: item.label as React.ReactNode,
                value: item.key,
            }));
        }, 
        [items]
    );
    return (
        <Dropdown
            menu={menus}
            open={open}
            onOpenChange={setOpen}
            onSelect={handleSelect}
            placement="bottom-end"
        >
            <span className="cursor-pointer flex w-6 shrink-0 items-center justify-center">
                <AigcSystemMore />
            </span>
        </Dropdown>
    );
};

if (process.env.NODE_ENV === 'development') {
    FoldButton.displayName = 'TabNavList:FoldButton';
}
export default FoldButton;
