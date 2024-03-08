interface AssignedElementMethods {
    destroy: () => void;
    update: () => void;
}

const assignedElements = new Map<HTMLTextAreaElement, AssignedElementMethods>();

function assign(ta: HTMLTextAreaElement | null) {
    if (!ta || ta.nodeName !== 'TEXTAREA' || assignedElements.has(ta)) {
        return;}

    let previousHeight: number | null = null;

    const cacheScrollTops = (element: HTMLElement | null) => {
        const arr: Array<[HTMLElement, number]> = [];

        while (element && element.parentNode && element.parentNode instanceof HTMLElement) {
            if (element.parentNode.scrollTop) {
                arr.push([element.parentNode, element.parentNode.scrollTop]);
            }
            element = element.parentNode;
        }

        return () => arr.forEach(([node, scrollTop]) => {
            node.style.scrollBehavior = 'auto';
            node.scrollTop = scrollTop;
            node.style.scrollBehavior = '';
        });
    };

    const computed = window.getComputedStyle(ta);

    const setHeight = ({
        restoreTextAlign = null,
        testForHeightReduction = true,
    }: { restoreTextAlign?: string | null, testForHeightReduction: boolean }) => {
        // eslint-disable-next-line @typescript-eslint/init-declarations
        let restoreScrollTops: (() => void) | undefined;

        if (testForHeightReduction) {
            restoreScrollTops = cacheScrollTops(ta);
            ta.style.height = '';
        }

        let newHeight: number = 0;
        if (computed.boxSizing === 'content-box') {
            newHeight = ta.scrollHeight - (parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom));
        } else {
            newHeight = ta.scrollHeight + parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
        }

        if (computed.maxHeight !== 'none' && newHeight > parseFloat(computed.maxHeight)) {
            ta.style.overflowY = 'scroll';
            newHeight = parseFloat(computed.maxHeight);
        } else if (computed.overflowY !== 'hidden') {
            ta.style.overflowY = 'hidden';
        }

        ta.style.height = `${newHeight}px`;

        if (restoreTextAlign) {
            ta.style.textAlign = restoreTextAlign;
        }

        if (restoreScrollTops) {
            restoreScrollTops();
        }

        if (previousHeight !== newHeight) {
            ta.dispatchEvent(new Event('autosize:resized', {bubbles: true}));
            previousHeight = newHeight;
        }
    };

    const fullSetHeight = () => {
        setHeight({
            testForHeightReduction: true,
        });
    };

    const handleInput = (() => {
        let previousValue = ta.value;

        return () => {
            setHeight({
                testForHeightReduction: previousValue === '' || !ta.value.startsWith(previousValue),
            });

            previousValue = ta.value;
        };
    })();

    const destroy = ((style: Partial<CSSStyleDeclaration>) => {
        ta.removeEventListener('autosize:destroy', destroy);
        ta.removeEventListener('autosize:update', fullSetHeight);
        ta.removeEventListener('input', handleInput);
        window.removeEventListener('resize', fullSetHeight);
        Object.keys(style).forEach((key: string) => {
            ta.style[key as any] = style[key as any] as any;
        });
        assignedElements.delete(ta);
    }).bind(ta, {
        height: ta.style.height,
        resize: ta.style.resize,
        textAlign: ta.style.textAlign,
        overflowY: ta.style.overflowY,
        overflowX: ta.style.overflowX,
        wordWrap: ta.style.wordWrap,
    });

    ta.addEventListener('autosize:destroy', destroy);
    ta.addEventListener('autosize:update', fullSetHeight);
    ta.addEventListener('input', handleInput);
    window.addEventListener('resize', fullSetHeight);
    ta.style.overflowX = 'hidden';
    ta.style.wordWrap = 'break-word';

    assignedElements.set(ta, {
        destroy,
        update: fullSetHeight,
    });

    fullSetHeight();
}

function destroy(ta: HTMLTextAreaElement) {
    const methods = assignedElements.get(ta);
    methods?.destroy();
}

function update(ta: HTMLTextAreaElement) {
    const methods = assignedElements.get(ta);
    methods?.update();
}

type ElementOrElements = HTMLTextAreaElement | HTMLTextAreaElement[];

function auto(el: ElementOrElements): void;
function auto(el: any): any;
function auto(el: ElementOrElements) {
    if (typeof window === 'undefined') {
        return el;
    } else if (el) {
        const elements = Array.isArray(el) ? el : [el];
        elements.forEach((element: HTMLTextAreaElement) => assign(element));
    }
}
const autosize = auto as typeof auto & {
    destroy: (el: ElementOrElements) => void;
    update: (el: ElementOrElements) => void;
};

if (typeof window === 'undefined') {
    autosize.destroy = (el: any) => el;
    autosize.update = (el: any) => el;
} else {
    autosize.destroy = (el: ElementOrElements) => {
        if (el) {
            const elements = Array.isArray(el) ? el : [el];
            elements.forEach(destroy);
        }
    };
    autosize.update = (el: ElementOrElements) => {
        if (el) {
            const elements = Array.isArray(el) ? el : [el];
            elements.forEach(update);
        }
    };
}

export default autosize;
