import React from 'react';
import {LabelInValueType, OnInternalSelect, RawValueType, RenderNode, SelectProps} from './interface';

type ModeType = {
    multiple: LabelInValueType[];
    cascade: LabelInValueType[];
} & {
    [K in string]: K extends 'multiple' | 'cascade' ? never : LabelInValueType;
};

export interface SelectContextProps<T extends 'multiple' | string> {
    options: LabelInValueType[];
    optionRender: SelectProps['optionRender'];
    defaultActiveFirstOption: SelectProps['defaultActiveFirstOption'];
    onSelect: OnInternalSelect;
    menuItemSelectedIcon?: RenderNode;
    rawValues: Set<RawValueType>;
    internalValue: ModeType[T];
}
const SelectContext = React.createContext<SelectContextProps<any>>(null);

export default SelectContext;
