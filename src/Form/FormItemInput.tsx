import React from 'react';
import ErrorList from './ErrorList';
import type {ValidateStatus} from './FormItem';
import {FormContext, FormItemPrefixContext} from './context';

interface FormItemInputMiscProps {
    prefixCls: string;
    children: React.ReactNode;
    errors: React.ReactNode[];
    warnings: React.ReactNode[];
    marginBottom?: number | null;
    onErrorVisibleChanged?: (visible: boolean) => void;
    /** @internal do not use in any of your production. */
}

export interface FormItemInputProps {
    extra?: React.ReactNode;
    status?: ValidateStatus;
    help?: React.ReactNode;
    fieldId?: string;
}

const FormItemInput: React.FC<FormItemInputProps & FormItemInputMiscProps> = props => {
    const {prefixCls, status, children, errors, warnings, extra, help, fieldId, marginBottom, onErrorVisibleChanged} =
        props;

    const formContext = React.useContext(FormContext);

    // Pass to sub FormItem should not with col info
    const subFormContext = React.useMemo(() => ({...formContext}), [formContext]);
    // @ts-ignore
    delete subFormContext.labelCol;
    // @ts-ignore
    delete subFormContext.wrapperCol;

    const inputDom: React.ReactNode = children;
    const formItemContext = React.useMemo(() => ({prefixCls, status}), [prefixCls, status]);
    const errorListDom: React.ReactNode =
        errors.length || warnings.length ? (
            <div className="flex flex-nowrap w-full">
                <FormItemPrefixContext.Provider value={formItemContext}>
                    <ErrorList
                        fieldId={fieldId}
                        errors={errors}
                        warnings={warnings}
                        help={help}
                        helpStatus={status}
                        onVisibleChanged={onErrorVisibleChanged}
                        className="error"
                    />
                </FormItemPrefixContext.Provider>
            </div>
        ) : null;

    const extraProps: {id?: string} = {};

    if (fieldId) {
        extraProps.id = `${fieldId}_extra`;
    }

    // If extra = 0, && will goes wrong
    // 0&&error -> 0
    const extraDom: React.ReactNode = extra ? (
        <div {...extraProps} className={'w-full extra'}>
            {extra}
        </div>
    ) : null;

    const dom: React.ReactNode = (
        <div className="grow">
            {inputDom}
            {errorListDom}
            {extraDom}
        </div>
    );
    return <FormContext.Provider value={subFormContext}>{dom}</FormContext.Provider>;
};

export default FormItemInput;
