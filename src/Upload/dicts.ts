export const localUploadKey = 'AIGC_PC_EDITOR_LOCAL_MEDIAS';

export enum UploadedMediaStatus {
    'error' = 'error',
    'success' = 'success',
    // 'done' = 'done',
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

export const imageSize = 15;

export const errorMap: Record<UploadedMediaError, string> = {
    overSize: `图片超过${imageSize}M`,
    uploadFailed: '上传失败',
    sizeError: '短边需≥100px',
};
