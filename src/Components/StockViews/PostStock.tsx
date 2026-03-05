import React, { useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import ViewHeader from '../View/ViewHeader';
import StockSVG from '../../assets/StockSVG';
import GenericContainer from '../Generic/GenericContainer';
import type { CreateInventoryDTO } from '../../types/InventoryTypes';
import axios from 'axios';

const PostStock: React.FC = (): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../list")
    }

    const [formData, setFormData] = useState<CreateInventoryDTO>(
    {
        name: "",
        description: "",
        unitValue: 0,
        stock: 0,
        supplerName: "",
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
            const payload: CreateInventoryDTO =
            {
                ...formData,
            };
    
            const response = await axios.post("http://localhost:5126/api/inventory", payload);

            console.log("Stock created:", response.data);

            navigate("../list");
        }
        catch (error)
        {
            console.error("Error creating user:", error);
        }
    };
    
    return (
        <>
            <ViewHeader
                icon={<StockSVG/>}
                label='Nuevo producto'
                onBackClick={handleBack}
                submitCreateButton={handleSubmit}
            />

            <div className='h-2.5'/>

            <GenericContainer>

                <label>Nombre del producto</label>
                <div className='h-1'/>
                <input
                    type='text'
                    name='name'
                    className='dark:bg-[#101010] h-8 p-2 rounded-md'
                    onChange={handleChange}
                />
                
                <div className='h-2'/>
                <label>Descripción</label>
                <div className='h-1'/>
                <input
                    type='text'
                    name='description'
                    className='dark:bg-[#101010] h-8 p-2 rounded-md'
                    onChange={handleChange}
                />

                <div className='h-2'/>
                <label>Valor unitario</label>
                <div className='h-1'/>
                <input
                    type='number'
                    name='unitValue'
                    className='dark:bg-[#101010] h-8 p-2 rounded-md'
                    onChange={handleChange}
                />

                <div className='h-2'/>
                <label>Cantidad</label>
                <div className='h-1'/>
                <input
                    type='number'
                    name='stock'
                    className='dark:bg-[#101010] h-8 p-2 rounded-md'
                    onChange={handleChange}
                />

                <div className='h-2'/>
                <label>Proveedor</label>
                <div className='h-1'/>
                <input
                    type='text'
                    name='supplerName'
                    className='dark:bg-[#101010] h-8 p-2 rounded-md'
                    onChange={handleChange}
                />

            </GenericContainer>
        </>
    )
}

export default PostStock