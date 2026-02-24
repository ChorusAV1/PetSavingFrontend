import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from '../ViewHeader';
import { useNavigate } from 'react-router-dom';
import GenericContainer from '../GenericContainer';
import PlaceholderCircle64x64 from '../../assets/PlaceholderCircle64x64';
import type { GETPetRequestDTO } from '../../types/PetTypes';
import GenericModal from '../GenericModal';
import SearchClientModal from '../SearchClientModal';
import axios from 'axios';
import GenericButton from '../GenericButton';
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

    const [formData, setFormData] = useState<GETPetRequestDTO>(
    {
        id: "",
        client: {
            firstName: "",
            lastName: ""
        },
        name: "",
        species: "",
        breed: "",
        gender: "",
        birthDate: "",
        weight: 0,
        adoptedDate: "",
        rating: 0,
    });

    const [ownerName, setOwnerName] = useState<string>("Sin cliente");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    {
        const { name, value } = e.target;
    
        setFormData((prev) => ({...prev, [name]: name === "weight" ? Number(value): value, }));
    };

    const GETPet = () =>
    {
        try
        {
            axios.get<GETPetRequestDTO>(`http://localhost:5126/api/pet/${id}`).then((res) =>
            {
                setFormData(res.data);
            });
        }
        catch (e)
        {
            console.error("Ocurrió un error al traer la información del cliente: ", e);
        }
    };
    
    useEffect(() =>
    {
        GETPet();
    }, [])
    
    const handleSubmit = () =>
    {
        console.log("Submit is being clicked!")
    }

    const clientModalSubmit = (fullName: string, id: string): void =>
    {
        setFormData((prev) => ({...prev, ["clientId"]: id}))

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