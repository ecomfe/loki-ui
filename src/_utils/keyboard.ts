export const KeyCode = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    HOME: 36,
    END: 35,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    ENTER: 13,
    ESC: 27,
    N: 78,
    P: 80,
    SPACE: 32,
    RETURN: 13
};

export const isPlatformMac = () => {
    // This checks the platform of the user's machine
    return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
};
