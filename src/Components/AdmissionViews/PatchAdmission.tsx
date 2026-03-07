import React, { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import type { CreateAdmissionForm, GETAdmissionDTO, GetOneAdmissionDTO, PATCHAdmissionDTO } from '../../types/AdmissionTypes';
import axios from 'axios';
import ViewHeader from '../View/ViewHeader';
import Placeholder20x20 from '../../assets/Placeholder20x20';
import Spacer from '../Spacer';
import GenericContainer from '../Generic/GenericContainer';
import GenericButton from '../Generic/GenericButton';
import SearchSVG from '../../assets/SearchSVG';
import GenericModal from '../Generic/GenericModal';
import SearchPetModal from '../Modals/SearchPetModal';

interface PatchAdmissionProps
{
    id: string;
}

const PatchAdmission: React.FC<PatchAdmissionProps> = ({ id }: PatchAdmissionProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = (): void =>
    {
        navigate("../detalleingreso");
    }

    const [loading, setLoading] = useState<boolean>(false)

    const [formData, setFormData] = useState<CreateAdmissionForm>
    ({
        petName: "",
        admissionReason: "",
        dischargeDate: "",
        cageNumber: 0,
    });

    const [statefulPetId, setStatefulPetId] = useState<string>("");

    const [payloadData, setPayloadData] = useState<PATCHAdmissionDTO>
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
            const postPayloadData: PATCHAdmissionDTO =
            {
                ...payloadData,
                petId: statefulPetId,
                admissionReason: formData.admissionReason,
                dischargeDate: new Date(formData.dischargeDate).toISOString(),
                cageNumber: formData.cageNumber,
            };

            console.log(postPayloadData);

            const res = await axios.patch<GETAdmissionDTO>(import.meta.env.VITE_API_URL + `/admission/${id}`, postPayloadData);

            console.log("Ingreso editado:", res.data);

            navigate("../list");
        }
        catch(e)
        {
            console.error("Error al editar el ingreso:", e);
        }
    }

    const GETAdmission = async (): Promise<void> =>
    {
        try
        {
            setLoading(true);

            const admissionResponse = await axios.get<GetOneAdmissionDTO>(import.meta.env.VITE_API_URL + `/admission/${id}`);

            const mappedData: CreateAdmissionForm =
            {
                petName: admissionResponse.data.pet.name,
                admissionReason: admissionResponse.data.admissionReason,
                dischargeDate: admissionResponse.data.dischargeDate.substring(0, 10),
                cageNumber: admissionResponse.data.cageNumber
            }
            
            setFormData(mappedData);
            setStatefulPetId(admissionResponse.data.pet.id);
        }
        catch(e)
        {
            console.error("Ocurrióun error al cargar la información del ingreso: ", e);
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        GETAdmission();
    }, [])

    const [openPetModal, setOpenPetModal] = useState<boolean>(false);
    const petModalSubmit = (name: string, id: string): void =>
    {
        setFormData((prev) => ({ ...prev, petName: name }));

        setPayloadData((prev) => ({ ...prev, petId: id }));

        setStatefulPetId(id);
    }

    if (loading)
    {
        return (
            <>
                <ViewHeader
                    icon={<Placeholder20x20/>}
                    label='Editar ingreso'
                    onBackClick={handleBack}
                    submitCreateButton={handleSubmit}
                />

                <Spacer/>
            </>
        )
    }

    return (
        <>
            <ViewHeader
                icon={<Placeholder20x20/>}
                label='Editar ingreso'
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
                        disabled
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

export default PatchAdmission