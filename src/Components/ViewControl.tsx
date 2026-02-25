import React, { type JSX } from 'react'

interface ViewControlProps
{
    children: React.ReactNode;
}

const ViewControl: React.FC<ViewControlProps> = ({ children }: ViewControlProps): JSX.Element =>
{
    return (
        <>
            {children}
        </>
    )
}

export default ViewControl