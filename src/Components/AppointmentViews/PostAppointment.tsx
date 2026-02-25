import React, { useState, type JSX } from 'react'
import ViewHeader from '../ViewHeader'
import { useNavigate } from 'react-router-dom'
import GenericContainer from '../GenericContainer';
import GenericButton from '../GenericButton';
import GenericModal from '../GenericModal';
import ApptsSVG from '../../assets/ApptsSVG';
import SearchSVG from '../../assets/SearchSVG';
import type { POSTAppointmentRequestDTO } from '../../types/AppointmentTypes';
import axios from 'axios';
import type { GETClientRequestDTO } from '../../types/ClientTypes';
import type { GETPetRequestDTO } from '../../types/PetTypes';
import SearchClientModal from '../Modals/SearchClientModal';
import SearchPetModal from '../Modals/SearchPetModal';

interface CreateAppointmentForm
{
    clientName: string;
    petName: string;
    diagnosis: string;
    treatment: string;
    notes: string;
    followUpDate: string;
}

interface POSTJustInTimeClient
{
    firstName: string;
}

interface POSTJustInTimePet
{
    clientId: string;
    name: string;
}

// TODO: Clean try catch hell
const PostAppointment: React.FC = (): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../list")
    }

    const [payloadData, setPayloadData] = useState<POSTAppointmentRequestDTO>(
    {
        petId: "",
        clientId: "",
        vetId: "33232e81-bc9c-4302-908e-d59f303fbf2c", // TODO: IMPLEMENTAR AUTENTICACIÓN URGENTE
        diagnosis: "",
        treatment: "",
        notes: "",
        followUpDate: "",
    });

    const [formData, setFormData] = useState<CreateAppointmentForm>(
    {
        clientName: "",
        petName: "",
        diagnosis: "",
        treatment: "",
        notes: "",
        followUpDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    {
        const { name, value } = e.target;
    
        setFormData((prev) => ({...prev, [name]: value, }));
    };

    const handleSubmit = async () =>
    {
        try
        {
            let newClientId = payloadData.clientId

            if (payloadData.clientId == "")
            {
                try
                {
                    const clientPayload: POSTJustInTimeClient =
                    {
                        firstName: formData.clientName
                    }

                    const clientResponse = await axios.post<GETClientRequestDTO>("http://localhost:5126/api/client", clientPayload);

                    newClientId = clientResponse.data.id;
                }
                catch (e)
                {
                    console.log("Error while creating a just in time client.", e)
                }
            }

            let newPetId = payloadData.petId;

            if (payloadData.petId == "")
            {
                try
                {
                    const petPayload: POSTJustInTimePet =
                    {
                        clientId: newClientId,
                        name: formData.petName
                    }
            
                    const petResponse = await axios.post<GETPetRequestDTO>("http://localhost:5126/api/pet", petPayload);

                    newPetId = petResponse.data.id;
                }
                catch (e)
                {
                    console.error("Error while creating a just in time pet.", e)
                }
            }

            const postPayloadData: POSTAppointmentRequestDTO =
            {
                ...payloadData,
                clientId: newClientId,
                petId: newPetId,
                diagnosis: formData.diagnosis,
                treatment: formData.treatment,
                notes: formData.notes,
                followUpDate: formData.followUpDate
            };
    
            const response = await axios.post("http://localhost:5126/api/appointment", postPayloadData);

            console.log("Pet created:", response.data);

            navigate("../list");
        }
        catch (error)
        {
            console.error("Error creating user:", error);
        }

    }

    const clientModalSubmit = (fullName: string, id: string): void =>
    {
        setFormData((prev) => ({ ...prev, clientName: fullName }));

        setPayloadData((prev) => ({ ...prev, clientId: id }));
    }

    const petModalSubmit = (name: string, id: string): void =>
    {
        setFormData((prev) => ({ ...prev, petName: name }));

        setPayloadData((prev) => ({ ...prev, petId: id }));
    }

    {/* GenericModal isOpen*/}
    const [openClientModal, setOpenClientModal] = useState<boolean>(false);
    const [openPetModal, setOpenPetModal] = useState<boolean>(false);

    return (
        <>
            <ViewHeader
                icon={<ApptsSVG/>}
                label="Consultas"
                onBackClick={handleBack}
                submitCreateButton={handleSubmit}
            />

            <div className="h-2.5"/>

            <GenericContainer textSize={16}>

                <div className="flex items-center">

                    <label className="ml-2">Cliente</label>

                    <div className="grow"/>

                    <input
                        className="dark:bg-[#101010] h-8 p-2 rounded-md w-50"
                        name="clientName"
                        type="text"
                        onChange={handleChange}
                        value={formData.clientName}
                    />

                    <GenericButton
                        color="blue"
                        icon={<SearchSVG/>}
                        customClasses="ml-2.5"
                        submitGenericButton={() => setOpenClientModal(true)}
                    />

                </div>

                <div className="h-2.5"/>

                <div className="flex items-center">

                    <label className="ml-2">Mascota</label>

                    <div className="grow"/>

                    <input
                        className="dark:bg-[#101010] h-8 p-2 rounded-md w-50"
                        name="petName"
                        type="text"
                        onChange={handleChange}
                        value={formData.petName}
                    />

                    <GenericButton
                        color="blue"
                        icon={<SearchSVG/>}
                        customClasses="ml-2.5"
                        submitGenericButton={() => setOpenPetModal(true)}
                    />

                </div>

            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <label className="font-light mb-1">Diagnostico / Sintomas</label>

                <textarea
                    className="dark:bg-[#101010] p-2 rounded-md"
                    name="diagnosis"
                    onChange={handleChange}
                    value={formData.diagnosis}
                />

            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <label className="font-light mb-1">Tratamiento</label>

                <textarea
                    className="dark:bg-[#101010] p-2 rounded-md"
                    name="treatment"
                    onChange={handleChange}
                    value={formData.treatment}
                />

            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <label className="font-light mb-1">Notas adicionales</label>

                <textarea
                    className="dark:bg-[#101010] p-2 rounded-md"
                    name="notes"
                    onChange={handleChange}
                    value={formData.notes}
                />

            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={16}>

                <div className="flex items-center justify-between">

                    <label>Fecha de seguimiento</label>

                    <input name="followUpDate"
                        className="dark:bg-[#101010] h-8 p-2 rounded-md"
                        type="date"
                        onChange={handleChange}
                        value={formData.followUpDate}
                    />

                </div>
                
            </GenericContainer>

            <GenericModal open={openClientModal} onClose={() => setOpenClientModal(false)}>

                <SearchClientModal onClose={() => setOpenClientModal(false)} selectClient={(fullName, id) => clientModalSubmit(fullName, id)}/>
                    
            </GenericModal>

            <GenericModal open={openPetModal} onClose={() => setOpenPetModal(false)}>

                <SearchPetModal onClose={() => setOpenPetModal(false)} selectPet={(name, id) => petModalSubmit(name, id)}/>

            </GenericModal>
            
        </>
    )
}

export default PostAppointment