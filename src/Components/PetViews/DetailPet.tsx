import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from '../ViewHeader';
import { useNavigate } from 'react-router-dom';
import GenericModal from '../GenericModal';
import DeleteModal from '../DeleteModal';
import type { GETPetRequestDTO } from '../../types/PetTypes';
import axios from 'axios';
import GenericContainer from '../GenericContainer';
import PlaceholderCircle64x64 from '../../assets/PlaceholderCircle64x64';
import PlaceholderCircle32x32 from '../../assets/PlaceholderCircle32x32';
import PetsSVG from '../../assets/PetsSVG';

interface DetailPetProps
{
    id: string;
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
            axios.delete(`http://localhost:5126/api/pet/${id}`);

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

    const [pet, setPet] = useState<GETPetRequestDTO>();

    const GETPet = () =>
    {
        axios.get<GETPetRequestDTO>(`http://localhost:5126/api/pet/${id}`).then((res) =>
        {
            setPet(res.data);
        })
        .catch((e) => console.error("Error de consulta de api en Pet:", e));
    }

    useEffect(() =>
    {
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

            <div className="h-2.5"/>

            <GenericContainer>
            
                <div className="flex items-center">

                    <PlaceholderCircle64x64/>

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

            <div className="h-2.5"/>

            <GenericContainer>

                <div>
                    <label>Calificación:</label>
                    <span>{pet?.rating}</span>
                </div>

            </GenericContainer>

            <GenericModal open={open} onClose={() => setOpen(false)}>

                <DeleteModal message="¿Estás seguro de que deseas eliminar esta mascota?" onClickDelete={handleDelete} onClickClose={() => setOpen(false)}/>

            </GenericModal>

            <h3 className="dark:text-white font-light text-center text-[12px] my-2.5">Dueño</h3>

            <GenericContainer>

                <div className="flex items-center">

                    <PlaceholderCircle32x32/>

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