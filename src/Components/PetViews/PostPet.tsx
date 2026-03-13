import React, { useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GenericContainer from '../Generic/GenericContainer';
import GenericModal from '../Generic/GenericModal';
import SearchClientModal from '../Modals/SearchClientModal';
import type { GETPetRequestDTO, POSTPetRequestDTO } from '../../types/PetTypes';
import ViewHeader from '../View/ViewHeader';
import PetsSVG from '../../assets/PetsSVG';
import GenericButton from '../Generic/GenericButton';
import SearchSVG from '../../assets/SearchSVG';
import placeholderImg from "../../assets/AddImg.png";

const PostPet: React.FC = (): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../list")
    }

    {/*Image handling*/}
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    {/*GenericModal isOpen*/}
    const [open, setOpen] = useState<boolean>(false);
    
    const [formData, setFormData] = useState<POSTPetRequestDTO>(
    {
        clientId: "00000000-0000-0000-0000-000000000002",
        name: "",
        species: "",
        breed: "",
        gender: "Macho",
        birthDate: "",
        weight: 0,
        adoptedDate: "",
        rating: 0,
    });

    const [ownerName, setOwnerName] = useState<string>("Sin cliente")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    {
        const { name, value } = e.target;

        setFormData((prev) => ({...prev, [name]: name === "weight" ? Number(value): value, }));
    };
    
    const handleSubmit = async () =>
    {
        try
        {
            const payload: POSTPetRequestDTO =
            {
                ...formData,
                birthDate: new Date(formData.birthDate).toISOString(),
                adoptedDate: new Date(formData.adoptedDate).toISOString(),
            };
    
            const response = await axios.post<GETPetRequestDTO>(import.meta.env.VITE_API_URL + "/pet", payload);

            console.log("Pet created:", response.data);

            const petId = response.data.id;

            // Upload image if selected
            if (selectedImage)
            {
                const formDataToSend = new FormData();

                formDataToSend.append("file", selectedImage);

                await axios.post(`${import.meta.env.VITE_API_URL}/image/${petId}`, formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }

            navigate("../list");
        }
        catch (error)
        {
            console.error("Error creating pet:", error);
        }
    };

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
        setFormData((prev) => ({...prev, ["clientId"]: id}))

        setOwnerName(fullName);
    }

    return (
        <>
            <ViewHeader
                label="Nueva Mascota"
                icon={<PetsSVG/>}
                onBackClick={handleBack}
                submitCreateButton={handleSubmit}
            />

            <div className="mb-2.5"/>

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

                    <input type="text"
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
                        submitGenericButton={() => setOpen(true)}
                    />

                </div>

            </GenericContainer>

            <GenericModal open={open} onClose={() => setOpen(false)}>
                <SearchClientModal onClose={() => setOpen(false)} selectClient={(fullName, id) => clientModalSubmit(fullName, id)}/>
            </GenericModal>
        </>
    )
}

export default PostPet