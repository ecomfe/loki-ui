import React, {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

export type ContainerType = Element | DocumentFragment;
export type GetContainer = ContainerType | (() => ContainerType) | false;
interface PortalProps {
    getContainer?: GetContainer;
    children: React.ReactNode;
}
const notSSR = () => typeof window !== 'undefined' && window.document && window.document.createElement;
const getPortalContainer = (getContainer?: GetContainer) => {
    if (getContainer === false) {
        return false;
    }

    if (typeof getContainer === 'function') {
        return getContainer();
    }
    return getContainer;
};

const Portal = (props: PortalProps): React.ReactElement => {
    const {getContainer, children} = props;
    const [container, setContainer] = useState<false | ContainerType | null>(() => getPortalContainer(getContainer));

    useEffect(
        () => {
            setContainer(getPortalContainer(getContainer) || null);
        },
        []
    );
    if (getContainer === false) {
        return null;
    }

    return <>{notSSR() ? createPortal(children, container || document.body) : children}</>;
};

if (process.env.NODE_ENV !== 'production') {
    Portal.displayName = 'Portal';
}

export default Portal;
