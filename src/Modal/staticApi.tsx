import ReactDOM from 'react-dom';
import React from 'react';
import Modal from './index';
import type {ModalOption, StaticModalFunction} from './types';

// Utility function to create a modal based on the provided options
const createModal = (options: ModalOption, type = null) => {
    // Get the container element based on the getContainer option
    const getContainerElement = () => {
        if (typeof options.getContainer === 'function') {
            return options.getContainer();
        } else if (typeof options.getContainer === 'string') {
            return document.querySelector(options.getContainer);
        } else if (options.getContainer instanceof HTMLElement) {
            return options.getContainer;
        } else if (options.getContainer === false) {
            // When getContainer is false, we use the current component's root
            const currentRoot = document.createElement('div');
            if (document.currentScript) {
                document.currentScript.parentNode.insertBefore(currentRoot, document.currentScript);
            }
            return currentRoot;
        } else {
            const div = document.createElement('div');
            document.body.appendChild(div);
            return div;
        }
    };

    const container = getContainerElement();
    if (!container) {
        throw new Error('Invalid container for modal');
    }

    const close = () => {
        ReactDOM.unmountComponentAtNode(container);
        if (container !== document.body && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    };

    const onOk = e => {
        if (typeof options.onOk === 'function') {
            options.onOk(e);
        }
        close();
    };

    const closeModal = (e?: React.MouseEvent<HTMLDivElement>) => {
        if (typeof options.onCancel === 'function') {
            options.onCancel(e);
        }
        close();
    };
    const render = (props: ModalOption) => {
        ReactDOM.render(
            <Modal
                centered
                {...props}
                open
                type={type}
                onOk={onOk}
                onClose={closeModal}
            >{props.content}
            </Modal>,
            container);
    };

    render(options);
    return {
        update: (configUpdate: (prevConfig: ModalOption) => ModalOption) => {
            // Update modal props and re-render
            Object.assign(options, configUpdate(options));
            render(options);
        },
        destroy: closeModal,
    };
};

// Define the static methods for different modal types
const ModalUtil: StaticModalFunction = {
    confirm: props => createModal(props),
    success: props => createModal(props, 'success'),
    error: props => createModal(props, 'error'),
    warning: props => createModal(props, 'warning'),
};

export default ModalUtil;
