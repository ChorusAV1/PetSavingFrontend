import React, { useEffect, useState, type JSX } from 'react'
import PlaceholderCircle64x64 from '../../assets/PlaceholderCircle64x64';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ViewHeader from '../View/ViewHeader';
import ApptsSVG from '../../assets/ApptsSVG';
import GenericButton from '../Generic/GenericButton';
import AddImgSVG from '../../assets/AddImgSVG';
import type { UpdateClientDTO, GETClientRequestDTO } from '../../types/ClientTypes';

interface PatchClientProps
{
    id: string;
}

const PatchClient: React.FC<PatchClientProps> = ({id}: PatchClientProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../detallecliente")
    }

    const [formData, setFormData] = useState<UpdateClientDTO>({});
    const [originalData, setOriginalData] = useState<UpdateClientDTO>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target;
    
        setFormData((prev) => ({...prev, [name]: value, }));
    };

    const GETClient = async () =>
    {
        try
        {
            const res = await axios.get<GETClientRequestDTO>(import.meta.env.VITE_API_URL + `/client/${id}`);

            const mappedData: UpdateClientDTO =
            {
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                phoneNumber: res.data.phoneNumber,
                address: res.data.address,
                birthDate: res.data.birthDate,
                registrationDate: res.data.registrationDate,
                emergencyContactName: res.data.emergencyContactName,
                emergencyContactPhone: res.data.emergencyContactPhone
            }

            setFormData(mappedData);
            setOriginalData(mappedData);
        }
        catch (e)
        {
            console.error("Ocurrió un error al traer la información del cliente: ", e);
        }
    }

    useEffect(() =>
    {
        GETClient();
    }, []);

    const handleSubmit = async () =>
    {
        if (!originalData) return;

        /* eslint-disable @typescript-eslint/no-explicit-any */
        const patchData: any = {};

        Object.keys(formData).forEach((key) =>
        {
            const newValue = (formData as any)[key];
            const oldValue = (originalData as any)[key];

            if (newValue !== oldValue)
            {
                if ((key === "birthDate") && !newValue)
                {
                    return;
                }

                patchData[key] = newValue;
            }
        });

        console.log(patchData);

        try
        {
            const response = await axios.patch(import.meta.env.VITE_API_URL + `/client/${id}`, patchData);

            console.log("User edited:", response.data);

            navigate("../detallecliente");
        }
        catch (e)
        {
            console.error("Error updating user:", e);
        }
    };

    return (
        <>
            <ViewHeader
                label="Editar cliente"
                icon={<ApptsSVG/>}
                onBackClick={handleBack}
                submitCreateButton={handleSubmit}
            />

            <div className="flex flex-col justify-center dark:bg-[#202020] border border-[#DADCDB] dark:border-black m-2.5 p-2.5 dark:text-white text-[12px] rounded shadow dark:shadow-none">

                <div className="flex items-center mb-3 mt-0.5 ml-0.5">

                    <PlaceholderCircle64x64/>

                    <GenericButton
                        color="blue"
                        icon={<AddImgSVG/>}
                        customClasses="ml-6"
                    />
                    
                </div>

                
                    <div className="flex">
                        <div className="flex flex-col grow">
                            <label className="font-light mt-1.5 mb-1">Nombre/s</label>
                            <input name="firstName"
                                   value={formData.firstName}
                                   onChange={handleChange}
                                   className="dark:bg-[#101010] h-8 p-2 rounded-md"
                                   type='text'
                            />
                        </div>
                        <div className="w-2.5"/>
                        <div className="flex flex-col grow">
                            <label className="font-light mt-1.5 mb-1">Apellido/s</label>
                            <input name="lastName"
                                   value={formData.lastName}
                                   onChange={handleChange}
                                   className="dark:bg-[#101010] h-8 p-2 rounded-md"
                                   type='text'
                            />
                        </div>
                    </div>
                    
                    <div className="flex">
                        <div className="flex flex-col grow">
                            <label className="font-light mt-1.5 mb-1">Numero de telefono</label>
                            <input name="phoneNumber"
                                   value={formData.phoneNumber}
                                   onChange={handleChange}
                                   className="dark:bg-[#101010] h-8 p-2 rounded-md"
                                   type="tel"
                            />
                        </div>
                        <div className="w-2.5"/>
                        <div className="flex flex-col grow">
                            <label className="font-light mt-1.5 mb-1">Fecha de nacimiento</label>
                            <input name="birthDate"
                                   value={formData.birthDate}
                                   onChange={handleChange}
                                   className="dark:bg-[#101010] h-8 p-2 rounded-md"
                                   type="date"
                            />
                        </div>
                    </div>
                

                <div>
                    <div className="flex flex-col">
                        <label className="font-light mt-1.5 mb-1">Email</label>
                        <input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="dark:bg-[#101010] h-8 p-2 rounded-md"
                            type="email"
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-light mt-1.5 mb-1">Dirección</label>
                        <input 
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="dark:bg-[#101010] h-8 p-2 rounded-md"
                            type="text"
                        />
                    </div>
                </div>

            </div>

            <div className="flex flex-col dark:bg-[#202020] border border-[#DADCDB] dark:border-black mx-2.5 mb-2.5 p-2.5 dark:text-white text-[12px] rounded shadow dark:shadow-none">

                <label className="font-light mt-1.5 mb-1">Nombre de contacto de emergencia</label>
                <input
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    className="dark:bg-[#101010] h-8 p-2 rounded-md"
                />

                <label className="font-light mt-1.5 mb-1">Telefono de contacto de emergencia</label>
                <input
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    className="dark:bg-[#101010] h-8 p-2 rounded-md"
                />
            </div>
        </>
    )
}

export default PatchClient