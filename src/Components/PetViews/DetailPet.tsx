import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from '../View/ViewHeader';
import { useNavigate } from 'react-router-dom';
import GenericModal from '../Generic/GenericModal';
import DeleteModal from '../Modals/DeleteModal';
import type { GETPetRequestDTO } from '../../types/PetTypes';
import axios from 'axios';
import GenericContainer from '../Generic/GenericContainer';
import PetsSVG from '../../assets/PetsSVG';
import Avatar from '../Avatar';
import Spacer from '../Spacer';

interface DetailPetProps
{
    id: "";
}

const DetailPet:React.FC<DetailPetProps> = ({ id }: DetailPetProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../list");
    }

    const handleDelete = () =>
    {
        try
        {
            axios.delete(import.meta.env.VITE_API_URL + `/pet/${id}`);

            handleBack();
        }
        catch (e)
        {
            console.error("Ocurrió un error al tratar de borrar el cliente: ", e)
        }
    }

    const handleEdit = () =>
    {
        navigate("../editarmascota")
    }

    const [pet, setPet] = useState<GETPetRequestDTO>
    ({
        id: "",
        client: {
            id: "",
            firstName: "",
            lastName: "",
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

    const GETPet = async (): Promise<void> =>
    {
        try
        {
            const res = await axios.get<GETPetRequestDTO>(import.meta.env.VITE_API_URL + `/pet/${id}`);

            // eslint-disable-next-line prefer-const
            let mappedData: GETPetRequestDTO =
            {
                id: res.data.id,
                client: res.data.client,
                name: res.data.name,
                species: res.data.species,
                breed: res.data.breed,
                gender: res.data.gender,
                birthDate: res.data.birthDate,
                weight: res.data.weight,
                adoptedDate: res.data.adoptedDate,
                rating: res.data.rating,
            }

            if (res.data.birthDate == null)
            {
                mappedData.birthDate = "Sin fecha de nacimiento";
            }
            else
            {
                mappedData.birthDate = mappedData.birthDate.substring(0, 10);
            }

            if (res.data.adoptedDate == null)
            {
                mappedData.adoptedDate = "Sin fecha de adopción";
            }
            else
            {
                mappedData.adoptedDate = mappedData.adoptedDate.substring(0, 10);
            }

            setPet(mappedData);
        }
        catch(e)
        {
            console.error("Error de consulta de api en Pet:", e);
        }
    }

    useEffect(() =>
    {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        GETPet();
    }, []);

    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <ViewHeader
                label="Mascotas"
                icon={<PetsSVG/>}
                onEditClick={handleEdit}
                onBackClick={handleBack}
                onDeleteClick={() => setOpen(true)}
            />

            <Spacer/>

            <GenericContainer>
            
                <div className="flex items-center">

                    <Avatar guid={pet?.id} name={pet.name} size={64}/>

                    <div className="flex flex-col m-2.5 text-[16px]">
                        <span><strong>{pet?.name}</strong></span>
                        <span>{pet?.species}</span>
                    </div>

                </div>

                <div className="text-[14px] space-y-3.5 mt-2">
                    <div className="flex">
                        <label className="mr-2">Raza:</label>
                        <span>{pet?.breed}</span>
                    </div>
                    <div className="flex">
                        <label className="mr-2">Género:</label>
                        <span>{pet?.gender}</span>
                    </div>
                    <div className="flex">
                        <label className="mr-2">Peso:</label>
                        <span>{pet?.weight}kgs</span>
                    </div>
                    <div className="flex">
                        <label className="mr-2">Fecha de nacimiento:</label>
                        <span>{pet?.birthDate}</span>
                    </div>
                    <div className="flex">
                        <label className="mr-2">Fecha de adopción:</label>
                        <span>{pet?.adoptedDate}</span>
                    </div>
                </div>

            </GenericContainer>

            <Spacer/>

            <GenericContainer>

                <div>
                    <label>Calificación: </label>
                    <span>{pet?.rating}</span>
                </div>

            </GenericContainer>

            <GenericModal open={open} onClose={() => setOpen(false)}>

                <DeleteModal message="¿Estás seguro de que deseas eliminar esta mascota?" onClickDelete={handleDelete} onClickClose={() => setOpen(false)}/>

            </GenericModal>

            <h3 className="dark:text-white font-light text-center text-[12px] my-2.5">Dueño</h3>

            <GenericContainer>

                <div className="flex items-center">

                    <Avatar guid={pet.client.id} name={pet.client.firstName}/>

                    <div className="flex flex-col text-[12px]">
                        <label className="ml-2.5"><strong>{pet?.client.firstName + " " + pet?.client.lastName}</strong></label>
                        <label className="ml-2.5">clientemail@TBD.com</label>
                    </div>

                    <div className="grow"/>

                    <span className="mr-2.5">9998887777</span>
                </div>

            </GenericContainer>
        </>
        
    )
}

export default DetailPet