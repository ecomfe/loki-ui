import type {UploadProgressEvent, UploadRequestError, UploadRequestOption} from './interface';

function getError(option: UploadRequestOption, xhr: XMLHttpRequest) {
    const msg = `cannot ${option.method} ${option.action} ${xhr.status}'`;
    const err = new Error(msg) as UploadRequestError;
    err.status = xhr.status;
    err.method = option.method;
    err.url = option.action;
    return err;
}

function getBody(xhr: XMLHttpRequest) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

export default function post(action: string, option: UploadRequestOption): Promise<any> {
    option = {
        ...option,
        action,
        method: 'post',
    };
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        if (option.onProgress && xhr.upload) {
            xhr.upload.onprogress = function progress(e: UploadProgressEvent) {
                if (e.total! > 0) {
                    e.percent = (e.loaded! / e.total!) * 100;
                }
                option.onProgress?.(e);
            };
        }

        const formData = new FormData();
        if (option.data) {
            Object.keys(option.data).forEach((key) => {
                const value = option.data?.[key];
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(`${key}[]`, item);
                    });
                    return;
                }
                formData.append(key, value as string | Blob);
            });
        }

        if (option.file instanceof Blob) {
            formData.append(option.filename!, option.file, (option.file as any).name);
        } else {
            formData.append(option.filename!, option.file!);
        }

        xhr.onerror = function error(e) {
            reject(e);
        };

        xhr.onload = function onload() {
            if (xhr.status < 200 || xhr.status >= 300) {
                const error = getError(option, xhr);
                reject(error);
            } else {
                resolve(getBody(xhr));
            }
        };

        xhr.open(option.method!, option.action!, true);

        if (option.withCredentials && 'withCredentials' in xhr) {
            xhr.withCredentials = true;
        }

        const headers = option.headers || {};
        if (headers['X-Requested-With'] !== null) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }

        Object.keys(headers).forEach((h) => {
            if (headers[h] !== null) {
                xhr.setRequestHeader(h, headers[h]);
            }
        });

        xhr.send(formData);
    });
}
