import React, { type JSX } from 'react'

interface Props {
    children: React.ReactNode;
    activeView: string;
}

const ViewControl: React.FC<Props> = ({ children, activeView }: Props): JSX.Element => {
    return (
        <>
            {React.Children.map(children, (child) =>
            {
                if (React.isValidElement<Props>(child) && child.props.activeView === activeView)
                {
                    return child;
                }

                return null;
            })}
        </>
    )
}

export default ViewControl