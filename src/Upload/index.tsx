/* eslint-disable max-len */
import cn from 'classnames';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {MediaType, UploadedMediaError, UploadedMediaStatus} from './dicts';
import defaultPost from './request';
import {getFileExt, getFileStatus, getFileType, getUid, promiseAllWithLimit, splitFile} from './util';
import {
    BlockUploadParam,
    CompUploadResponse,
    LocalUploadFile,
    PreUploadResponse,
    SplitFileInfo,
    UploadParam,
    UploadProps,
    BlockUploadResponse,
    UploadResponse,
} from './interface';

const MAX_CONCURRENT_UPLOADS = 10;

const defaultAction = {
    // 上传图片
    upload: '/aigc/saas/pc/upload/v1/upload',

    // 上传视频 - 预上传
    preUpload: '/aigc/saas/pc/upload/v1/preBlockUpload',

    // 上传视频 - 分片上传
    blockUpload: '/aigc/saas/pc/upload/v1/blockUpload',

    // 上传视频 - 合成
    compositionUpload: '/aigc/saas/pc/upload/v1/compBlockUpload',
};

const Upload: React.FC<UploadProps> = ({
    action,
    accept = 'image/jpg,image/png,video/mp4',
    drawCover = false,
    children,
    className,
    customPost,
    disabled,
    data = {},
    multiple = false,
    // 最大并发下载数
    maxCount = 1,
    imageSize = 20,
    videoSize = 200,

    // 图片最小尺寸，指的是图片的长宽中最小的一个
    minWithAndHeight = 100,

    onChange,

    // 当次最大可上传文件数,目前超出是截断处理
    maxUploadCount = 1,
}) => {
    const imageMaxFileSize = imageSize * 1024 * 1024;
    const videoMaxFileSize = videoSize * 1024 * 1024;
    const imageMaxSizeText = `${imageSize}M`;
    const videoMaxSizeText = `${videoSize}M`;
    action = {
        ...defaultAction,
        ...action,
    };

    // 当前下载的文件队列
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);

    // 剩余要下载的队列
    const [leftList, setLeftList] = useState<LocalUploadFile[]>([]);
    const fileListRef = useRef<LocalUploadFile[]>([]);
    const uploadRef = useRef<HTMLInputElement>(null);

    const post = customPost || defaultPost;
    const uploadFile = useCallback(
        (url: string, params: BlockUploadParam): Promise<BlockUploadResponse | UploadResponse> => {
            const data = new FormData();
            Object.keys(params).forEach((key: string) => {
                data.append(key, params[key]);
            });
            return new Promise((resolve, reject) => {
            // @ts-ignore
                post(url, data)
                    .then((res: BlockUploadResponse | UploadResponse) => {
                        if (+res.errno === 0) {
                            resolve(res);
                        } else {
                            reject(res.errmsg);
                        }
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        [post]
    );

    // 下载队列中过滤掉已上传文件
    const handleFileUploaded = useCallback(
        (file: LocalUploadFile) => {
            fileListRef.current = fileListRef.current.filter(item => item.mid !== file.mid);
            setFileList([...fileListRef.current]);
        },
        []
    );

    // 状态更新
    const onStatusChange = useCallback(
        async ({file, fileList, first}: any) => {
            const uploadList = fileList?.length ? fileList : [file];
            for (const file of uploadList) {
                if (first) {
                    const fileStatusWithNoFrame = await getFileStatus(file, false);
                    onChange(fileStatusWithNoFrame);
                }

                const fileStatus = await getFileStatus(file, drawCover);

                if (
                    fileStatus.status === UploadedMediaStatus.success
                    || fileStatus.status === UploadedMediaStatus.error
                ) {
                    handleFileUploaded(file);
                }
                onChange(fileStatus);
            }
        },
        [drawCover, handleFileUploaded, onChange],
    );

    const onError = useCallback(
        (file: LocalUploadFile, error: string = '上传失败') => {
            file.status = UploadedMediaStatus.error;
            file.error = error;
            onStatusChange({file});
        },
        [onStatusChange],
    );

    const preVideoUpload = useCallback(
        async (file: LocalUploadFile) => {
            try {
                const res: PreUploadResponse = await post(action.preUpload, {
                    fileExt: getFileExt(file.name),
                });
                if (res.errno === 0) {
                    file.uploadKey = res.data.uploadKey;
                    return file;
                } else {
                    throw new Error(res.errmsg || '上传失败');
                }
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        [post],
    );

    const batchUpload = useCallback(
        async (fileList: SplitFileInfo[], uploadKey: string) => {
            return promiseAllWithLimit(MAX_CONCURRENT_UPLOADS, fileList, ({key, file}) => {
                const blockUploadParams = {
                    uploadKey,
                    chunk: key + 1,
                    file,
                } as unknown as BlockUploadParam;
                return uploadFile(action.blockUpload, blockUploadParams);
            });
        },
        []
    );

    const finalUpload = useCallback(
        async (file: LocalUploadFile) => {
            let retryCount = 4;
            const send = async () => {
                try {
                    const res: CompUploadResponse = await post(action.compositionUpload, {
                        uploadKey: file.uploadKey,
                        chunks: file.chunks,
                    });
                    if (+res.errno === 0) {
                        file.response = res.data;
                        file.status = UploadedMediaStatus.success;
                        onStatusChange({file});
                    } else if (retryCount > 0) {
                        retryCount--;
                        await send();
                    } else {
                        onError(file);
                    }
                } catch (e) {
                    if (retryCount > 0) {
                        retryCount--;
                        await send();
                    } else {
                        onError(file);
                    }
                }
            };
            await send();
        },
        [post, onStatusChange, onError],
    );

    const handleVideoUpload = useCallback(
        async (file: LocalUploadFile) => {
            try {
                await preVideoUpload(file);
                const fileList = await splitFile(file);
                const chunks = fileList.length;
                file.chunks = chunks;
                await batchUpload(fileList, file.uploadKey);
                await finalUpload(file);
            } catch (e) {
                onError(file);
            }
        },
        [preVideoUpload, batchUpload, finalUpload, onError],
    );

    const handleImageUpload = useCallback(
        async (file: LocalUploadFile) => {
            const params = {
                file,
                fileExt: getFileExt(file.name),
                ...data
            } as UploadParam;
            try {
                // @ts-ignore
                const res = await uploadFile(action.upload, params);
                file.response = res.data;
                file.status = UploadedMediaStatus.success;
                // @ts-ignore
                if (res.data?.mid) {
                    // @ts-ignore
                    file.materialId = res.data?.mid;
                }
                onStatusChange?.({file});
            } catch (e) {
                onError(file);
            }
        },
        [onStatusChange, onError],
    );

    const customUpload = useCallback(
        async (file: LocalUploadFile) => {
            const {type = '', size, width, height} = file;
            const fileType = getFileType(type);
            const isVideo = fileType === MediaType.video;
            const maxFileSize = isVideo ? videoMaxFileSize : imageMaxFileSize;
            const maxSizeText = isVideo ? videoMaxSizeText : imageMaxSizeText;
            if (size > maxFileSize) {
                onError(file, `图片不能超过${maxSizeText}`);
                return;
            }
            if (Math.min(width, height) < minWithAndHeight) {
                onError(file, `图片尺寸过小，宽和高需${minWithAndHeight}px或以上`);
                return;
            }

            if (isVideo) {
                await handleVideoUpload(file);
            } else {
                await handleImageUpload(file);
            }
        },
        [
            imageMaxFileSize,
            imageMaxSizeText,
            videoMaxFileSize,
            videoMaxSizeText,
            minWithAndHeight,
            handleVideoUpload,
            handleImageUpload,
        ],
    );

    const beforeUploadHandler = useCallback(
        async (fileList: LocalUploadFile[]) => {
            const uploadFileList = fileList.map(item => {
                item.status = UploadedMediaStatus.uploading;
                return item;
            });
            await onStatusChange({fileList: uploadFileList});
            for (const file of uploadFileList) {
                await customUpload(file);
            }
        },
        [onStatusChange, customUpload],
    );

    const handleChange = useCallback(
        async (e: any) => {
            let fileList = e.target.files;
            if (fileList.length > maxUploadCount) {
                fileList = Array.from(fileList).slice(0, maxUploadCount);
            }
            const uploadList = [...leftList, ...Array.from(fileList)].map((item: LocalUploadFile) => {
                item.mid = item.mid || getUid();
                item.timestamp = item.timestamp || getUid();
                item.status = item.status || UploadedMediaStatus.waiting;
                return item;
            });
            await onStatusChange({fileList: uploadList, first: true});
            setLeftList(uploadList);
        },
        [maxUploadCount, leftList, onStatusChange],
    );

    useEffect(
        () => {
            if (leftList.length && fileListRef.current?.length < maxCount) {
                // 取出需要加入下载队列的文件
                const tobeUploadList = leftList.splice(0, maxCount - fileListRef.current.length);

                fileListRef.current = [...fileListRef.current, ...tobeUploadList];

                // 只需要下载新增的文件
                beforeUploadHandler([...tobeUploadList]);

                // 更新等待下载队列
                setLeftList(leftList);
            }
        },
        [maxCount, leftList, beforeUploadHandler]
    );

    // 清空input value,防止同名文件无法上传
    const handleUpload = useCallback(
        () => {
            if (uploadRef.current) {
                uploadRef.current.value = '';
                uploadRef.current?.click();
            }
        },
        []
    );

    return (
        <div onClick={handleUpload} className={cn(className)}>
            <input
                disabled={disabled}
                type="file"
                ref={uploadRef}
                multiple={multiple}
                accept={accept}
                onChange={handleChange}
                style={{display: 'none'}}
            />
            {children}
        </div>
    );
};

if (process.env.NODE_ENV !== 'production') {
    Upload.displayName = 'Upload';
}
export default Upload;
