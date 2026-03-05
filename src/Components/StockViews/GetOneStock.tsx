import React, { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import ViewHeader from '../View/ViewHeader';
import StockSVG from '../../assets/StockSVG';
import GenericContainer from '../Generic/GenericContainer';
import axios from 'axios';
import type { ReadInventoryDTO } from '../../types/InventoryTypes';
import GenericModal from '../Generic/GenericModal';
import DeleteModal from '../Modals/DeleteModal';
import ViewMessage from '../View/ViewMessage';

interface GetOneStockProps
{
    id: string;
}

const GetOneStock: React.FC<GetOneStockProps> = ({ id }: GetOneStockProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = (): void =>
    {
        navigate("../list")
    }

    const handleEdit = () =>
    {
        navigate("../editarproducto")
    }

    const handleDelete = (): void =>
    {
        try
        {
            axios.delete(`http://localhost:5126/api/inventory/${id}`);

            handleBack();
        }
        catch (e)
        {
            console.error("Ocurrió un error al tratar de borrar el producto: ", e)
        }
    }

    const [loading, setLoading] = useState(false);

    const [stock, setStock] = useState<ReadInventoryDTO>(
    {
        id: "",
        name: "",
        description: "",
        unitValue: 0,
        stock: 0,
        supplerName: "",
    });

    const GETStock = async (): Promise<void> =>
    {
        try
        {
            setLoading(true);

            const res = await axios.get<ReadInventoryDTO>(`http://localhost:5126/api/inventory/${id}`);

            setStock(res.data);
        }
        catch(e)
        {
            console.error("Error de consulta de api en GETStock:", e);
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

    // Modal
    const [open, setOpen] = useState<boolean>(false);

    if (loading)
    {
        return (
            <>
                <ViewHeader
                    label='Producto'
                    icon={<StockSVG/>}
                    onBackClick={handleBack}
                    onDeleteClick={() => setOpen(true)}
                />

                <ViewMessage message='Cargando...'/>
            </>
        );
    }
    
    return (
        <>
            <ViewHeader
                label='Producto'
                icon={<StockSVG/>}
                onBackClick={handleBack}
                onDeleteClick={() => setOpen(true)}
                onEditClick={handleEdit}
            />

            <div className='h-2.5'/>

            <GenericContainer>
                
                <label className='font-bold'>Producto:</label>
                <span>{stock.name}</span>

                <div className='h-2.5'/>
                
                <label className='font-bold'>Descripción:</label>
                <span>{stock.description}</span>

                <div className='h-2.5'/>
                
                <label className='font-bold'>Valor unitario:</label>
                <span>${stock.unitValue}</span>

                <div className='h-2.5'/>
                
                <label className='font-bold'>Existencias:</label>
                <span>{stock.stock}</span>

                <div className='h-2.5'/>
                
                <label className='font-bold'>Proveedor:</label>
                <span>{stock.supplerName}</span>

            </GenericContainer>

            <GenericModal open={open} onClose={() => setOpen(false)}>

                <DeleteModal message="Estás seguro de que deseas eliminar este producto?" onClickDelete={handleDelete} onClickClose={() => setOpen(false)}/>

            </GenericModal>
        </>
    )
}

export default GetOneStock