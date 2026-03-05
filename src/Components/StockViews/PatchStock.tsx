import axios from 'axios';
import React, { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import type { ReadInventoryDTO, UpdateInventoryDTO } from '../../types/InventoryTypes';
import ViewHeader from '../View/ViewHeader';
import StockSVG from '../../assets/StockSVG';
import GenericContainer from '../Generic/GenericContainer';

interface PatchStockProps
{
    id: string;
}

const PatchStock: React.FC<PatchStockProps> = ({ id }: PatchStockProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../detalleproducto")
    }

    const [loading, setLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<ReadInventoryDTO>(
    {
        id: "",
        name: "",
        description: "",
        unitValue: 0,
        stock: 0,
        supplerName: "",
    });

    const GETStock = async () =>
    {
        try
        {
            setLoading(true);

            axios.get<ReadInventoryDTO>(`http://localhost:5126/api/inventory/${id}`).then((res) =>
            {
                setFormData(res.data);
            });
        }
        catch (e)
        {
            console.error("Ocurrió un error al traer la información del producto: ", e);
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        GETStock();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target;
    
        setFormData((prev) => ({...prev, [name]: value, }));
    };

    const handleSubmit = async () =>
    {
        try
        {
            const payload: UpdateInventoryDTO =
            {
                ...formData,
            };
    
            const response = await axios.patch(`http://localhost:5126/api/inventory/${id}`, payload);

            console.log("Stock edited:", response.data);

            navigate("../detalleproducto");
        }
        catch (e)
        {
            console.error("Error updating user:", e);
        }
    };

    if (loading)
    {
        return(
            <div>Cargando</div>
        )
    }
    
    return (
        <>
            <ViewHeader
                label='Editar producto'
                icon={<StockSVG/>}
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
                    value={formData.name}
                />
                
                <div className='h-2'/>
                <label>Descripción</label>
                <div className='h-1'/>
                <input
                    type='text'
                    name='description'
                    className='dark:bg-[#101010] h-8 p-2 rounded-md'
                    onChange={handleChange}
                    value={formData.description}
                />

                <div className='h-2'/>
                <label>Valor unitario</label>
                <div className='h-1'/>
                <input
                    type='number'
                    name='unitValue'
                    className='dark:bg-[#101010] h-8 p-2 rounded-md'
                    onChange={handleChange}
                    value={formData.unitValue}
                />

                <div className='h-2'/>
                <label>Cantidad</label>
                <div className='h-1'/>
                <input
                    type='number'
                    name='stock'
                    className='dark:bg-[#101010] h-8 p-2 rounded-md'
                    onChange={handleChange}
                    value={formData.stock}
                />

                <div className='h-2'/>
                <label>Proveedor</label>
                <div className='h-1'/>
                <input
                    type='text'
                    name='supplerName'
                    className='dark:bg-[#101010] h-8 p-2 rounded-md'
                    onChange={handleChange}
                    value={formData.supplerName}
                />

            </GenericContainer>
        </>
    )
}

export default PatchStock