import axios from 'axios';
import React, { useEffect, useState, type JSX } from 'react'
import PlaceholderCircle32x32 from '../../assets/PlaceholderCircle32x32';
import Placeholder20x20 from '../../assets/Placeholder20x20';
import type { GETPetRequestDTO } from '../../types/PetTypes';

interface SearchPetModalProps
{
    onClose: () => void;
    selectPet: (name: string, id: string) => void;
}

const SearchPetModal: React.FC<SearchPetModalProps> = ({ onClose, selectPet}: SearchPetModalProps): JSX.Element =>
{
    const sendInfo = (name: string, id: string) =>
    {
        selectPet(name, id)

        onClose();
    }

    const [pets, setPets] = useState<GETPetRequestDTO[]>([]);

    const [loading, setLoading] = useState(false);

    const getPets = async () =>
    {
        try
        {
            setLoading(true);

            const res = await axios.get<GETPetRequestDTO[]>("http://localhost:5126/api/pet");

            setPets(res.data);
        }
        catch(e)
        {
            console.error("Error al cargar las mascotas de SearchPetModal: ", e);

            return[];
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        getPets();
    },[])

    if (loading)
    {
        return (
            <p>Cargando...</p>
        );
    }

    return (
        <>
            <header className="flex items-center py-2 px-3 dark:text-white border-b dark:border-black">
                <label className="">Seleccionar Mascota</label>

                <div className="grow"/>

                <button onClick={onClose}>
                    <Placeholder20x20/>
                </button>
                
            </header>
            <div className="flex flex-col items-center justify-center py-2.5 pt-20 overflow-y-auto overflow-x-hidden h-100">

            <ul className="space-y-2.5">

                {pets.map((Pet) => (

                <div className={`flex flex-col justify-center dark:bg-[#202020] border dark:border-black hover:dark:bg-[#303030] active:dark:bg-[#101010] mx-2.5 p-2.5 dark:text-white rounded`}
                     onClick={() => sendInfo(Pet.name, Pet.id)}>

                    <div className="flex items-center w-70">
                        <PlaceholderCircle32x32/>

                        <li key={Pet.id}
                            className="ml-2.5">
                            <h2>{Pet.name}</h2>
                            <p className="font-light">{Pet.species}</p>
                        </li>
                    </div>
                    
                </div>

                ))}
            </ul>
            
            </div>
        </>
        
    )
}

export default SearchPetModal