import notification from '../Notification';
import useMessage from './useMessage';
import type {NoticeType, MsgMethodsType} from './interface';
import createMessage, {methods} from './createMessage';
const baseMethods = {
    open: createMessage(),
    destroy: notification.destroy,
    useMessage,
    config: notification.config,
};

const msgMethods = methods.reduce((actions, type: NoticeType) => {
    actions[type] = createMessage(type);
    return actions;
}, {} as MsgMethodsType);

export default {
    ...baseMethods,
    ...msgMethods,
} as const;
