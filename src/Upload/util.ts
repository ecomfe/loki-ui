/* eslint-disable camelcase */

import {MediaType} from './dicts';
import {LocalUploadFile, SplitFileInfo} from './interface';

interface LoadParams {
    file?: LocalUploadFile;
    url?: string;
}
interface FileStatus {
    mid: string;
    timestamp: number;
    status: string;
    type: string;
    duration: number;
    url: string;
    thumbnail: string;
    error: string;
    width: number;
    height: number;
    name: string;
    materialId?: string;
}

function loadVideo({file, url}: LoadParams): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
        const videoElem = document.createElement('video');
        const dataUrl = file ? URL.createObjectURL(file) : url;
        videoElem.onloadeddata = () => {
            resolve(videoElem);
        };
        videoElem.onerror = () => {
            reject('video加载失败');
        };
        videoElem.setAttribute('preload', 'auto');
        videoElem.src = dataUrl || '';
    });
}

function loadImage({file, url}: LoadParams): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const imgElem = document.createElement('img');
        const dataUrl = file ? URL.createObjectURL(file) : url;
        imgElem.src = dataUrl || '';
        imgElem.onload = () => {
            resolve(imgElem);
        };
        imgElem.onerror = () => {
            reject('image加载失败');
        };
    });
}

export const getFileType = (type: string) => type.split('/')[0];
export const getFileExt = (name: string) => name.split('.').pop()?.toLowerCase();
function toHttps(url?: string) {
    return url?.replace(/^http:\/\//, 'https://');
}

/**
 * @param {*} file 文件信息
 * @param {*} size 文件分片大小
 * @returns Promise
 */
export function splitFile(file: LocalUploadFile, size = 5 * 1024 * 1024): Promise<SplitFileInfo[]> {
    const fileList: SplitFileInfo[] = [];
    // 文件分片长度
    const len = Math.ceil(file.size / size);
    const blobSlice = File.prototype.slice;
    const fileReader = new FileReader();
    let current = 0;

    const loadNext = (size: number) => {
        const start = current * size;
        const end = start + size >= file.size ? file.size : start + size;
        const sliceFile = blobSlice.call(file, start, end);
        // 将切片文件保存
        fileList.push({
            key: current,
            file: sliceFile,
        });
        fileReader.readAsArrayBuffer(sliceFile);
    };

    return new Promise((resolve, reject) => {
        try {
            loadNext(size);
        } catch (err) {
            reject(err);
        }
        // 文件读取完毕之后的处理
        fileReader.onload = () => {
            try {
                current += 1;
                if (current < len) {
                    // 文件递归读取
                    loadNext(size);
                } else {
                    // 文件全部读取完, 返回对应信息
                    resolve(fileList);
                }
            } catch (err) {
                reject(err);
            }
        };
    });
}

function isHorizontal(width: number, height: number) {
    return width > height;
}

function getDataUrl(el: HTMLVideoElement | HTMLImageElement) {
    const canvas = document.createElement('canvas');
    // @ts-ignore
    const originWidth = el.videoWidth ?? el.width;
    // @ts-ignore
    const originHeight = el.videoHeight ?? el.height;
    let width = originWidth;
    let height = originHeight;
    if (isHorizontal(width, height) && width > 1280) {
        height = (1280 * height) / width;
        width = 1280;
    } else if (!isHorizontal(width, height) && height > 1280) {
        width = (1280 * width) / height;
        height = 1280;
    }
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d')!.drawImage(el, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/webp', 0.1);
    return {dataUrl, width, height};
}

export async function drawFrame(file: LocalUploadFile) {
    return new Promise(async (resolve) => {
        const type = getFileType(file.type);
        try {
            const el = type === MediaType.video ? await loadVideo({file}) : await loadImage({file});
            const data = getDataUrl(el);
            resolve(data);
        } catch (e) {
            resolve({});
        }
    }).catch((err) => {
        return {};
    });
}

export async function getFileStatus(file: LocalUploadFile, needDrawFrame: boolean = false): Promise<FileStatus> {
    const {status, response, type = '', mid, timestamp, materialId} = file;
    const error = file.error || '';
    const mediaType = getFileType(type);
    let {coverImage, width, height} = file;
    if (!coverImage && needDrawFrame) {
        // @ts-ignore
        // 不论视频、图片都使用抽帧图做封面
        ({dataUrl: coverImage = '', width = 0, height = 0} = await drawFrame(file));
        file.coverImage = coverImage;
        file.width = width;
        file.height = height;
    }
    const uploadStatus = status || 'error';
    const url = toHttps(response?.url)!;
    const materialIdObj = materialId
        ? {
              materialId,
          }
        : {};
    const fileStatus: FileStatus = {
        mid,
        timestamp,
        status: uploadStatus,
        type: mediaType,
        duration: response?.duration ?? 0,
        url,
        thumbnail: coverImage || url,
        error,
        width,
        height,
        name: file.name,
        ...materialIdObj,
    };

    return fileStatus;
}

type PromiseAllWithLimitIterator<T> = (item: T) => Promise<any>;
export async function promiseAllWithLimit<T>(
    concurrencyLimit: number,
    items: T[],
    iterator: PromiseAllWithLimitIterator<T>,
): Promise<any[]> {
    const results: Array<Promise<any>> = [];
    const runningPromises: Array<Promise<void>> = [];

    for (const item of items) {
        const promise = Promise.resolve().then(() => iterator(item));
        results.push(promise);

        if (concurrencyLimit <= items.length) {
            const cleanup = promise.then(() => {
                return runningPromises.splice(runningPromises.indexOf(cleanup), 1);
            }) as Promise<void>;
            runningPromises.push(cleanup);

            if (runningPromises.length >= concurrencyLimit) {
                await Promise.race(runningPromises);
            }
        }
    }

    return Promise.allSettled(results);
}

let index = 0;
export function getUid(): string {
    const now = +new Date();
    return `${now}${++index}`;
}
