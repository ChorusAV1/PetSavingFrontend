import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from '../ViewHeader';
import PlaceholderCircle32x32 from '../../assets/PlaceholderCircle32x32';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { GETPetRequestDTO } from '../../types/PetTypes';
import PetsSVG from '../../assets/PetsSVG';

interface ListPetProps
{
    handlePetClick: (id: string) => void;
}

const ListPet: React.FC<ListPetProps> = ({handlePetClick}: ListPetProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleClick = (id: string) =>
    {
        handlePetClick(id)

        navigate("../detallemascota")
    }

    const [Pet, setPet] = useState<GETPetRequestDTO[]>([]);

    useEffect(() =>
    {
        axios.get<GETPetRequestDTO[]>("http://localhost:5126/api/pet").then((res) =>
        {
            setPet(res.data);
        })
        .catch((e) => console.error("Error de consulta de api en Pet:", e));
    }, []);

    return (
        <div>
            <ViewHeader
                label="Mascotas"
                icon={<PetsSVG/>}
                createNavigate="nuevamascota"
            />

            <ul className="dark:text-white">
                {Pet.map((pet) =>
                (
                    <li
                        key={pet.id}
                        className="flex m-2.5 border dark:border-black rounded dark:bg-[#202020] hover:dark:bg-[#303030] active:dark:bg-[#101010]"
                        onClick={() => handleClick(pet.id)}>

                        {/* Render appointment details */}
                        <div className="m-2">
                            <PlaceholderCircle32x32/>
                        </div>

                        <div className="flex flex-col text-[12px] justify-center ml-0.5">
                            <span><strong>{pet.name}</strong></span>
                            
                            <span>{pet.species}</span>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListPet