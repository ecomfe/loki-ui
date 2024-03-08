/**
 * @file 处理滚动条的显示与隐藏
 **/
/* eslint-disable @reskript/no-excessive-hook */
import {useState, useEffect} from 'react';

const useScrollbar = () => {
    const [element, setElement] = useState(null);

    useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }
        setElement(document.body);
    }, []);

    const getWidth = () => {
        if (!element) {
            return 0;
        }
        const documentWidth = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - documentWidth);
    };

    const saveInitialStyle = (property) => {
        if (!element || element.hasAttribute(`data-initial-${property}`)) {
            return;
        }
        element.dataset[`initial${property}`] = element.style[property];
    };

    const restoreInitialStyle = (property) => {
        if (!element) {
            return;
        }
        element.style[property] = element.dataset[`initial${property}`] || '';
        element.removeAttribute(`data-initial-${property}`);
    };

    const scrollbarReset = () => {
        restoreInitialStyle('overflow');
        restoreInitialStyle('paddingRight');
    };

    const disableOverFlow = () => {
        saveInitialStyle('overflow');
        element.style.overflow = 'hidden';
    };

    const scrollbarHide = () => {
        if (!element) {
            return;
        }
        const width = getWidth();
        disableOverFlow();
        saveInitialStyle('paddingRight');
        element.style.paddingRight = `${width}px`;
    };

    return {scrollbarHide, scrollbarReset, getWidth};
};

export {useScrollbar};
