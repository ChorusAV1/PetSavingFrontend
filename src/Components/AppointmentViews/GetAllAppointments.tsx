import React, { useEffect, useState } from 'react'
import ViewHeader from '../ViewHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { GETAppointmentRequestDTO } from '../../types/AppointmentTypes';
import PlaceholderCircle32x32 from '../../assets/PlaceholderCircle32x32';
import ApptsSVG from '../../assets/ApptsSVG';

interface GetAllAppointmentsProps 
{
    handleAppointmentClick: (id: string) => void;
}

const GetAllAppointments: React.FC<GetAllAppointmentsProps> = ({ handleAppointmentClick }: GetAllAppointmentsProps) =>
{
    const navigate = useNavigate();

    const handleClick = (id: string) =>
    {
        handleAppointmentClick(id)

        navigate("../detallemascota")
    }

    const [appointments, setAppointments] = useState<GETAppointmentRequestDTO[]>([]);

    const [loading, setLoading] = useState(false);

    const GETAppointments = async () =>
    {
        try
        {
            setLoading(true);

            const res = await axios.get<GETAppointmentRequestDTO[]>("http://localhost:5126/api/appointmet");
            
            setAppointments(res.data);
        }
        catch(e)
        {
            console.error("Error de consulta de api en Pet:", e)
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        GETAppointments();   
    }, []);

    if (loading)
    {
        return (
            <>
                <ViewHeader
                    label="Consultas"
                    icon={<ApptsSVG/>}
                    createNavigate="nuevaconsulta"
                />

                <p className="dark:text-[#505050] mt-5 text-center">Cargando...</p>
            </>
        );
    }

    return (
        <>
            <ViewHeader
                label="Consultas"
                icon={<ApptsSVG/>}
                createNavigate="nuevaconsulta"
            />

            <div className="dark:text-white">
                {appointments.map((appointment) =>
                (
                    <div
                        key={appointment.id}
                        className="flex items-center m-2.5 border dark:border-black rounded dark:bg-[#202020] hover:dark:bg-[#303030] active:dark:bg-[#101010]"
                        onClick={() => handleClick(appointment.id)}
                    >

                        <div className="m-2">
                            <PlaceholderCircle32x32/>
                        </div>

                        <div className="flex flex-col text-[12px] justify-center ml-0.5">
                            <span><strong>{appointment.pet.name}</strong></span>
                            
                            <span>{appointment.client.firstName}</span>
                        </div>

                        <div className="grow"/>

                        <span className="text-[12px] mr-4"><strong>{appointment.appointmentDate}</strong></span>

                    </div>
                ))}
            </div>
        </>
    )
}

export default GetAllAppointments