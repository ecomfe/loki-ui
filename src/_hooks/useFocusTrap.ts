/* eslint-disable @reskript/no-excessive-hook */
/**
 * @file 用于在特定的DOM元素中限制焦点的移动
 * */

type FocusableElement =
    | HTMLButtonElement
    | HTMLAnchorElement
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement;

const useFocusTrap = () => {
    let trapElement: HTMLElement | null = null;
    let firstFocusableElement: FocusableElement | null = null;
    let lastFocusableElement: FocusableElement | null = null;

    const focusTrap = function focusTrap() {
        if (!firstFocusableElement) {
            return;
        }

        firstFocusableElement?.focus();
    };

    const handleLastElementKeydown = function handleLastElementKeydown(e: KeyboardEvent) {
        if (e.key === 'Tab') {
            e.preventDefault();
            focusTrap();
        }
    };

    const focusFirstElement = function focusFirstElement(e: KeyboardEvent, trap = false) {
        if (e.key === 'Tab') {
            e.preventDefault();
            focusTrap();
        }
        if (trap) {
            return;
        }
        window.removeEventListener('keydown', focusFirstElement);
    };

    const removeFocusTrap = function removeFocusTrap() {
        lastFocusableElement?.removeEventListener('keydown', (event) =>
            handleLastElementKeydown(event as KeyboardEvent),
        );
    };

    const calculateFocusTrap = function calculateFocusTrap() {
        const focusable = Array.from(
            trapElement?.querySelectorAll(
                'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])',
            ) as NodeListOf<FocusableElement>,
        ).filter((el: FocusableElement) => {
            const shouldFocus = el instanceof HTMLAnchorElement ? true : !el.disabled;
            return !el.classList.contains('ps__thumb-x') && !el.classList.contains('ps__thumb-y') && shouldFocus;
        });

        if (focusable.length === 0) {
            return;
        }

        firstFocusableElement = focusable[0];

        lastFocusableElement = focusable[focusable.length - 1];

        lastFocusableElement?.addEventListener('keydown', (event) => handleLastElementKeydown(event as KeyboardEvent));
    };

    const initFocusTrap = function initFocusTrap(element: HTMLElement) {
        trapElement = element;
        calculateFocusTrap();

        window.addEventListener('keydown', focusFirstElement);

        return true;
    };

    return {
        initFocusTrap,
        removeFocusTrap,
    };
};

export {useFocusTrap};
