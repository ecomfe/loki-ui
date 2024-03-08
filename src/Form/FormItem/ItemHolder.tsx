import classNames from 'classnames';
import type {Meta} from 'rc-field-form/lib/interface';
// import isVisible from 'rc-util/lib/Dom/isVisible';
// import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import * as React from 'react';

import type {FormItemProps} from '.';
import FormItemInput from '../FormItemInput';
import FormItemLabel from '../FormItemLabel';
import type {ReportMetaChange} from '../context';
import {FormContext, NoStyleItemContext} from '../context';
import useDebounce from '../hooks/useDebounce';
import {getStatus} from '../util';

export interface ItemHolderProps extends FormItemProps {
    prefixCls: string;
    className?: string;
    rootClassName?: string;
    style?: React.CSSProperties;
    errors: React.ReactNode[];
    warnings: React.ReactNode[];
    meta: Meta;
    children?: React.ReactNode;
    fieldId?: string;
    isRequired?: boolean;
    onSubItemMetaChange: ReportMetaChange;
}

export default function ItemHolder(props: ItemHolderProps) {
    const {
        prefixCls,
        className,
        rootClassName,
        style,
        help,
        errors,
        warnings,
        validateStatus,
        meta,
        hasFeedback,
        hidden,
        children,
        fieldId,
        required,
        isRequired,
        onSubItemMetaChange,
        ...restProps
    } = props;

    const itemPrefixCls = `${prefixCls}-item`;
    const {requiredMark} = React.useContext(FormContext);
    // ======================== Margin ========================
    const itemRef = React.useRef<HTMLDivElement>(null);
    const debounceErrors = useDebounce(errors);
    const debounceWarnings = useDebounce(warnings);
    const hasHelp = help !== undefined && help !== null;
    const hasError = !!(hasHelp || errors.length || warnings.length);
    // const isOnScreen = !!itemRef.current && isVisible(itemRef.current);
    const [marginBottom, setMarginBottom] = React.useState<number | null>(null);

    React.useLayoutEffect(() => {
        if (hasError && itemRef.current) {
            // The element must be part of the DOMTree to use getComputedStyle
            // https://stackoverflow.com/questions/35360711/getcomputedstyle-returns-a-cssstyledeclaration-but-all-properties-are-empty-on-a
            const itemStyle = getComputedStyle(itemRef.current);
            setMarginBottom(parseInt(itemStyle.marginBottom, 10));
        }
    }, [hasError]);

    const onErrorVisibleChanged = (nextVisible: boolean) => {
        if (!nextVisible) {
            setMarginBottom(null);
        }
    };

    // ======================== Status ========================

    const getValidateState = (isDebounce = false) => {
        const _errors = isDebounce ? debounceErrors : meta.errors;
        const _warnings = isDebounce ? debounceWarnings : meta.warnings;

        return getStatus(_errors, _warnings, meta, '', !!hasFeedback, validateStatus);
    };

    const mergedValidateStatus = getValidateState();

    // ======================== Render ========================
    const itemClassName = classNames(itemPrefixCls, className, rootClassName, {
        [`${itemPrefixCls}-with-help`]: hasHelp || debounceErrors.length || debounceWarnings.length,

        // Status
        [`${itemPrefixCls}-has-feedback`]: mergedValidateStatus && hasFeedback,
        [`${itemPrefixCls}-has-success`]: mergedValidateStatus === 'success',
        [`${itemPrefixCls}-has-warning`]: mergedValidateStatus === 'warning',
        [`${itemPrefixCls}-has-error`]: mergedValidateStatus === 'error',
        [`${itemPrefixCls}-is-validating`]: mergedValidateStatus === 'validating',
        [`${itemPrefixCls}-hidden`]: hidden,
    });
    const itemWrapperClassName = 'flex flex-wrap gap-[--margin-xs] w-full mb-[16px]';
    return (
        <div className={classNames(itemWrapperClassName, className)} style={style} ref={itemRef}>
            {/* Label */}
            <FormItemLabel
                htmlFor={fieldId}
                {...props}
                requiredMark={requiredMark}
                required={required ?? isRequired}
                prefixCls={prefixCls}
            />
            {/* Input Group */}
            <FormItemInput
                {...props}
                {...meta}
                errors={debounceErrors}
                warnings={debounceWarnings}
                prefixCls={prefixCls}
                status={mergedValidateStatus}
                help={help}
                marginBottom={marginBottom}
                onErrorVisibleChanged={onErrorVisibleChanged}
            >
                <NoStyleItemContext.Provider value={onSubItemMetaChange}>{children}</NoStyleItemContext.Provider>
            </FormItemInput>
        </div>
    );
}
