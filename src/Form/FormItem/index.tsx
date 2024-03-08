import {Field, FieldContext, ListContext} from 'rc-field-form';
import type {FieldProps} from 'rc-field-form/lib/Field';
import type {InternalNamePath, Meta} from 'rc-field-form/lib/interface';
import * as React from 'react';
import type {FormInstance} from '../Form';
import type {FormItemInputProps} from '../FormItemInput';
import type {FormItemLabelProps, LabelTooltipType} from '../FormItemLabel';
import {FormContext, NoStyleItemContext} from '../context';
import useChildren from '../hooks/useChildren';
import useFormItemStatus from '../hooks/useFormItemStatus';
import useFrameState from '../hooks/useFrameState';
import useItemRef from '../hooks/useItemRef';
import {getFieldId, toArray} from '../util';
import ItemHolder from './ItemHolder';

const NAME_SPLIT = '__SPLIT__';

interface FieldError {
    errors: string[];
    warnings: string[];
}

const ValidateStatuses = ['success', 'warning', 'error', 'validating', ''] as const;
export type ValidateStatus = (typeof ValidateStatuses)[number];

type RenderChildren = (form: FormInstance) => React.ReactNode;
type RcFieldProps<Values = any> = Omit<FieldProps<Values>, 'children'>;
type ChildrenType<Values = any> = RenderChildren | React.ReactNode;

export type FeedbackIcons = (itemStatus: {
    status: ValidateStatus;
    errors?: React.ReactNode[];
    warnings?: React.ReactNode[];
}) => {[key in ValidateStatus]?: React.ReactNode};

interface MemoInputProps {
    value: any;
    update: any;
    children: React.ReactNode;
    childProps: any[];
}

const MemoInput = React.memo(
    ({children}: MemoInputProps) => children as JSX.Element,
    (prev, next) =>
        prev.value === next.value
        && prev.update === next.update
        && prev.childProps.length === next.childProps.length
        && prev.childProps.every((value, index) => value === next.childProps[index]),
);

export interface FormItemProps<Values = any>
    extends Omit<FormItemLabelProps, 'requiredMark'>,
        FormItemInputProps,
        RcFieldProps<Values> {
    prefixCls?: string;
    noStyle?: boolean;
    style?: React.CSSProperties;
    className?: string;
    rootClassName?: string;
    children?: ChildrenType<Values>;
    id?: string;
    hasFeedback?: boolean | {icons: FeedbackIcons};
    validateStatus?: ValidateStatus;
    required?: boolean;
    hidden?: boolean;
    initialValue?: any;
    messageVariables?: Record<string, string>;
    tooltip?: LabelTooltipType;
    /** @deprecated No need anymore */
    fieldKey?: React.Key | React.Key[];
    isRequired?: boolean;
}

function genEmptyMeta(): Meta {
    return {
        errors: [],
        warnings: [],
        touched: false,
        validating: false,
        name: [],
        validated: false,
    };
}

