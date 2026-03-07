import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from '../View/ViewHeader';
import { useNavigate } from 'react-router-dom';
import GenericContainer from '../Generic/GenericContainer';
import PlaceholderCircle64x64 from '../../assets/PlaceholderCircle64x64';
import type { GETPetRequestDTO, UpdatePetDTO } from '../../types/PetTypes';
import GenericModal from '../Generic/GenericModal';
import SearchClientModal from '../Modals/SearchClientModal';
import axios from 'axios';
import GenericButton from '../Generic/GenericButton';
import AddImgSVG from '../../assets/AddImgSVG';
import ApptsSVG from '../../assets/ApptsSVG';
import SearchSVG from '../../assets/SearchSVG';

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
                birthDate: res.data.birthDate,
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
            const response = await axios.patch(import.meta.env.VITE_API_URL + `/pet/${id}`, patchData);

            console.log("Pet edited:", response.data);

            navigate("../detallemascota");
        }
        catch (e)
        {
            console.error("Error updating pet:", e);
        }
    }

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

                    <PlaceholderCircle64x64/>

                    <GenericButton
                        color="blue"
                        icon={<AddImgSVG/>}
                        customClasses="ml-5"
                    />

                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Nombre</label>
                    <input type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           className="dark:bg-[#101010] h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Especie</label>
                    <input type="text"
                           name="species"
                           value={formData.species}
                           onChange={handleChange}
                           className="dark:bg-[#101010] h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Raza</label>
                    <input type="text"
                           name="breed"
                           value={formData.breed}
                           onChange={handleChange}
                           className="dark:bg-[#101010] h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Genero</label>
                    <select name="gender"
                            onChange={handleChange}
                            className="bg-[#101010] p-1.25 rounded-md">
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
                           className="dark:bg-[#101010] h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Nacido el</label>
                    <input type="date"
                           name="birthDate"
                           value={formData.birthDate}
                           onChange={handleChange}
                           className="dark:bg-[#101010] h-8 p-2 rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between my-1.25">
                    <label className="font-light">Adoptado el</label>
                    <input type="date"
                           name="adoptedDate"
                           value={formData.adoptedDate}
                           onChange={handleChange}
                           className="dark:bg-[#101010] h-8 p-2 rounded-md"
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
                           className="dark:bg-[#101010] h-8 p-2 rounded-md"
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
                        className="dark:bg-[#101010] h-8 p-2 rounded-md"
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