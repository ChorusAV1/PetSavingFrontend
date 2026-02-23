import React, { type JSX } from 'react'

interface GenericModalProps 
{
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({open, onClose, children}: GenericModalProps): JSX.Element =>
{
    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>

            {/* Modal */}
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`dark:bg-[#202020] rounded-xl shadow-[0_0px_24px_rgba(0,0,0,0.2)] dark:shadow-[0_0px_24px_rgba(255,255,255,0.2)] transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>

                {children}

            </div>
        </div>
    )
}

export default GenericModal