const parents = (_node: ParentNode, ps: ParentNode[]): ParentNode[] => {
    if (_node.parentNode === null) {
        return ps;
    }
    return parents(_node.parentNode, ps.concat([_node]));
};
export const findScrollParent = (node: Element) => {
    const regex = /(auto|scroll)/;
    const style = (_node: ParentNode, prop: string) => getComputedStyle(_node as Element, null).getPropertyValue(prop);
    const overflow = (_node: ParentNode) =>
        style(_node, 'overflow') + style(_node, 'overflow-y') + style(_node, 'overflow-x');
    const scroll = (_node: ParentNode) => regex.test(overflow(_node));

    /* eslint-disable consistent-return */
    const scrollParent = (_node: Element) => {
        if (!(_node instanceof HTMLElement || _node instanceof SVGElement)) {
            return;
        }

        const ps = parents(_node.parentNode, []);

        for (const element of ps) {
            if (scroll(element)) {
                return element;
            }
        }

        return document.scrollingElement || document.documentElement;
    };

    return scrollParent(node);
    /* eslint-enable consistent-return */
};
