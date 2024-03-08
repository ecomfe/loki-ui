import React from 'react';

export const {isValidElement} = React;

export function isFragment(child: any): boolean {
    return child && isValidElement(child) && child.type === React.Fragment;
}

// 检查组件是否可以安全地接收 ref
export function canAcceptRef(component: React.ComponentType<any> | React.MemoExoticComponent<any>): boolean {
    // 检查是否是React.memo的组件
    // @ts-ignore
    const compType = component?.$$typeof === Symbol.for('react.memo') ? component.type().type : component.type;

    // 检查是否是函数组件
    if (typeof compType === 'function' && !compType.prototype?.render) {
        return false;
    }

    // 检查是否是傻瓜函数
    if (typeof component === 'function' && !(component.prototype && component.prototype.render)) {
        return false;
    }

    return true;
}

export function isReactNode(value: any): value is React.ReactNode {
    if (React.isValidElement(value)) {
        return true;
    }

    if (['string', 'number', 'boolean'].includes(typeof value)) {
        return true;
    }

    if (value === null || value === undefined) {
        return true;
    }

    if (Array.isArray(value)) {
        return value.every(isReactNode);
    }

    return false;
}

export function setNodeRef(
    ref: React.ForwardedRef<HTMLElement>, // 注意这里的类型
    el: HTMLElement,
) {
    if (typeof ref === 'function') {
        ref(el);
    } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<any>).current = el;
    }
}

/**
 * 判断是否为合法的React组件
 *
 * @param component 要判断的组件
 * @returns 如果为函数组件或类组件，返回true；否则返回false
 */
export function isValidReactComponent(component: any): component is React.ComponentType {
    // 检查是否可能是函数组件
    const isFunctionComponent = typeof component === 'function';

    // 检查是否是类组件
    const isClassComponent =
        typeof component === 'function'
        && (component.prototype instanceof React.Component || component.prototype instanceof React.PureComponent);

    return isFunctionComponent || isClassComponent;
}

