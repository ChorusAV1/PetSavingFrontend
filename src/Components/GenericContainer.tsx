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
        <div className={`flex flex-col justify-center dark:bg-[#202020] border border-[#DADCDB] dark:border-black mx-2.5 p-2.5 dark:text-white ${textSizeClass} rounded shadow dark:shadow-none`}>
            {children}
        </div>
    )
}

export default GenericContainer