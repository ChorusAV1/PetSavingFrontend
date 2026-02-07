import React, { type JSX } from 'react'

interface ViewControlProps
{
    children: React.ReactNode;
    activeView: string;
}

interface ViewProps 
{
    name: string;
}

const ViewControl: React.FC<ViewControlProps> = ({ children, activeView }: ViewControlProps): JSX.Element =>
{
    return (
        <>
            {React.Children.map(children, (child) =>
            {
                if (React.isValidElement<ViewProps>(child) && child.props.name === activeView)
                {
                    return child;
                }

                return null;
            })}
        </>
    )
}

export default ViewControl