import axios from 'axios';
import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from '../ViewHeader';
import PlaceholderCircle32x32 from '../../assets/PlaceholderCircle32x32';

interface Client
{
    firstName: string;
    lastName: string;
}

interface PetResponse
{
    id: number;
    client: Client;
    name: string;
    species: string;
    breed: string;
    gender: string;
    birthDate: string;
    weight: number;
    adoptedDate: string;
    rating: number;
}

const Appointments: React.FC = (): JSX.Element =>
{
    const [appointments, setAppointments] = useState<PetResponse[]>([]);

    useEffect(() =>
    {
        axios.get<PetResponse[]>("http://localhost:5126/api/pet").then((res) =>
        {
            setAppointments(res.data);
        })
        .catch((e) => console.error("Error de consulta de api en appointments:", e));
    }, []);

    return (
        <>
            <ViewHeader label="Appointments" />
            <ul className="dark:text-white">
                {appointments.map((appointment) =>
                (
                    <li key={appointment.id}
                        className="flex m-2.5 border dark:border-black rounded dark:bg-[#202020] dark:active:[#101010]">

                        {/* Render appointment details */}
                        <div className="m-2">
                            <PlaceholderCircle32x32/>
                        </div>

                        <div className="flex flex-col text-[12px] justify-center ml-0.5">
                            <span><strong>{appointment.name}</strong></span>
                            
                            <span>{appointment.species}</span>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Appointments