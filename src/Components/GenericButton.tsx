import React, { type JSX, type ReactNode } from 'react'

interface GenericButtonProps 
{
    color: "blue" | "green";
    icon: ReactNode;
    customClasses?: string;
    submitGenericButton?: () => void;
}

const GenericButton: React.FC<GenericButtonProps> = ({ color, icon, customClasses, submitGenericButton}: GenericButtonProps): JSX.Element =>
{
    const renderComponent = () =>
    {
        switch (color)
        {
            case "blue":
            return (
                <button
                    className={`h-8 w-8 flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 ${customClasses}`}
                    onClick={submitGenericButton}
                >
                    {icon}
                </button>
            )
            
            case "green":
            return (
                <button
                    className={`h-8 w-8 flex items-center justify-center rounded-md bg-green-400 hover:bg-green-500 active:bg-green-600 ${customClasses}`}
                    onClick={submitGenericButton}
                >
                    {icon}
                </button>
            )
        }
    }
    return (
        <>
            {renderComponent()}
        </>
    )
}

export default GenericButton