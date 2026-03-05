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
                    className={`h-8 w-8 text-white flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-[0_0px_12px_rgba(43,127,255,0.6)] hover:shadow-[0_0px_12px_rgba(21,93,252,0.6)] active:shadow-[0_0px_12px_rgba(20,71,230,0.6)] ${customClasses}`}
                    onClick={submitGenericButton}
                >
                    {icon}
                </button>
            )
            
            case "green":
            return (
                <button
                    className={`h-8 w-8 text-white flex items-center justify-center rounded-md bg-green-400 hover:bg-green-500 active:bg-green-600 shadow-[0_0px_12px_rgba(5,221,113,0.6)] hover:shadow-[0_0px_12px_rgba(0,200,80,0.6)] active:shadow-[0_0px_12px_rgba(0,166,62,0.6)] ${customClasses}`}
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