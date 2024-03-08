import type {RawValueType, LabelInValueType} from '../interface';

/**
 * 根据值查找匹配的选项
 *
 * @param options 选项数组
 * @param internalValue 内部值，可选
 * @param type 类型，可选，'cascade'
 * @param isMultiple 是否为多选，可选，默认为 false
 * @returns 匹配的选项数组
 */
export function findOptionByValue(options: LabelInValueType[],
    internalValue?: RawValueType | RawValueType[],
    type?: 'cascade',
    isMultiple?: boolean,
) {
    const isCascade = type === 'cascade';
    if (isCascade) {
        let idx = 0;
        // eslint-disable-next-line no-underscore-dangle
        let _options = options;
        return (internalValue as RawValueType[] || []).map(value => {
            idx = _options.findIndex(option => option.value === value);
            try {
                return _options[idx];
            } finally {
                _options = _options[idx].children;
            }
        });
    }
    const filterValue = isMultiple
        ? options.filter(i => (internalValue as RawValueType[] || [])?.includes?.(i.value))
        : options.filter(i => i.value === internalValue)?.[0];
    return filterValue;
}
