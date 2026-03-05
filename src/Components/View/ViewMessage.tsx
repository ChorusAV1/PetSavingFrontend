import React, { type JSX } from 'react'

interface ViewMessageProps
{
    message: string;
}

const ViewMessage: React.FC<ViewMessageProps> = ({ message }: ViewMessageProps): JSX.Element =>
{
    return (
        <div className="dark:text-white text-center mt-5">
            <p className="dark:text-[#909090]">{message}</p>
        </div>
    )
}

export default ViewMessage