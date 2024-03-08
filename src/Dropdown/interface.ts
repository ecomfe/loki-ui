import type {MenuListProps} from '../MenuList';
import type {IPopover} from '../Popover/interface';
export interface DropdownProps extends MenuListProps {
    noArrow?: boolean;
    placement?: IPopover['placement'];
    trigger?: IPopover['trigger'];
    open?: IPopover['open'];
    onOpenChange?: IPopover['onOpenChange'];
    destroyPopupOnHide?: IPopover['destroyTooltipOnHide'];
    children?: React.ReactNode;
    motion?: IPopover['motion'];
}