function InternalFormItem<Values = any>(props: FormItemProps<Values>): React.ReactElement {
    const {
        name,
        noStyle,
        className,
        dependencies,
        prefixCls: customizePrefixCls,
        shouldUpdate,
        rules,
        children,
        required,
        label,
        messageVariables,
        trigger = 'onChange',
        validateTrigger,
        hidden,
        help,
    } = props;
    const {name: formName} = React.useContext(FormContext);

    const mergedChildren = useChildren(children);
    const isRenderProps = typeof mergedChildren === 'function';
    const notifyParentMetaChange = React.useContext(NoStyleItemContext);

    const {validateTrigger: contextValidateTrigger} = React.useContext(FieldContext);
    const mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

    const hasName = !(name === undefined || name === null);

    // ========================= MISC =========================
    // Get `noStyle` required info
    const listContext = React.useContext(ListContext);
    const fieldKeyPathRef = React.useRef<InternalNamePath>();

    // ======================== Errors ========================
    // >>>>> Collect sub field errors
    const [subFieldErrors, setSubFieldErrors] = useFrameState<Record<string, FieldError>>({});

    // >>>>> Current field errors
    const [meta, setMeta] = React.useState<Meta>(() => genEmptyMeta());

    const onMetaChange = (nextMeta: Meta & {destroy?: boolean}) => {
        // This keyInfo is not correct when field is removed
        // Since origin keyManager no longer keep the origin key anymore
        // Which means we need cache origin one and reuse when removed
        const keyInfo = listContext?.getKey(nextMeta.name);

        // Destroy will reset all the meta
        setMeta(nextMeta.destroy ? genEmptyMeta() : nextMeta);

        // Bump to parent since noStyle
        if (noStyle && help !== false && notifyParentMetaChange) {
            let namePath = nextMeta.name;

            if (!nextMeta.destroy) {
                if (keyInfo !== undefined) {
                    const [fieldKey, restPath] = keyInfo;
                    namePath = [fieldKey, ...restPath];
                    fieldKeyPathRef.current = namePath;
                }
            } else {
                // Use origin cache data
                namePath = fieldKeyPathRef.current || namePath;
            }
            notifyParentMetaChange(nextMeta, namePath);
        }
    };

    // >>>>> Collect noStyle Field error to the top FormItem
    const onSubItemMetaChange = (subMeta: Meta & {destroy: boolean}, uniqueKeys: React.Key[]) => {
        // Only `noStyle` sub item will trigger
        setSubFieldErrors(prevSubFieldErrors => {
            const clone = {
                ...prevSubFieldErrors,
            };

            // name: ['user', 1] + key: [4] = ['user', 4]
            const mergedNamePath = [...subMeta.name.slice(0, -1), ...uniqueKeys];
            const mergedNameKey = mergedNamePath.join(NAME_SPLIT);

            if (subMeta.destroy) {
                // Remove
                delete clone[mergedNameKey];
            } else {
                // Update
                clone[mergedNameKey] = subMeta;
            }

            return clone;
        });
    };
    // >>>>> Get merged errors
    const [mergedErrors, mergedWarnings] = React.useMemo(() => {
        const errorList: string[] = [...meta.errors];
        const warningList: string[] = [...meta.warnings];

        Object.values(subFieldErrors).forEach(subFieldError => {
            errorList.push(...(subFieldError.errors || []));
            warningList.push(...(subFieldError.warnings || []));
        });

        return [errorList, warningList];
    }, [subFieldErrors, meta.errors, meta.warnings]);

    // // ===================== Children Ref =====================
    const getItemRef = useItemRef();

    // ======================== Render ========================
    function renderLayout(baseChildren: React.ReactNode, fieldId?: string, isRequired?: boolean): React.ReactNode {
        return (
            // @ts-ignore
            <ItemHolder
                key="row"
                {...props}
                className={className}
                fieldId={fieldId}
                isRequired={isRequired}
                errors={mergedErrors}
                warnings={mergedWarnings}
                meta={meta}
                onSubItemMetaChange={onSubItemMetaChange}
            >
                {baseChildren}
            </ItemHolder>
        );
    }

    let variables: Record<string, string> = {};
    if (typeof label === 'string') {
        variables.label = label;
    } else if (name) {
        variables.label = String(name);
    }
    if (messageVariables) {
        variables = {...variables, ...messageVariables};
    }

    // >>>>> With Field
    return (
        <Field
            {...props}
            messageVariables={variables}
            trigger={trigger}
            validateTrigger={mergedValidateTrigger}
            onMetaChange={onMetaChange}
        >
            {(control, renderMeta, context) => {
                const mergedControl: typeof control = {
                    ...control,
                };
                const mergedName = renderMeta ? renderMeta.name : [];
                const fieldId = getFieldId(mergedName, formName);
                let childNode: React.ReactNode = null;
                // @ts-ignore
                const childProps = {...mergedChildren.props, ...mergedControl};
                if (!childProps.id) {
                    childProps.id = fieldId;
                }

                if (mergedErrors.length > 0) {
                    childProps.status = 'error';
                }
                if (mergedErrors.length > 0) {
                    childProps['aria-invalid'] = 'true';
                }

                if (props.isRequired) {
                    childProps['aria-required'] = 'true';
                }

                // if (supportRef(mergedChildren)) {
                childProps.ref = getItemRef(mergedName, mergedChildren);
                // }

                // We should keep user origin event handler
                const triggers = new Set<string>([...toArray(trigger), ...toArray(mergedValidateTrigger)]);

                triggers.forEach(eventName => {
                    childProps[eventName] = (...args: any[]) => {
                        mergedControl[eventName]?.(...args);
                        // @ts-ignore
                        mergedChildren.props[eventName]?.(...args);
                    };
                });

                const watchingChildProps = [
                    childProps['aria-required'],
                    childProps['aria-invalid'],
                    childProps['aria-describedby'],
                ];
                childNode = (
                    <MemoInput
                        value={mergedControl[props.valuePropName || 'value']}
                        update={mergedChildren}
                        childProps={watchingChildProps}
                    >
                        {React.cloneElement(mergedChildren as React.ReactElement<any>, childProps)}
                    </MemoInput>
                );
                // @ts-ignore
                return renderLayout(childNode, getFieldId([props.name], formName), props.isRequired);
            }}
        </Field>
    );
}

type InternalFormItemType = typeof InternalFormItem;

type CompoundedComponent = InternalFormItemType & {
    useStatus: typeof useFormItemStatus;
};

const FormItem = InternalFormItem as CompoundedComponent;
FormItem.useStatus = useFormItemStatus;

export default FormItem;
