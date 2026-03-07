import React, { useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CreateAdmissionForm, GETAdmissionDTO, POSTAdmissionDTO } from '../../types/AdmissionTypes';
import axios from 'axios';
import ViewHeader from '../View/ViewHeader';
import Placeholder20x20 from '../../assets/Placeholder20x20';
import Spacer from '../Spacer';
import GenericContainer from '../Generic/GenericContainer';
import GenericButton from '../Generic/GenericButton';
import SearchSVG from '../../assets/SearchSVG';
import type { GETPetRequestDTO, POSTJustInTimePet } from '../../types/PetTypes';
import GenericModal from '../Generic/GenericModal';
import SearchPetModal from '../Modals/SearchPetModal';

const PostAdmission: React.FC = (): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = (): void =>
    {
        navigate("../list");
    }

    const [formData, setFormData] = useState<CreateAdmissionForm>
    ({
        petName: "",
        admissionReason: "",
        dischargeDate: "",
        cageNumber: 0,
    });

    const [payloadData, setPayloadData] = useState<POSTAdmissionDTO>
    ({
        petId: "",
        vetId: localStorage.getItem("vetId"),
        admissionReason: "",
        dischargeDate: "",
        cageNumber: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target;

        setFormData((prev) => ({...prev, [name]: value }));
    }

    const handleSubmit = async (): Promise<void> =>
    {
        try
        {
            let newPetId = payloadData.petId

            if (payloadData.petId == "")
            {
                const petPayload: POSTJustInTimePet = 
                {
                    clientId: "00000000-0000-0000-0000-000000000002",
                    name: formData.petName
                }

                const petResponse = await axios.post<GETPetRequestDTO>(import.meta.env.VITE_API_URL + "/pet", petPayload);

                newPetId = petResponse.data.id;
            }

            const postPayloadData: POSTAdmissionDTO =
            {
                ...payloadData,
                petId: newPetId,
                admissionReason: formData.admissionReason,
                dischargeDate: new Date(formData.dischargeDate).toISOString(),
                cageNumber: formData.cageNumber,
            };

            console.log(postPayloadData);

            const res = await axios.post<GETAdmissionDTO>(import.meta.env.VITE_API_URL + "/admission", postPayloadData);

            console.log("Ingreso creado:", res.data);

            navigate("../list");
        }
        catch(e)
        {
            console.error("Error al crear el ingreso:", e);
        }
    }

    const [openPetModal, setOpenPetModal] = useState<boolean>(false);
    const petModalSubmit = (name: string, id: string): void =>
    {
        setFormData((prev) => ({ ...prev, petName: name }));

        setPayloadData((prev) => ({ ...prev, petId: id }));
    }

    return (
        <>
            <ViewHeader
                icon={<Placeholder20x20/>}
                label='Nuevo ingreso'
                onBackClick={handleBack}
                submitCreateButton={handleSubmit}
            />

            <Spacer/>

            <GenericContainer>

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

            <Spacer/>

            <GenericContainer>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Razón de ingreso</label>
                    <input
                        type="text"
                        name="admissionReason"
                        value={formData.admissionReason}
                        onChange={handleChange}
                        className="dark:bg-[#101010] h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Fecha de alta</label>
                    <input
                        type="date"
                        name="dischargeDate"
                        value={formData.dischargeDate}
                        onChange={handleChange}
                        className="dark:bg-[#101010] h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Numero de jaula</label>
                    <input 
                        type="number"
                        min="0"
                        max="10000"
                        name="cageNumber"
                        value={formData.cageNumber}
                        onChange={handleChange}
                        className="dark:bg-[#101010] h-8 p-2 rounded-md"
                    />
                </div>
                
            </GenericContainer>

            <GenericModal open={openPetModal} onClose={() => setOpenPetModal(false)}>

                <SearchPetModal onClose={() => setOpenPetModal(false)} selectPet={(name, id) => petModalSubmit(name, id)}/>

            </GenericModal>
        </>
    )
}

export default PostAdmission