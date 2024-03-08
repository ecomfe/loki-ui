import type {AbstractCheckboxGroupProps, AbstractCheckboxProps, CheckboxOptionType} from '../Checkbox/interface';

type RadioGroupOptionType = 'default' | 'button';
export interface RadioOptionType extends CheckboxOptionType {
    value: sting | number;
    onChange?: (value:  string | number) => void;
}
export interface RadioProps extends AbstractCheckboxProps{
    /**
     * Control the appearance for Radio to display as button or not
     *
     * @default 'default'
     * @internal
     */
    optionType?: RadioGroupOptionType;
    value?: string | number;
    onChange?: (value:  string | number) => void;
}
export interface RadioGroupProps extends AbstractCheckboxGroupProps {
    defaultValue?: string | number;
    value?: string | number;
    onChange?: (e: string | number) => void;
    disabled?: DisabledType;
    children?: React.ReactNode;
    id?: string;
    // 如果没有children 通过option的形式渲染 这个属性来控制
    optionType?: RadioGroupOptionType;
    buttonStyle?: RadioGroupButtonStyle;
    gap?: string;
    options?: Array<RadioOptionType | string | number>;
}

export interface RadioGroupContextProps {
    onChange: (e: string | number) => void;
    value: string | number;
    disabled?: boolean;
    /**
     * Control the appearance for Radio to display as button or not
     *
     * @default 'default'
     * @internal
     */
    optionType?: RadioGroupOptionType;
    gaps: [string | number, string | number] | []
}
