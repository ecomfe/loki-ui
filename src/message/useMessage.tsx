import {useMemo} from 'react';
import useNotification from '../Notification/useNotification';
import type {NotifyBaseProps} from '../NotifyBase/interface';
import {methods} from './createMessage';
import type {StaticMessageFunction} from './interface';

const useMessage = (params?: NotifyBaseProps) => {
    const [api, contextHolder] = useNotification(params);
    const messageApi = useMemo(
        () => {
            const staticMethods: StaticMessageFunction = {...api} as StaticMessageFunction;
            methods.forEach(method => {
                staticMethods[method] = (...args) => {
                    // cons
                    if (typeof args[0] === 'object') {
                        const params = args[0];
                        params.placement = 'top';
                        return api[method](params);
                    }
                    const [configOrContent, duration = 2, onClose] = args;
                    const config = {
                        content: configOrContent,
                        duration,
                        type: method,
                        onClose,
                        placement: 'top',
                    } as const;
                    return api.open(config);
                };
            });
            return staticMethods;
        },
        [api]
    );

    return [messageApi, contextHolder] as const;
};
export default useMessage;
