import type { CSSProperties, ReactNode } from 'react';

export interface CountConfig {
    // 最大字符数，不同于原生 `maxLength`，超出后标红但不会截断
    max?: number;
    // 自定义字符计数，例如标准 emoji 长度大于 1，可以自定义计数策略将其改为 1
    strategy?: (value: string) => number;
    // 同 `showCount`
    show?: boolean | ((args: { value: string; count: number; maxLength?: number }) => ReactNode);
    // 当字符数超出 `count.max` 时的自定义裁剪逻辑，不配置时不进行裁剪
    exceedFormatter?: (value: string, config: { max: number }) => string;
    formatter?: (info: { value: string; count: number; maxLength?: number }) => ReactNode;
}

export interface InputProps<T extends HTMLInputElement | HTMLTextAreaElement> {
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    allowClear?: boolean | { clearIcon: ReactNode };
    bordered?: boolean;
    classNames?: Record<string, string>;
    count?: CountConfig;
    defaultValue?: string;
    disabled?: boolean;
    id?: string;
    maxLength?: number;
    prefix?: ReactNode;
    status?: 'error' | 'success';
    styles?: Record<string, CSSProperties>;
    size?: 'l' | 'm' | 's';
    suffix?: ReactNode;
    type?: string;
    value?: string;
    onChange?: (value: string, e: React.ChangeEvent<T>) => void;
    onPressEnter?: (e: React.KeyboardEvent<T>) => void;
    placeholder?: string;
    autoComplete?: string;
}

export interface InputRef {
    focus: (options?: InputFocusOptions) => void;
    blur: () => void;
    setSelectionRange: (
        start: number,
        end: number,
        direction?: 'forward' | 'backward' | 'none',
    ) => void;
    select: () => void;
    input: HTMLInputElement | null;
    exceed?: boolean;
}
