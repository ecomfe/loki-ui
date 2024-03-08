import React from 'react';
import type {PaginationProps} from 'loki-ui';
import {Pagination} from 'loki-ui';

const HandleBtn: React.FC<React.PropsWithChildren<{disabled?: boolean}>> = ({disabled, children}) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold
            py-1 px-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed
            transition-all duration-200"
            disabled={disabled}
        >
            {children}
        </button>
    );
};
const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
        return <HandleBtn>Previous</HandleBtn>;
    }
    if (type === 'next') {
        return <HandleBtn>Next</HandleBtn>;
    }
    return originalElement;
};

const App: React.FC = () => <Pagination total={500} itemRender={itemRender} />;

export default App;
