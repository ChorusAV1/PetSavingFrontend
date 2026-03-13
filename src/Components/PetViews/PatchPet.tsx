import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from '../View/ViewHeader';
import { useNavigate } from 'react-router-dom';
import GenericContainer from '../Generic/GenericContainer';
import type { GETPetRequestDTO, UpdatePetDTO } from '../../types/PetTypes';
import GenericModal from '../Generic/GenericModal';
import SearchClientModal from '../Modals/SearchClientModal';
import axios from 'axios';
import GenericButton from '../Generic/GenericButton';
import ApptsSVG from '../../assets/ApptsSVG';
import SearchSVG from '../../assets/SearchSVG';
import placeholderImg from "../../assets/AddImg.png";

interface PatchPetProps
{
    id: string;
}

const PatchPet: React.FC<PatchPetProps> = ({ id }: PatchPetProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../detallemascota")
    }

    {/*Image handling*/}
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [open, setOpen] = useState<boolean>(false);

    const [formData, setFormData] = useState<UpdatePetDTO>({});
    const [originalData, setOriginalData] = useState<UpdatePetDTO>({});

    const [ownerName, setOwnerName] = useState<string>("Sin cliente");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    {
        const { name, value } = e.target;
    
        setFormData((prev) => ({...prev, [name]: name === "weight" ? Number(value): value, }));
    };

    const GETPet = async () =>
    {
        try
        {
            const res = await axios.get<GETPetRequestDTO>(import.meta.env.VITE_API_URL + `/pet/${id}`);
            
            const mappedData: UpdatePetDTO =
            {
                clientId: res.data.client?.id,
                name: res.data.name,
                species: res.data.species,
                breed: res.data.breed,
                gender: res.data.gender,
                birthDate: res.data.birthDate.substring(0, 10),
                weight: res.data.weight,
                adoptedDate: res.data.adoptedDate,
                rating: res.data.rating
            };

            setFormData(mappedData);
            setOriginalData(mappedData);
            
            setOwnerName(`${res.data.client.firstName} ${res.data.client.lastName}`);
        }
        catch (e)
        {
            console.error("Ocurrió un error al traer la información de la mascota: ", e);
        }
    };
    
    useEffect(() =>
    {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        GETPet();
    }, [])
    
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
                // evitar enviar fechas vacías
                if ((key === "birthDate" || key === "adoptedDate") && !newValue)
                    return;

                patchData[key] = newValue;
            }
        });

        console.log(patchData);
        
        try
        {
            const response = await axios.patch<GETPetRequestDTO>(import.meta.env.VITE_API_URL + `/pet/${id}`, patchData);

            console.log("Pet edited:", response.data);

            // Upload image if selected
            if (selectedImage)
            {
                const formDataToSend = new FormData();

                formDataToSend.append("file", selectedImage);

                await axios.put(import.meta.env.VITE_API_URL + `/image/${response.data.id}`, formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }

            navigate("../detallemascota");
        }
        catch (e)
        {
            console.error("Error updating pet:", e);
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (e.target.files && e.target.files[0])
        {
            const file = e.target.files[0];
            setSelectedImage(file);
    
            // Create a preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const clientModalSubmit = (fullName: string, id: string): void =>
    {
        setFormData((prev) => ({...prev, clientId: id}))

        setOwnerName(fullName);
    }

    return (
        <>
            <ViewHeader
                label="Mascotas"
                icon={<ApptsSVG/>}
                onBackClick={handleBack}
                submitCreateButton={handleSubmit}
            />

            <div className="h-2.5"/>
            
            <GenericContainer textSize={16}>

                <div className="flex items-center p-3">

                    <label className="cursor-pointer">

                        <img
                            src={previewUrl || placeholderImg}
                            alt="Pet"
                            className="w-16 h-16 rounded-full border border-gray-300 object-cover bg-gray-400"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />

                    </label>

                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Nombre</label>
                    <input type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           className="bg-[#f5f5f5] shadow dark:bg-[#101010] dark:shadow-none h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Especie</label>
                    <input type="text"
                           name="species"
                           value={formData.species}
                           onChange={handleChange}
                           className="bg-[#f5f5f5] shadow dark:bg-[#101010] dark:shadow-none h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Raza</label>
                    <input type="text"
                           name="breed"
                           value={formData.breed}
                           onChange={handleChange}
                           className="bg-[#f5f5f5] shadow dark:bg-[#101010] dark:shadow-none h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Genero</label>
                    <select name="gender"
                            onChange={handleChange}
                            className="bg-[#f5f5f5] shadow dark:bg-[#101010] dark:shadow-none p-1.25 rounded-md">
                        <option value="Macho">Macho</option>
                        <option value="Hembra">Hembra</option>
                    </select>
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Peso</label>
                    <input type="number"
                           min="0"
                           max="10000"
                           name="weight"
                           value={formData.weight}
                           onChange={handleChange}
                           className="bg-[#f5f5f5] shadow dark:bg-[#101010] dark:shadow-none h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Nacido el</label>
                    <input type="date"
                           name="birthDate"
                           value={formData.birthDate}
                           onChange={handleChange}
                           className="bg-[#f5f5f5] shadow dark:bg-[#101010] dark:shadow-none h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Adoptado el</label>
                    <input type="date"
                           name="adoptedDate"
                           value={formData.adoptedDate}
                           onChange={handleChange}
                           className="bg-[#f5f5f5] shadow dark:bg-[#101010] dark:shadow-none h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between mt-1.25">
                    <label className="font-light">Calificación</label>
                    <input type="number"
                           name="rating"
                           min="0"
                           max="10"
                           value={formData.rating}
                           onChange={handleChange}
                           className="bg-[#f5f5f5] shadow dark:bg-[#101010] dark:shadow-none h-8 p-2 rounded-md"
                    />
                </div>
                
            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer>
                
                <label className="text-[12px] font-light">
                    Dueño
                </label>

                <div className="flex items-center my-1.25">

                    <label className="font-light">Nombre</label>

                    <div className="grow"/>

                    <input
                        type="text"
                        name="clientId"
                        value={ownerName}
                        onChange={handleChange}
                        className="bg-[#f5f5f5] shadow dark:bg-[#101010] dark:shadow-none h-8 p-2 rounded-md"
                        disabled
                    />

                    <GenericButton
                        color="blue"
                        icon={<SearchSVG/>}
                        customClasses="ml-2.5"
                    />

                </div>

            </GenericContainer>

            <GenericModal open={open} onClose={() => setOpen(false)}>
                <SearchClientModal onClose={() => setOpen(false)} selectClient={(fullName, id) => clientModalSubmit(fullName, id)}/>
            </GenericModal>
        </>
    )
}

export default PatchPet