const middleMotion = {
    appear: 'translate-y-5 opacity-0 !w-full flex justify-center',
    appearDone: 'opacity-100 !translate-y-0 transition-all duration-300 !w-full flex justify-center',
    enter: 'translate-y-5 opacity-0 !w-full flex justify-center',
    enterDone: '!opacity-100 !translate-y-0 transition-all duration-300 !w-full flex justify-center',
    exit: 'opacity-100 translate-y-0 !w-full flex justify-center',
    exitActive: '!opacity-0 transition-all duration-300 ease-in !w-full flex justify-center'
};
const rightMotion = {
    appear: 'translate-x-full opacity-0',
    appearDone: 'opacity-100 !translate-x-0 transition-all duration-300',
    enter: 'translate-x-full opacity-0',
    enterDone: 'opacity-100 !translate-x-0 transition-all duration-300',
    exit: 'opacity-100 translate-x-0 transition-all',
    exitActive: '!opacity-0 transition-all duration-500 ease-in',
    exitDone: '!opacity-0 transition-all duration-500 ease-in'
};
const leftMotion = {
    appear: '-translate-x-full opacity-0',
    appearDone: 'opacity-100 !translate-x-0 transition-all duration-300',
    enter: '-translate-x-full opacity-0',
    enterDone: 'opacity-100 !translate-x-0 transition-all duration-300',
    exit: 'opacity-100 translate-x-0 transition-all',
    exitActive: '!opacity-0 transition-all duration-500 ease-in',
    exitDone: '!opacity-0 transition-all duration-500 ease-in'
};
export const motionMap = {
    top: middleMotion,
    bottom: middleMotion,
    topRight: rightMotion,
    bottomRight: rightMotion,
    topLeft: leftMotion,
    bottomLeft: leftMotion
};
