import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from '../ViewHeader';
import { useNavigate } from 'react-router-dom';
import ApptsSVG from '../../assets/ApptsSVG';
import type { GETAppointmentRequestDTO } from '../../types/AppointmentTypes';
import axios from 'axios';
import GenericContainer from '../GenericContainer';
import GenericModal from '../GenericModal';
import DeleteModal from '../Modals/DeleteModal';

interface GetOneAppointmentProps
{
    id: string;
}

const GetOneAppointment: React.FC<GetOneAppointmentProps> = ({ id }: GetOneAppointmentProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../list")
    }

    const handleDelete = () =>
    {
        try
        {
            axios.delete(`http://localhost:5126/api/appointment/${id}`);

            handleBack();
        }
        catch (e)
        {
            console.error("Ocurrió un error al tratar de borrar la consulta: ", e)
        }
    }

    const [appointment, setAppointment] = useState<GETAppointmentRequestDTO>(
    {
        id: "",
        pet: {
            name: "",
            species: "",
        },
        client: {
            firstName: "",
            lastName: "",
        },
        vet: {
            userName: "",
            specialization: "",
        },
        appointmentDate: "",
        diagnosis: "",
        treatment: "",
        notes: "",
        followUpDate: "",
    });

    const GETAppointment = async (): Promise<void> =>
    {
        try
        {
            const res = await axios.get<GETAppointmentRequestDTO>(`http://localhost:5126/api/appointment/${id}`);

            setAppointment(res.data);
        }
        catch(e)
        {
            console.error("Error de consulta de api en GETAppointment:", e);
        }
    }

    useEffect(() =>
    {
        GETAppointment();
    }, []);

    // Modal
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <ViewHeader
                onBackClick={handleBack}
                label=""
                icon={<ApptsSVG/>}
                onDeleteClick={() => setOpen(true)}
            />

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <label className="font-light">Dueño:</label>
                <span className="mb-2">{appointment.client.firstName + " " + appointment.client.lastName}</span>

                <label className="font-light">Atendido por:</label>
                <span>{appointment.vet.specialization}</span>

            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <label className="font-light">Diagnostico / Sintomas</label>
                <p>{appointment.diagnosis}</p>

            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <label className="font-light">Tratamiento</label>
                <p>{appointment.treatment}</p>

            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <label className="font-light">Notas adicionales</label>
                <p>{appointment.notes}</p>

            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <span className="text-center"><strong>Fecha de seguimiento: {appointment.followUpDate}</strong></span>

            </GenericContainer>

            <GenericModal open={open} onClose={() => setOpen(false)}>

                <DeleteModal message="Estás seguro de que deseas eliminar esta consulta?" onClickDelete={handleDelete} onClickClose={() => setOpen(false)}/>

            </GenericModal>
        </>
    )
}

export default GetOneAppointment