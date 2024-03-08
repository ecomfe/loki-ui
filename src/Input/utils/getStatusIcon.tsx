import React from 'react';
import {AigcSystemRight, AigcSystemWrong} from 'loki-icon';

const getStatusIcon = (status?: 'success' | 'error') => {
    const isSuccess = status === 'success';
    const isError = status === 'error';
    if (!isSuccess && !isError) {
        return null;
    }
    return (
        <>
            {isSuccess && (
                <span className="text-[--color-success-base] inline-flex items-center text-[16px]">
                    <AigcSystemRight />
                </span>
            )}
            {isError && (
                <span className="text-[--color-error-base] inline-flex items-center text-[16px]">
                    <AigcSystemWrong />
                </span>
            )}
        </>
    );
};

export default getStatusIcon;
