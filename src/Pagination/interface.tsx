export interface PaginationData {
    /**
     * @desc 外层className
     */
    className: string;
    /**
     * @desc 外层style
     */
    style: React.CSSProperties;

    /**
     * @desc 当前第几页
     */
    current: number;
    /**
     * @desc 初始状态下第几页
     * @default 1
     */
    defaultCurrent: number;
    /**
     * @desc 总数
     */
    total: number;
    /**
     * @desc 一页多少条
     * @default 10
     */
    pageSize: number;
    /**
     * @desc 暂时这个无意义
     */
    defaultPageSize: number;
    /**
     * @desc 是否只剩一页的时候 不展示
     * @default -
     */
    hideOnSinglePage: boolean;
    /**
     * @desc 是否显示原生 tooltip 页码提示
     */
    showTitle: boolean;
    disabled: boolean;
    /**
     * @desc 当页数多的时候，跳转前5页的按钮
     */
    jumpPrevIcon?: React.ReactElement | React.FC;
    /**
     * @desc 当页数多的时候，跳转后5页的按钮
     */
    jumpNextIcon?: React.ReactElement | React.FC;
    /**
     * @desc 上一步的按钮
     */
    prevIcon: React.ReactElement | React.FC<{disabled: boolean}>;
    /**
     * @desc 下一步的按钮
     */
    nextIcon: React.ReactElement | React.FC<{disabled: boolean}>;
    /**
     * @desc 是否显示上一步下一步
     * @default true
     */
    showPrevNextJumpers?: boolean;
}
export interface PaginationProps
    extends Partial<PaginationData>,
    React.AriaAttributes {
    /**
     * @desc 页码改变的回调，参数是改变后的页码及每页条数
     */
    onChange?: (page: number, pageSize: number) => void;
    // 暂不支持调整页数
    // onShowSizeChange?: (current: number, size: number) => void;
    /**
     * @desc 用于自定义页码的结构，可用于优化 SEO
     */
    itemRender?: (
        page: number,
        type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
        element: React.ReactNode,
    ) => React.ReactNode;
    /**
     * @desc 通过设置 showTotal 展示总共有多少数据。
     */
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}
