import React, { type JSX, type ReactNode, } from 'react'
import Placeholder20x20 from '../assets/Placeholder20x20';
import { useNavigate } from 'react-router-dom';
import GenericButton from './GenericButton';
import DeleteSVG from '../assets/DeleteSVG';
import EditSVG from '../assets/EditSVG';
import SaveSVG from '../assets/SaveSVG';
import AddSVG from '../assets/AddSVG';

interface ViewHeaderProps 
{
    label: string;
    icon: ReactNode;
    createNavigate?: string;
    onBackClick?: () => void;
    onSortClick?: () => void;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
    submitCreateButton?: () => void;
}

const ViewHeader: React.FC<ViewHeaderProps> = ({ label, icon, createNavigate, onSortClick, onEditClick, onBackClick, onDeleteClick, submitCreateButton }: ViewHeaderProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleNuevo = () =>
    {
        navigate("../" + createNavigate)
    }
    
    return (
    <>
        <header className="flex items-center h-15
                           dark:bg-[#202020] dark:text-white">

            {onBackClick && (
                <button className="pl-3.5" onClick={onBackClick}>
                    <Placeholder20x20/>
                </button>
            )}

            <div className="m-3.5 h-8 w-8 flex items-center justify-center rounded-md bg-[#AFAFAF]">
               {icon}
            </div>

            <span className="text-[12px] select-none"><strong>{label}</strong></span>

            <div className="grow"/>
            
            {onSortClick && (
                <button className="flex flex-col items-center p-0.75 mx-1.25 rounded-sm select-none
                                dark:hover:bg-[#303030] dark:active:bg-[#101010]">

                <div className="m-1.25">
                   <Placeholder20x20/>
                </div>

                <span className="text-[10px]">Ordenar</span>

                </button>
            )}

            {createNavigate && (
                <button className="flex flex-col items-center p-0.75 mx-1.25 rounded-sm select-none
                                dark:hover:bg-[#303030] dark:active:bg-[#101010]"
                    onClick={handleNuevo}>

                <div className="m-1.25">
                   <AddSVG/>
                </div>

                <span className="text-[10px]">Nuevo</span>

                </button>
            )}

            {onEditClick && (
                <button className="flex flex-col items-center p-0.75 mx-1.25 rounded-sm select-none
                                dark:hover:bg-[#303030] dark:active:bg-[#101010]"
                        onClick={() => onEditClick()}>

                    <div className="m-1.25">
                        <EditSVG/>
                    </div>

                    <span className="text-[10px]">Editar</span>

                </button>
            )}

            {onDeleteClick && (
                <button className="flex flex-col items-center p-0.75 mx-1.25 rounded-sm select-none
                                dark:hover:bg-[#303030] dark:active:bg-[#101010]"
                        onClick={() => onDeleteClick()}>

                    <div className="m-1.25">
                        <DeleteSVG/>
                    </div>

                    <span className="text-[10px]">Eliminar</span>

                </button>
            )}

            {submitCreateButton && (
                <GenericButton
                    color="green"
                    icon={<SaveSVG/>}
                    submitGenericButton={submitCreateButton}
                    customClasses="m-3.5"
                />
            )}

        </header>

        <div className="bg-black h-px"/>
    </>
  )
}

export default ViewHeader