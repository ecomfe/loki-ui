/* eslint-disable max-len */
export const maskTheme = {
    wrapper: 'transition-all duration-300 ease-in-out fixed top-0 left-0 bg-black w-full h-full',
};

export const modalTheme = {
    show: 'transform-none',
    static: '!scale-[1.02]',
    staticProperties: 'transition-scale duration-300 ease-in-out',
    wrapper: 'fixed left-0 top-0 h-full w-full overflow-y-auto overflow-x-hidden outline-none',
};

export const modalBodyTheme = {
    scrollable: 'overflow-y-auto',
    wrapper: 'relative flex-auto',
};

export const modalContentTheme = {
    adaptive: 'rounded-xl',
    full: 'w-full rounded-[--border-radius-lg]',
    wrapper:
        'min-[576px] pointer-events-auto relative flex-col rounded-[--border-radius-lg] border-none bg-clip-padding outline-none text-[--color-recommend-bg] bg-[--color-bg-container]',
    scrollable: 'max-h-full',
};

export const modalDialogTheme = {
    centered: 'h-[calc(100vh-3.5rem)] flex items-center justify-center',
    fullscreen: '!h-full w-full !m-0',
    hidden: 'translate-y-[-50px] opacity-0',
    scrollable: 'h-[calc(100vh-3.5rem)] overflow-hidden',
    show: 'translate-y-0 opacity-100',
    wrapper: 'pointer-events-none transition-all duration-300 ease-in-out mt-7',
    wrapperPositionDefault: 'relative mx-auto',
    'bottom-left': 'w-full absolute bottom-7 left-7',
    'bottom-right': 'w-full absolute bottom-7 right-7',
    'top-left': 'w-full absolute left-7',
    'top-right': 'w-full absolute right-7',
    s: 'w-[306px]',
    m: 'w-[416px]',
    sizeDefault: 'w-[416px]',
    l: 'w-[526px]',
    xl: 'w-[636px]',
};

export const modalFooterTheme = {
    wrapper:
        'flex px-[--padding-xxl] pb-[--padding-xxl] pt-0 flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-neutral-100 border-opacity-100 dark:border-opacity-50',
    closeButton: 'mx-auto mt-[20px] h-[32px] w-[32px] block border border-solid border-white rounded-full text-white text-16 flex items-center justify-center transition-opacity hover:opacity-60',
};

export const modalHeaderTheme = {
    wrapper:
        'pt-[--padding-xxl] pr-[--padding-xxl] pl-[--padding-xxl]  pb-[--padding-md] flex flex-shrink-0 items-center justify-between rounded-t-md border-neutral-100 border-opacity-100 dark:border-opacity-50',
    title: 'font-pingfang font-medium text-[16px] leading-[24px] tracking-normal',
    closeButton:
        'w-[24px] h-[24px] flex justify-center items-center box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none',
};
