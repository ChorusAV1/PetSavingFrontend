import React, { useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import PlaceholderCircle64x64 from '../../assets/PlaceholderCircle64x64';
import axios from 'axios';
import ViewHeader from '../ViewHeader';
import ApptsSVG from '../../assets/ApptsSVG';
import AddImgSVG from '../../assets/AddImgSVG';
import GenericButton from '../GenericButton';

interface CreateUserRequest
{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    birthDate: string; // ISO string
    emergencyContactName: string;
    emergencyContactPhone: string;
}

const NuevoCliente: React.FC = (): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../lista")
    }

    const [formData, setFormData] = useState<CreateUserRequest>(
    {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        birthDate: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target;

        setFormData((prev) => ({...prev, [name]: value, }));
    };

    const handleSubmit = async () =>
    {
        try
        {
            const payload: CreateUserRequest =
            {
                ...formData,
                birthDate: new Date(formData.birthDate).toISOString(),
            };
    
            const response = await axios.post("http://localhost:5126/api/client", payload);

            console.log("User created:", response.data);

            navigate("../lista");
        }
        catch (error)
        {
            console.error("Error creating user:", error);
        }
    };

    return (
        <>
            <ViewHeader
                label="Nuevo cliente"
                icon={<ApptsSVG/>}
                onBackClick={handleBack}
                submitCreateButton={handleSubmit}
            />

            <div className="bg-black h-px"/>

            <div className="flex flex-col justify-center dark:bg-[#202020] border dark:border-black m-2.5 p-2.5 dark:text-white text-[12px] rounded">

                <div className="flex items-center mb-3 mt-0.5 ml-0.5">
                    <PlaceholderCircle64x64/>
                    <GenericButton
                        color="blue"
                        icon={<AddImgSVG/>}
                        customClasses="ml-5"/>
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

            <div className="flex flex-col dark:bg-[#202020] border dark:border-black mx-2.5 mb-2.5 p-2.5 dark:text-white text-[12px] rounded">

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

export default NuevoCliente