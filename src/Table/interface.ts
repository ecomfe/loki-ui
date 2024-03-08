import type {ColumnDef} from '@tanstack/react-table';
import type {PaginationProps} from '../Pagination';

export interface CustomTableProps<T = any> {
    /**
     * @desc 参考 https://tanstack.com/table/v8/docs/guide/column-defs
     */
    columns: Array<ColumnDef<T>>;
    /**
     * @desc 参考 https://tanstack.com/table/v8/docs/guide/column-defs
     */
    dataSource: T[];
    /**
     * @desc 是否loading中
     * @default false
     */
    loading?: boolean;
    /**
     * @desc loading的React element
     */
    spin?: React.ReactElement;
    /**
     * @desc loading的icon，传递spin则无需传递loadingIcon，使用loadingIcon是loading的旋转元素
     */
    loadingIcon?: React.ReactElement;
    /**
     * @desc 分页相关参数同Pagination组件参数，传递null不分页
     */
    pagination?: PaginationProps;
    /**
     * @desc 表格最小高度
     */
    minHeight?: number;
    /**
     * @desc 表格最大高度，当sticky的时候必须设置
     */
    maxHeight?: number;
    /**
     * @desc 是否表头固定
     */
    sticky?: boolean;
    /**
     * @desc 表格的style
     */
    style?: React.CSSProperties;
    /**
     * @desc 表格的className
     */
    className?: string;
    /**
     * @desc 细分表格头，表格体，表格行，以及行内每个的className
     */
    classNames?: {
        header?: string;
        body?: string;
        row?: string;
        ceil?: string;
    };
    /**
     * @desc 当table内容区滚动时候，滚动容器的ref
     */
    scrollRef?: React.RefObject<HTMLDivElement>;
    /**
     * @desc 列表为空的时候占位
     */
    empty?: React.ReactElement;
}
