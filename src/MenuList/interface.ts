export type RawValueType = string | number;

export interface LabelInValueType {
    [key: string]: any;

    renderCustomOption?: (option: {
        label: React.ReactNode;
        value: RawValueType;
    }, isSelect: boolean) => React.ReactNode;

    label?: React.ReactNode;
    value: RawValueType;

    disabled?: boolean;
    style?: React.CSSProperties;
    children?: LabelInValueType[];
    selected?: boolean;
    selectable?: boolean;
}
