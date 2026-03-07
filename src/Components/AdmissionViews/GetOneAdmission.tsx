import React, { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import type { GetOneAdmissionDTO } from '../../types/AdmissionTypes';
import axios from 'axios';
import ViewHeader from '../View/ViewHeader';
import Placeholder20x20 from '../../assets/Placeholder20x20';
import ViewMessage from '../View/ViewMessage';
import Spacer from '../Spacer';
import GenericContainer from '../Generic/GenericContainer';
import PlaceholderCircle64x64 from '../../assets/PlaceholderCircle64x64';

interface GetOneAdmissionProps
{
    id: string;
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
        navigate("../editaringreso");
    }

    const handleDischarge = (): void =>
    {
        console.log("Discharge is being clicked!!");
    }

    const handleDelete = (): void =>
    {
        console.log("Delete is being clicked!!!");
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

    // const [open, setOpen] = useState<boolean>(false);

    if (loading)
    {
        return(
            <>
                <ViewHeader
                    label='Ingreso'
                    icon={<Placeholder20x20/>}
                    onBackClick={handleBack}
                    onEditClick={handleEdit}
                    onAddStatusClick={handleNewStatus}
                    onDischargeClick={handleDischarge}
                    onDeleteClick={handleDelete}
                />

                <ViewMessage message='Cargando...'/>
            </>
        );
    }

    return (
        <>
            <ViewHeader
                label='Ingreso'
                icon={<Placeholder20x20/>}
                onBackClick={handleBack}
                onEditClick={handleEdit}
                onAddStatusClick={handleNewStatus}
                onDischargeClick={handleDischarge}
                onDeleteClick={handleDelete}
            />

            <Spacer/>

            <GenericContainer>

                <div className="flex items-center">

                    <PlaceholderCircle64x64/>

                    <div className="flex flex-col m-2.5 text-[16px]">
                        <span><strong>{admission.pet.name}</strong></span>
                        <span>{admission.pet.species}</span>
                    </div>

                </div>

                <div className="text-[14px] space-y-3.5 mt-2">
                    <div className="flex">
                        <label className="mr-2">Fecha de ingreso:</label>
                        <span>{admission.admissionDate.substring(0, 10)}</span>
                    </div>
                    <div className="flex">
                        <label className="mr-2">Razón de ingreso:</label>
                        <span>{admission.admissionReason}</span>
                    </div>
                    <div className="flex">
                        <label className="mr-2">Jaula:</label>
                        <span>{admission.cageNumber}</span>
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
                                className="flex items-center m-2.5 p-2 border dark:border-black rounded dark:bg-[#202020] hover:dark:bg-[#303030] active:dark:bg-[#101010]"
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
        </>
    )
}

export default GetOneAdmission