import React from 'react';
import Button from '../Button';

interface EmptyProps {
    src?: string | React.ReactNode; // 图片url或图片本身
    title?: string; // 标题
    text: string; // 提示文案
    buttonType: 'primary' | 'link'; // button的类型
    buttonText?: string; // button的文字
    onClick?: () => void; // button的click事件 

}
export default function Empty({src, title, text, buttonType, buttonText, onClick}: EmptyProps) {
    let Icon = null;
    let ButtonElement = <></>;
    if (src) {
        if (typeof src === 'string') {
            Icon = <img className="w-full h-full object-cover" src={src} />;
        }
        else if (React.isValidElement(src)) {
            Icon = src;
        }
    }

    if (buttonType && buttonText) {
        if (['primary', 'link'].includes(buttonType)) {
            ButtonElement = (
                <Button
                    type={buttonType}
                    onClick={onClick}
                    className="mt-[8px] flex justify-center items-center"
                >
                    {buttonText}
                </Button>
            );
        }
    }


    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                {
                    Icon && (
                        <div className="flex justify-center w-[120px] h-[120px] mb-[12px] overflow-hidden">
                            {Icon}
                        </div>
                    )
                }
                <div className={`text-[--color-text] text-center text-[16px] leading-[24px] not-italic font-medium leading-6
                    flex justify-center items-center ${title && 'mb-[4px]'}`}
                >
                    {title}
                </div>
                <div
                    className={`${title ? 'text-[--color-text-tertiary]' : 'text-[--color-text]'}
                    text-[14px] leading-[22px] not-italic font-normal text-center leading-[22px]`}
                >
                    {text}
                </div>
                <div>
                    {
                        ButtonElement
                    }
                </div>
            </div>
        </div>
    );
}
