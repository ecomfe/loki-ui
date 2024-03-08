type Theme = 'light' | 'dark';
export interface ThemeContextType {
    /**
     * @description 当前的主题
     * @default "light"
     */
    theme: Theme;
    /**
     * @description 设置主题的方法
     * @default ""
     */
    api: {
        /**
         * @description 设置亮色
         * @default ""
         */
        setLight: () => void;
         /**
         * @description 设置暗黑
         * @default ""
         */
        setDark: () => void;
        /**
         * @description 设置并监听跟随系统
         * @default ""
         */
        setSystem: () => void;
    };
}
