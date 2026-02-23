import React, { type JSX, type ReactNode } from 'react'

interface GenericContainerProps 
{
    children: ReactNode;
    textSize?: number;
}

const GenericContainer: React.FC<GenericContainerProps> = ({ children, textSize}: GenericContainerProps): JSX.Element =>
{
    const textSizeClass = textSize ? `text-[${textSize}px]` : "";

    return (
        <div className={`flex flex-col justify-center dark:bg-[#202020] border dark:border-black mx-2.5 p-2.5 dark:text-white ${textSizeClass} rounded`}>
            {children}
        </div>
    )
}

export default GenericContainer