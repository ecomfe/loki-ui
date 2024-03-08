/* eslint-disable max-len */
const doneClass = '!opacity-100 transform origin-top-left transition-[opacity,transform] duration-100 !scale-y-100';
export const selectMotion = {
    appear: 'opacity-0 scale-y-75',
    appearDone: doneClass,
    enter: 'opacity-0 scale-y-75',
    enterDone: doneClass,
    exit: 'opacity-100 scale-y-100',
    exitActive: '!opacity-0 !scale-y-75 transform origin-top-left transition-[opacity,transform] duration-100',
    exitDone: 'opacity-0',
};
