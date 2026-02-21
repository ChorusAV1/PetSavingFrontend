import React, { type JSX } from 'react'

interface ViewControlProps
{
    children: React.ReactNode;
}

const ViewControl: React.FC<ViewControlProps> = ({ children }: ViewControlProps): JSX.Element =>
{
    return (
        <div className="flex flex-col grow">
            {children}
        </div>
    )
}

export default ViewControl