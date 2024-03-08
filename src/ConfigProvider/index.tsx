import React, {cloneElement} from 'react';

const isDev = process.env.NODE_ENV === 'development';

const ConfigProvider = ({
    children,
    config,
}: {
    children: React.ReactElement;
    config: Record<string, string | number>;
}) => {
    if (isDev && (React.Children.count(children) !== 1 || !React.isValidElement(children))) {
        throw new Error('ConfigProvider expects exactly one child that must be a React element.');
    }
    const style = children.props?.style ?? {};
    return cloneElement(children, {
        style: {...style, ...config},
    });
};

export default ConfigProvider;
