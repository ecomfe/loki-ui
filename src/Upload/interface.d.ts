export const UploadKey = 'AIGC_PC_EDITOR_LOCAL_MEDIAS';

export enum UploadedMediaStatus {
    'error' = 'error',
    'success' = 'success',
    'uploading' = 'uploading',
    'removed' = 'removed',
    'waiting' = 'waiting',
}

export enum UploadedMediaError {
    'uploadFailed' = 'uploadFailed',
    'overSize' = 'overSize',
    'sizeError' = 'sizeError',
}

export enum MediaType {
    'video' = 'video',
    'image' = 'image',
}

export interface UploadProps {
    action?: Record<'upload' | 'preUpload' | 'blockUpload' | 'compositionUpload', string>;
    accept?: string;
    drawCover?: boolean;
    children: ReactNode | HTMLElement;
    customPost?: (action: string, option: UploadRequestOption) => Promise<any>;
    disabled?: boolean;
    needProcess?: boolean;
    onChange: (e: Partial<MaterialProps>) => void;
    multiple?: boolean;
    maxCount?: number;
    maxUploadCount?: number;
    imageSize?: number;
    videoSize?: number;
    className?: string;
    totalCount?: number;
    minWithAndHeight?: number;
    data?: Record<string, any>;
}

// TODO: 待补充
// interface UploadFile {
//     fieldname: string;
//     originalname: string;
//     encoding: string;
//     mimetype: string;
// }
export interface CustomUploadFile {
    timestamp?: number;
    uploadKey?: string;
    size: number;
    needProcess: boolean;
    appId: number | null;
    chunks: number;
}

export type LocalUploadFile = UploadFile & CustomUploadFile;

export interface SplitFileInfo {
    key: number;
    file: LocalUploadFile;
}

interface Response {
    errno: number;
    errmsg: string;
}

export interface PreUploadResponse extends Response {
    data: {
        uploadKey: string;
    };
}

export interface BlockUploadResponse extends Response {
    data: {
        uploadKey: string;
    };
}

export interface CompUploadResponse extends Response {
    data: {
        url: string;
        duration: number;
    };
}

export interface UploadResponse extends Response {
    data: {
        url: string;
    };
}

export interface PreUploadParam {
    fileExt: string;
}
export interface BlockUploadParam {
    uploadKey: string;
    chunk: number;
    file: File;
}
export interface CompUploadParam {
    uploadKey: string;
    chunks: number;
}
export interface UploadParam {
    fileExt: string;
    file: File;
}

export interface MediaProps {
    [key: string]: any;
    url: string;
    thumbnail: string;
    mid: string;
    timestamp: string;
    // 上传状态
    status: UploadedMediaStatus;
    // 文件类型
    type: MediaType;
    duration: number;
    // 源文件;
    url: string;
    // 封面
    thumbnail: string;
    error: UploadedMediaError;
}

export interface PastedImg {
    url: string;
    beforeParagraph: string;
    afterParagraph: string;
}

export type BeforeUploadFileType = File | Blob | boolean | string;

export type Action = string | ((file: LeoFile) => string | PromiseLike<string>);

export interface UploadProgressEvent extends Partial<ProgressEvent> {
    percent?: number;
}

export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';

export type UploadRequestHeader = Record<string, string>;

export interface UploadRequestError extends Error {
    status?: number;
    method?: UploadRequestMethod;
    url?: string;
}

export interface UploadRequestOption<T = any> {
    onProgress?: (event: UploadProgressEvent) => void;
    onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void;
    onSuccess?: (body: T, xhr?: XMLHttpRequest) => void;
    data?: Record<string, unknown>;
    filename?: string;
    fileExt?: string;
    file?: Exclude<BeforeUploadFileType, File | boolean> | LeoFile;
    withCredentials?: boolean;
    action?: string;
    headers?: UploadRequestHeader;
    method?: UploadRequestMethod;
    uploadKey?: string;
    chunks?: number;
}

export interface LeoFile extends File {
    uid: string;
}
