import React, { useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import ViewHeader from '../View/ViewHeader';
import Spacer from '../Spacer';
import type { POSTStatusDTO } from '../../types/StatusTypes';
import GenericContainer from '../Generic/GenericContainer';
import axios from 'axios';
import AdmissionsSVG from '../../assets/AdmissionsSVG';

interface PostStatusProps
{
    id: string;
}

const PostStatus: React.FC<PostStatusProps> = ({ id }: PostStatusProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = (): void =>
    {
        navigate("../detallepaciente")
    }

    const [formData, setFormData] = useState<POSTStatusDTO>
    ({
        admissionId: id,
        currentStatus: "",
        notes: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    {
        const { name, value } = e.target;
    
        setFormData((prev) => ({...prev, [name]: value }));
    }

    const handleSubmit = async () =>
    {
        try
        {
            const res = await axios.post(import.meta.env.VITE_API_URL + "/status", formData);

            console.log("Status created:", res.data);

            navigate("../detallepaciente");
        }
        catch (error)
        {
            console.error("Error creating status:", error);
        }
    };

    return (
        <>
            <ViewHeader
                label='Nuevo estado'
                icon={<AdmissionsSVG/>}
                onBackClick={handleBack}
                submitCreateButton={handleSubmit}
            />

            <Spacer/>

            <GenericContainer>

                <label className='mb-1'>Estado</label>

                <input
                    type='text'
                    name='currentStatus'
                    className='dark:bg-[#101010] p-2 rounded-md'
                    onChange={handleChange}
                    value={formData.currentStatus}
                />

            </GenericContainer>

            <Spacer/>

            <GenericContainer textSize={12}>

                <label className="font-light mb-1">Notas (descripción)</label>

                <textarea
                    className="dark:bg-[#101010] p-2 rounded-md"
                    name="notes"
                    onChange={handleChange}
                    value={formData.notes}
                />

            </GenericContainer>
        </>
    )
}

export default PostStatus