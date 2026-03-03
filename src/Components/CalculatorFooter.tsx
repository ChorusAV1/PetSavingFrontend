import React, { type JSX } from 'react'

interface CalculatorFooterProps
{
    onReset: () => void;
    onSubmit: () => void;
}

const CalculatorFooter: React.FC<CalculatorFooterProps> = ({ onReset, onSubmit }: CalculatorFooterProps): JSX.Element =>
{
    return (
        <section className="flex items-center justify-around bg-[#202020] h-18 border-t sticky bottom-0">

            <button
                className="dark:bg-[#3B3B3B] dark:hover:bg-[#303030] dark:active:bg-[#404040] text-[24px] text-white w-18.75 h-12.5 rounded-lg"
                onClick={onReset}
            >
                C
            </button>

            <button
                className="bg-[#339FFF] hover:bg-blue-500 active:bg-blue-400 text-[32px] text-white w-18.75 h-12.5 rounded-lg"
                onClick={onSubmit}
            >
                =
            </button>

        </section>
    )
}

export default CalculatorFooter