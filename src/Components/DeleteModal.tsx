import React, { type JSX } from 'react'

interface DeleteModalProps
{
    message: string;
    onClickDelete: () => void;
    onClickClose: (p: boolean) => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ message, onClickDelete, onClickClose }: DeleteModalProps): JSX.Element =>
{
    return (
        <div className="flex flex-col items-center justify-center p-4 w-60">

            <div className="text-center">

                <h3 className="text-lg text-gray-800 dark:text-white"><strong>Eliminar</strong></h3>

                <p className="text-sm text-gray-500 dark:text-white m-2">
                    {message}
                </p>

            </div>

            <div className="flex gap-4">

                <button
                    className="bg-red-500 hover:bg-red-600 active:bg-red-700 transition duration-100 p-2 rounded-lg shadow-[0_0px_12px_rgba(251,44,54,0.9)] hover:shadow-[0_0px_12px_rgba(231,0,1,0.9)] active:shadow-[0_0px_12px_rgba(193,0,7,0.9)] text-white"
                    onClick={onClickDelete}>
                    Eliminar
                </button>

                <button
                    className="dark:bg-[#303030] dark:hover:bg-[#2B2B2B] dark:active:bg-[#181818] p-2 rounded-lg text-white"
                    onClick={() => onClickClose(false)}>
                    Cancelar
                </button>

            </div>

        </div>
    )
}

export default DeleteModal