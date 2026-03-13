import React, { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import type { GETAdmissionDTO } from '../../types/AdmissionTypes';
import axios from 'axios';
import ViewMessage from '../View/ViewMessage';
import ViewHeader from '../View/ViewHeader';
import AdmissionsSVG from '../../assets/AdmissionsSVG';
import Avatar from '../Avatar';

interface GetAllAdmissionsProps
{
    handleAdmissionClick: (id: string) => void;
}

const GetAllAdmissions: React.FC<GetAllAdmissionsProps> = ({ handleAdmissionClick }: GetAllAdmissionsProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleClick = (id: string): void =>
    {
        handleAdmissionClick(id);

        navigate("../detallepaciente");
    }

    const [admissions, setAdmissions] = useState<GETAdmissionDTO[]>([]);

    const [loading, setLoading] = useState<boolean>(false)

    const GETAdmissions = async (): Promise<void> =>
    {
        try
        {
            setLoading(true);

            const res = await axios.get<GETAdmissionDTO[]>(import.meta.env.VITE_API_URL + "/admission");

            setAdmissions(res.data);
        }
        catch(e)
        {
            console.error("Error de consulta de api en Admission:", e);
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        GETAdmissions();
    }, []);

    if (loading)
    {
        return(
            <>
                <ViewHeader
                    label='Pacientes'
                    icon={<AdmissionsSVG/>}
                    createNavigate='nuevopaciente'
                />

                <ViewMessage message='Cargando...'/>
            </>
        );
    }

    if (admissions.length === 0)
    {
        return(
            <>
                <ViewHeader
                    label='Pacientes'
                    icon={<AdmissionsSVG/>}
                    createNavigate='nuevopaciente'
                />

                <ViewMessage message='No hay altas para mostrar.'/>
            </>
        );
    }

    return (
        <>
            <ViewHeader
                label='Pacientes'
                icon={<AdmissionsSVG/>}
                createNavigate='nuevopaciente'
            />

            <div className='dark:text-white'>
                {admissions.map((admission) =>
                (
                    <div
                        key={admission.id}
                        className='flex items-center border-b border-[#DADCDB] dark:border-black dark:bg-[#202020] hover:dark:bg-[#303030] active:dark:bg-[#101010] p-3'
                        onClick={() => handleClick(admission.id)}
                    >
                        <Avatar guid={admission.pet.id} name={admission.pet.name}/>

                        <div className="flex flex-col text-[12px] justify-center ml-3">
                            <span className='font-bold'>{admission.pet.name}</span>

                            <span>{admission.admissionReason}</span>
                        </div>

                    </div>
                ))}
            </div>

        </>
    )
}

export default GetAllAdmissions