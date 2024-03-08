import React, {createContext, useContext, useEffect, useState, useMemo} from 'react';
import type {ThemeContextType} from './interface';

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const useTheme = (): ThemeContextType => useContext(ThemeContext);


const ThemeProvider = ({children, defaultTheme}) => {
    const [theme, setTheme] = useState<ThemeContextType['theme']>(defaultTheme || 'light'); // 默认主题
    const [followSystem, setFollowSystem] = useState<boolean>(true);

    // 监听系统主题变化的函数
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (!followSystem) {
            return;}
        setTheme(e.matches ? 'dark' : 'light');
    };

    useEffect(
        () => {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', handleSystemThemeChange);

            // 移除监听器
            return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
        },
        [followSystem]
    );

    useEffect(
        () => {
            if (theme === 'dark') {
                document.body.classList.add('loki-dark');
            } else {
                document.body.classList.remove('loki-dark');
            }
        },
        [theme]
    );

    const api = useMemo(
        () => ({
            setLight: () => {
                setTheme('light');
                setFollowSystem(false);
            },
            setDark: () => {
                setTheme('dark');
                setFollowSystem(false);
            },
            setSystem: () => {
                setFollowSystem(true);
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                setTheme(mediaQuery.matches ? 'dark' : 'light');
            }
        }),
        []
    );

    const store = useMemo(
        () => ({
            theme,
            api,
        }),
        [theme, api]
    );
    return (
        <ThemeContext.Provider value={store}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
