import {useContext} from 'react';
import {FormItemInputContext} from '../context';

export type ValidateStatus = '' | 'success' | 'warning' | 'error' | 'validating';
type UseFormItemStatus = () => {
    status?: ValidateStatus;
    errors: React.ReactNode[];
    warnings: React.ReactNode[];
};

const useFormItemStatus: UseFormItemStatus = () => {
    const {status, errors = [], warnings = []} = useContext(FormItemInputContext);
    return {status, errors, warnings};
};

// Only used for compatible package. Not promise this will work on future version.
(useFormItemStatus as any).Context = FormItemInputContext;

export default useFormItemStatus;
