import React, { useState, type JSX } from 'react'
import ViewHeader from '../ViewHeader'
import { useNavigate } from 'react-router-dom'
import GenericContainer from '../GenericContainer';
import GenericButton from '../GenericButton';
import GenericModal from '../GenericModal';
import ApptsSVG from '../../assets/ApptsSVG';
import SearchSVG from '../../assets/SearchSVG';

const PostAppointment: React.FC = (): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../list")
    }

    const [petNameInput, setPetNameInput] = useState<string>("Sin mascota");

    const [clientNameInput, setClientNameInput] = useState<string>("Sin cliente");

    const handleSubmit = () =>
    {
        console.log("Submit appointment has been clicked!");
    }
    return (
        <>
            <ViewHeader
                icon={<ApptsSVG/>}
                label="Consultas"
                onBackClick={handleBack}
                submitCreateButton={handleSubmit}
            />

            <div className="h-2.5"/>

            <GenericContainer textSize={16}>

                <div className="flex items-center">

                    <label className="ml-2">Mascota</label>

                    <div className="grow"/>

                    <input
                        className="dark:bg-[#101010] h-8 p-2 rounded-md w-50"
                        name="pet"
                        type="text"
                        disabled
                    />

                    <GenericButton
                        color="blue"
                        icon={<SearchSVG/>}
                        customClasses="ml-2.5"
                    />

                </div>

                <div className="h-2.5"/>

                <div className="flex items-center">

                    <label className="ml-2">Cliente</label>

                    <div className="grow"/>

                    <input
                        className="dark:bg-[#101010] h-8 p-2 rounded-md w-50"
                        name="client"
                        type="text"
                        disabled
                    />

                    <GenericButton
                        color="blue"
                        icon={<SearchSVG/>}
                        customClasses="ml-2.5"
                    />

                </div>

            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <label className="font-light mb-1">Diagnostico / Sintomas</label>

                <textarea
                    className="dark:bg-[#101010] p-2 rounded-md"
                    name="diagnosis"
                />
            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <label className="font-light mb-1">Tratamiento</label>

                <textarea
                    className="dark:bg-[#101010] p-2 rounded-md"
                    name="treatment"
                />
            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={12}>

                <label className="font-light mb-1">Notas adicionales</label>

                <textarea
                    className="dark:bg-[#101010] p-2 rounded-md"
                    name="treatment"
                />
            </GenericContainer>

            <div className="h-2.5"/>

            <GenericContainer textSize={16}>

                <div className="flex items-center justify-between">

                    <label>Fecha de seguimiento</label>

                    <input name="birthDate"
                        className="dark:bg-[#101010] h-8 p-2 rounded-md"
                        type="date"
                    />

                </div>
                
            </GenericContainer>

            <GenericModal>

                <p>a</p>

            </GenericModal>
        </>
    )
}

export default PostAppointment