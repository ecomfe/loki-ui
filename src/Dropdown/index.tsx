import React, {useEffect, useState} from 'react';
import Popover from '../Popover';
import MenuList from '../MenuList';
import useEvent from '../_hooks/useEvent';
import {selectMotion} from '../Select/utils/animate';
import type {DropdownProps} from './interface';
const dropDownMotion = {
    classNames: selectMotion,
    timeout: 100,
};
const Dropdown = (props: DropdownProps) => {
    const {
        noArrow = true,
        placement = 'bottom',
        children,
        open,
        onOpenChange,
        trigger = 'hover',
        menu = [],
        motion,
        ...rest
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    useEffect(
        () => {
            setIsOpen(open);
        },
        [open]
    );
    const handleOpenChange = useEvent((open: boolean) => {
        if (open === undefined) {
            setIsOpen(!isOpen);
        }
        onOpenChange?.(open);
    });
    return (
        <Popover
            footer={null}
            title={null}
            placement={placement}
            noArrow={noArrow}
            open={isOpen}
            trigger={trigger}
            motion={motion || dropDownMotion}
            content={
                <MenuList menu={menu} {...rest} />
            }
            onOpenChange={handleOpenChange}
            style={{
                padding: 0
            }}
        >
            {children}
        </Popover>
    );
};
export default Dropdown;
export {DropdownProps};
