export type CheckboxValueType = string | number | boolean;

export interface AbstractCheckboxProps {
    disabled?: boolean;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    id?: string;
    defaultChecked?: boolean;
    value?: CheckboxValueType;
}

export interface CheckboxProps extends AbstractCheckboxProps {
    checkboxClassName?: string;
    checkboxStyle?: React.CSSProperties;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
    checked: boolean;
}

export interface CheckboxChangeEvent {
    target: CheckboxChangeEventTarget;
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: MouseEvent;
}

export interface CheckboxOptionType {
    label: React.ReactNode;
    value: CheckboxValueType;
    style?: React.CSSProperties;
    disabled?: boolean;
    id?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

export interface AbstractCheckboxGroupProps {
    options?: Array<CheckboxOptionType | string | number>;
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
    defaultValue?: CheckboxValueType[];
    value?: CheckboxValueType[];
    onChange?: (checkedValue: CheckboxValueType[]) => void;
    children?: React.ReactNode;
}
