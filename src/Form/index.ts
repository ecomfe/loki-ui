import type {Rule, RuleObject, RuleRender} from 'rc-field-form/lib/interface';
import {useWatch} from 'rc-field-form';
import ErrorList, {type ErrorListProps} from './ErrorList';
import useForm from './hooks/useForm';

import InternalForm from './Form';
import Item, {type FormItemProps} from './FormItem';
import {FormProvider} from './context';

type InternalFormType = typeof InternalForm;

type CompoundedComponent = InternalFormType & {
  useForm: typeof useForm;
  useWatch: typeof useWatch;
  Item: typeof Item;
  ErrorList: typeof ErrorList;
  Provider: typeof FormProvider;

  /** @deprecated Only for warning usage. Do not use. */
  create: () => void;
};

const Form = InternalForm as CompoundedComponent;

Form.Item = Item;
Form.ErrorList = ErrorList;
Form.useForm = useForm;
Form.useWatch = useWatch;
Form.Provider = FormProvider;

export type {
    ErrorListProps,
    FormItemProps,
    Rule,
    RuleObject,
    RuleRender,
};

export default Form;
