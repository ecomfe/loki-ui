import FieldForm from 'rc-field-form';
import React, {useMemo} from 'react';
import {FormContext, FormContextProps} from './context';
import useForm from './hooks/useForm';

export type RequiredMark =
    | boolean
    | 'optional'
    | ((labelNode: React.ReactNode, info: {required: boolean}) => React.ReactNode);

export interface FormInstance {
    scrollToField: (name: string, options?: ScrollOptions) => void;
    getFieldInstance: (name: string) => any;
}

const validateMessages = {
    required: '${label}不能为空',
};

export default function Form(props) {
    const {
        form,
        colon,
        labelAlign,
        labelWrap,
        labelWidth,
        layout = 'horizontal',
        requiredMark,
        name,
        feedbackIcons
    } = props;

    const [wrapForm] = useForm(form);
    const {__INTERNAL__} = wrapForm;
    __INTERNAL__.name = name;
    const formContextValue = useMemo<FormContextProps>(
        () => ({
            name,
            labelAlign,
            labelWrap,
            itemRef: __INTERNAL__.itemRef,
            vertical: layout === 'vertical',
            colon,
            labelWidth,
            requiredMark,
            form: wrapForm,
            feedbackIcons,
        }),
        [name, labelAlign, layout, colon, requiredMark, wrapForm, feedbackIcons, labelWidth],
    );
    return (
        <FormContext.Provider value={formContextValue}>
            <FieldForm {...props} validateMessages={validateMessages} className="w-full" />
        </FormContext.Provider>
    );
}
