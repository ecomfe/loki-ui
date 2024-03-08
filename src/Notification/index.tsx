import React from 'react';
import ReactDOM from 'react-dom';
import NotifyBase from '../NotifyBase';
import type {MessageArgs} from '../NotifyBase/interface';
import useNotification from './useNotification';
import type {GlobalConfigProps, NotificationContext} from './interface';
export interface BaseMethods {
    open: (config: MessageArgs) => Promise<unknown>;
    destroy: (key?: React.Key) => void;
    config: (config: GlobalConfigProps) => void;
    useNotification: typeof useNotification;
}
type StaticFn = (config: MessageArgs) => void;

interface NoticeMethods {
    success: StaticFn;
    info: StaticFn;
    warning: StaticFn;
    error: StaticFn;
}
type Task =
    | {
        type: 'open';
        config: MessageArgs;
    }
    | {
        type: 'destroy';
        key: React.Key;
    };
const methods: Array<keyof NoticeMethods> = ['success', 'info', 'warning', 'error'];
const taskQueue: Task[] = [];

const notificationCtx: NotificationContext = {} as NotificationContext;

const defaultGlobalConfig: GlobalConfigProps = {};
function setNotificationGlobalConfig(config: GlobalConfigProps) {
    Object.assign(defaultGlobalConfig, config);
}
function flushNotice() {
    if (taskQueue.length === 0) {
        return;
    }
    if (!notificationCtx.instance) {
        const container = document.createDocumentFragment();
        const {top, bottom, left, right} = defaultGlobalConfig;
        const positionConfig = {top, bottom, left, right};
        // 首次创建实例
        ReactDOM.render(
            <NotifyBase
                ref={ref => {
                    notificationCtx.instance = ref;
                    flushNotice();
                }}
                {...positionConfig}
            />, container);
        return;
    }
    const task = taskQueue[0];
    switch (task.type) {
        case 'open':
        {
            const {top, bottom, left, right, ...restConfig} = defaultGlobalConfig;
            notificationCtx.instance?.open({
                // merge 全局配置
                ...restConfig,
                ...task.config,
            });
            break;
        }
        case 'destroy':
            notificationCtx.instance?.destroy(task.key);
            break;
        default:
            throw new Error('unknown type');
    }
    taskQueue.shift();
    flushNotice();
}
function open(config: MessageArgs) {
    let reslove = (e?: any) => {};
    const retPromise = new Promise(res => {
        reslove = res;
    });
    const oldClose = config.onClose;
    config.onClose = id => {
        oldClose?.(id);
        reslove();
    };
    taskQueue.push({
        type: 'open',
        config: {
            ...config,
            id: config.key || config.id || new Date().getTime().toString()
        },
    });
    flushNotice();
    return retPromise;
}

function destroy(key: React.Key) {
    taskQueue.push({
        type: 'destroy',
        key,
    });
    flushNotice();
}

const baseMethods = {
    open,
    destroy,
    useNotification,
    config: setNotificationGlobalConfig,
} as BaseMethods;


const noticeMethods = methods.reduce((actions, type: keyof NoticeMethods) => {
    actions[type] = config => open({...config, type});
    return actions;
}, {} as NoticeMethods);

export default {
    ...baseMethods,
    ...noticeMethods,
} as const;
