import React, {forwardRef} from 'react';
import cn from 'classnames';
import {AigcSystemClose} from 'loki-icon';
import Modal from '../Modal';

interface PlayerProps {
    maskClassName: string;
    videoClassName: string;
    bodyClassName: string;
    style?: React.CSSProperties;
    onCancel?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
    open: boolean;
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
    src: string;
    footer: React.ReactNode;
    videoProps: React.VideoHTMLAttributes<HTMLVideoElement>;
    [key: string]: any;
}

const defaultVideoProps = {
    disablePictureInPicture: true,
    controlsList: 'nodownload noremoteplayback noplaybackrate',
    controls: true,
    autoPlay: true,
};


const Player = forwardRef<HTMLDivElement, PlayerProps>(
    (props, ref) => {
        const {
            maskClassName = 'backdrop-blur-[5px] backdrop-saturate-[1.8]',
            videoClassName,
            bodyClassName,
            style,
            onCancel,
            open,
            videoRef,
            src,
            videoProps = defaultVideoProps,
            footer,
            ...rest
        } = props;
        const handleClose = e => {
        // 避免被Modal组件的useEffect影响
            if (!e) {
                return;
            }
            onCancel?.(e);
        };

        return (
            <div ref={ref}>
                {
                    open && (
                        <Modal
                            className={maskClassName}
                            open={open}
                            onCancel={handleClose}
                            isPlayer
                            footer={footer}
                            bodyClassName={bodyClassName}
                            {
                                ...rest
                            }
                            centered
                        >
                            <div className="rounded-xl">
                                <div
                                    onClick={handleClose}
                                    // eslint-disable-next-line max-len
                                    className="absolute top-4 right-4 cursor-pointer z-10 w-5 h-5 rounded-full bg-[--color-fill] flex items-center justify-center"
                                >
                                    <span className="absolute cursor-pointer z-10 text-base text-[--seed-token-white]">
                                        <AigcSystemClose />
                                    </span>
                                </div>
                                <div className="bg-video rounded-xl">
                                    <video
                                        className={cn('rounded-xl w-full', videoClassName)}
                                        ref={videoRef}
                                        {
                                            ...videoProps
                                        }
                                    >
                                        <source src={src} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </Modal>
                    )
                }
            </div>
        );
    });

export default Player;
