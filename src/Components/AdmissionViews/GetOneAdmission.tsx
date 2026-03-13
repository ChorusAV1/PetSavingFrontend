import React, { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import type { GetOneAdmissionDTO } from '../../types/AdmissionTypes';
import axios from 'axios';
import ViewHeader from '../View/ViewHeader';
import ViewMessage from '../View/ViewMessage';
import Spacer from '../Spacer';
import GenericContainer from '../Generic/GenericContainer';
import AdmissionsSVG from '../../assets/AdmissionsSVG';
import GenericModal from '../Generic/GenericModal';
import DeleteModal from '../Modals/DeleteModal';
import Avatar from '../Avatar';

interface GetOneAdmissionProps
{
    id: string;
}

interface PostDischarge
{
    discharged: boolean;
}

const GetOneAdmission: React.FC<GetOneAdmissionProps> = ({ id }: GetOneAdmissionProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = (): void =>
    {
        navigate("../list");
    }

    const handleNewStatus = (): void =>
    {
        navigate("../nuevoestado");
    }

    const handleEdit = (): void =>
    {
        navigate("../editarpaciente");
    }

    const handleDischarge = async (): Promise<void> =>
    {
        try
        {
            setLoading(true);

            const postPayloadData: PostDischarge =
            {
                discharged: true
            };

            console.log(postPayloadData);

            const res = await axios.patch<GetOneAdmissionDTO>(import.meta.env.VITE_API_URL + `/admission/${id}`, postPayloadData);

            setAdmission(res.data);
        }
        catch(e)
        {
            console.error("Error de consulta de api en GETAdmission:", e);
        }
        finally
        {
            setLoading(false);
        }
    }

    const handleDelete = (): void =>
    {
        try
        {
            axios.delete(`http://localhost:5126/api/admission/${id}`);

            handleBack();
        }
        catch (e)
        {
            console.error("Ocurrió un error al tratar de borrar el producto: ", e)
        }
    }

    const [loading, setLoading] = useState(false);

    const [admission, setAdmission] = useState<GetOneAdmissionDTO>
    ({
        id: "",
        pet:
        {
            id: "",
            name: "",
            species: "", 
        },
        vet:
        {
            id: "",
            userName: "",
            specialization: "",
        },
        admissionDate: "",
        dischargeDate: "",
        admissionReason: "",
        cageNumber: 0,
        discharged: false,
        statuses: [],
    })

    const GETAdmission = async (): Promise<void> =>
    {
        try
        {
            setLoading(true);

            const res = await axios.get<GetOneAdmissionDTO>(import.meta.env.VITE_API_URL + `/admission/${id}`);

            setAdmission(res.data);
        }
        catch(e)
        {
            console.error("Error de consulta de api en GETAdmission:", e);
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        GETAdmission();
    }, []);

    const [open, setOpen] = useState<boolean>(false);

    if (loading)
    {
        return(
            <>
                <ViewHeader
                    label='Paciente'
                    icon={<AdmissionsSVG/>}
                    onBackClick={handleBack}
                    onEditClick={handleEdit}
                    onAddStatusClick={handleNewStatus}
                    onDischargeClick={handleDischarge}
                    onDeleteClick={() => setOpen(true)}
                />

                <ViewMessage message='Cargando...'/>
            </>
        );
    }

    return (
        <>
            <ViewHeader
                label='Paciente'
                icon={<AdmissionsSVG/>}
                onBackClick={handleBack}
                onEditClick={handleEdit}
                onAddStatusClick={handleNewStatus}
                onDischargeClick={handleDischarge}
                onDeleteClick={() => setOpen(true)}
            />

            <Spacer/>

            <GenericContainer>

                <div className="flex items-center">

                    <Avatar guid={admission.pet.id} name={admission.pet.name} size={64}/>

                    <div className="flex flex-col m-2.5 text-[16px]">
                        <span><strong>{admission.pet.name}</strong></span>
                        <span>{admission.pet.species}</span>
                    </div>

                </div>

                <div className="text-[14px] space-y-3.5 mt-2">
                    <div className="flex">
                        <label className="mr-2">Fecha de Paciente:</label>
                        <span>{admission.admissionDate.substring(0, 10)}</span>
                    </div>
                    <div className="flex">
                        <label className="mr-2">Razón de Paciente:</label>
                        <span>{admission.admissionReason}</span>
                    </div>
                    <div className="flex">
                        <label className="mr-2">Jaula:</label>
                        <span>{admission.cageNumber}</span>
                    </div>
                    <div className='flex'>
                        <label className='mr-2'>
                            {admission.discharged === false ?
                                (
                                    <span className='text-amber-400 font-bold'>Actualemte alojado</span>
                                )
                                :
                                (
                                    <span className='text-green-600 font-bold'>Dado de alta</span>
                                )
                            }
                        </label>
                    </div>
                </div>

            </GenericContainer>

            <Spacer/>

            <GenericContainer>

                <div>
                    <label>Fecha de alta: </label>
                    <span>{admission.dischargeDate.substring(0, 10)}</span>
                </div>

            </GenericContainer>

            <h3 className="dark:text-white font-light text-center text-[12px] mt-2.5">Historial de estado</h3>

            <div className="dark:text-white">
                {admission.statuses.length === 0 ?
                    (
                        <ViewMessage message='Sin estados registrados'/>
                    )
                    :
                    (
                        admission.statuses.map((status) =>
                        (
                            <div
                                key={status.id}
                                className="flex items-center m-2.5 p-2 border-[#DADCDB] shadow dark:shadow-none border dark:border-black rounded dark:bg-[#202020]"
                            >
                                <div className="flex flex-col text-[12px] justify-center ml-0.5">
                                    <span><strong>{status.currentStatus}</strong></span>
                            
                                    <span>{status.notes}</span>
                                </div>

                                <div className="grow"/>

                                <span className="text-[12px] mr-0.5"><strong>{admission.admissionDate.substring(0, 10)}</strong></span>

                            </div>
                        ))
                    )
                }
            </div>

            <GenericModal open={open} onClose={() => setOpen(false)}>

                <DeleteModal message="Estás seguro de que deseas eliminar este paciente? Esto borrará todos sus estados y su numero de seguimiento por lo que se recomienda dar de alta." onClickDelete={handleDelete} onClickClose={() => setOpen(false)}/>

            </GenericModal>
        </>
    )
}

export default GetOneAdmission