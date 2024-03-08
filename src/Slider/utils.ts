
const getDecimal = (num: number) => (String(num).split('.')[1] || '').length;
const formatValue = (min: number, max: number, value: number, step: number) => {
    if (step !== null) {
        const stepValue = Math.round((value - min) / step) * step + min;
        // 解决js精度问题
        const maxDecimal = Math.max(getDecimal(step), getDecimal(max), getDecimal(min));
        const fixedValue = Number(stepValue.toFixed(maxDecimal));
        return fixedValue > max ? max : (fixedValue < min ? min : fixedValue);
    }
    return value;
};

export {formatValue};
