import React from 'react';
import Select from '../Select';
import type {LabelInValueType} from '../Select/interface';
import List from './List';
import type {CascaderProps} from './interface';

const formatChooseValue = (result: LabelInValueType[]) => {
    if (!Array.isArray(result) || !result?.length) {
        return null;
    }
    return result.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={index}>
            {item.label || item.value}
            {index < result.length - 1 && <span className="text-[--color-text-quaternary]"> / </span>}
        </span>
    ));
};
const Cascader = (props: CascaderProps) => {
    return (
        // @ts-ignore
        <Select
            formatChooseValue={formatChooseValue}
            popupMatchSelectWidth={false}
            {...props}
            placement="bottom-start"
            autoClearSearchValue
            type="cascade"
            // @ts-ignore
            menuList={<List
                expandTrigger={props.expandTrigger}
                options={props.options}
                dropdownStyle={props.dropdownStyle}
                dropdownMenuColumnStyle={props.dropdownMenuColumnStyle}
                controlItemWidth={props.controlItemWidth}
            />}
        />
    );
};
if (process.env.NODE_ENV !== 'production') {
    Cascader.displayName = 'Cascader';
}
export default Cascader;
export {CascaderProps};
