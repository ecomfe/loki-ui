import {AigcSystemHelp} from 'loki-icon';
import cn from 'classnames';
import * as React from 'react';
import Tooltip from '../Tooltip';
import type {ITooltip} from '../Tooltip/interface';
import type {RequiredMark} from './Form';
import type {FormContextProps} from './context';
import {FormContext} from './context';
import type {FormLabelAlign} from './interface';

export type WrapperTooltipProps = ITooltip & {
    icon?: React.ReactElement;
};

export type LabelTooltipType = WrapperTooltipProps | React.ReactNode;

function toTooltipProps(tooltip: LabelTooltipType): WrapperTooltipProps | null {
    if (!tooltip) {
        return null;
    }

    if (typeof tooltip === 'object' && !React.isValidElement(tooltip)) {
        return tooltip as WrapperTooltipProps;
    }

    return {
        content: tooltip,
    };
}

export interface FormItemLabelProps {
    colon?: boolean;
    htmlFor?: string;
    label?: React.ReactNode;
    labelAlign?: FormLabelAlign;
    /**
     * @internal Used for pass `requiredMark` from `<Form />`
     */
    requiredMark?: RequiredMark;
    tooltip?: LabelTooltipType;
    labelWidth?: number | string;
}

const useLabelChildren = ({label, colon, required, requiredMark}) => {
    let labelChildren: React.ReactNode = label;
    const {colon: contextColon} = React.useContext<FormContextProps>(FormContext);
    // Keep label is original where there should have no colon
    const computedColon = colon === true || (contextColon !== false && colon !== false);
    const haveColon = computedColon;

    // Remove duplicated user input colon
    if (haveColon && typeof label === 'string' && label.trim() !== '') {
        labelChildren = label.replace(/[:|：]\s*$/, '');
    }

    const colonClassName = "after:content-[':']";
    const requiredClassName = "before:content-['*'] before:text-[--color-error-text]";
    // Required Mark
    const isRenderMark = typeof requiredMark === 'function';

    if (isRenderMark) {
        labelChildren = requiredMark(labelChildren, {required: !!required});
    }
    return [labelChildren, cn({[colonClassName]: haveColon}, {[requiredClassName]: required})] as const;
};

const getTooltipLabel = (labelChildren, tooltip) => {
    // Tooltip
    const tooltipProps = toTooltipProps(tooltip);

    if (tooltipProps) {
        const {icon = <AigcSystemHelp />, ...restTooltipProps} = tooltipProps;
        const tooltipNode: React.ReactNode = (
            <Tooltip {...restTooltipProps}>
                {React.cloneElement(icon, {className: 'loki-item-tooltip', title: ''})}
            </Tooltip>
        );

        return (
            <>
                {labelChildren}
                {tooltipNode}
            </>
        );
    }
    return labelChildren;
};

const FormItemLabel: React.FC<FormItemLabelProps & {required?: boolean, prefixCls: string}> = ({
    label,
    htmlFor,
    colon = false,
    required,
    requiredMark,
    tooltip,
    labelWidth = 110,
}) => {
    const {vertical, labelWidth: contextLabelWidth} = React.useContext<FormContextProps>(FormContext);
    const [labelChildren, colonCls] = useLabelChildren({
        label,
        colon,
        required,
        requiredMark,
    });
    if (!label) {
        return null;
    }
    const width = contextLabelWidth === undefined ? labelWidth : contextLabelWidth;

    const labelNode = getTooltipLabel(labelChildren, tooltip);
    const labelClassName = cn(
        'text-[--color-text-tertiary] text-right text-[14px] leading-[22px] not-italic font-normal leading-[22px]'
    );
    return (
        <div className={cn({'pt-[8px]': !vertical})} style={{width: vertical ? '100%' : width}}>
            <div
                className={cn('truncate overflow-hidden text-ellipsis', {'text-right': !vertical})}
                style={{width}}
            >
                <label
                    htmlFor={htmlFor}
                    className={cn(labelClassName, colonCls)}
                    title={typeof label === 'string' ? label : ''}
                >
                    {labelNode}
                </label>
            </div>
        </div>
    );
};

export default FormItemLabel;
