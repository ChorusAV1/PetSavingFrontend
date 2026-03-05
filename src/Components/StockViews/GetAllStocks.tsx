import React, { useEffect, useState, type JSX } from 'react'
import type { ReadInventoryDTO } from '../../types/InventoryTypes';
import axios from 'axios';
import ViewHeader from '../View/ViewHeader';
import StockSVG from '../../assets/StockSVG';
import { useNavigate } from 'react-router-dom';
import ViewMessage from '../View/ViewMessage';

interface GetAllStocksProps
{
	handleStockClick: (id: string) => void;
}

const GetAllStocks: React.FC<GetAllStocksProps> = ({ handleStockClick }: GetAllStocksProps): JSX.Element =>
{
	const navigate = useNavigate();

    const handleClick = (id: string) =>
    {
        handleStockClick(id)

        navigate("../detalleproducto")
    }
	
	const [stocks, setStocks] = useState<ReadInventoryDTO[]>([]);

    const [loading, setLoading] = useState(false);

    const GETstock = async () =>
    {
        try
        {
            setLoading(true);

            const res = await axios.get<ReadInventoryDTO[]>("http://localhost:5126/api/inventory");
            
            setStocks(res.data);
        }
        catch(e)
        {
            console.error("Error de consulta de api en Inventory:", e)
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        GETstock();   
    }, []);

    if (loading)
    {
        return (
            <>
                <ViewHeader
                    label="Inventario"
                    icon={<StockSVG/>}
                    createNavigate="nuevoproducto"
                />

                <ViewMessage message='Cargando...'/>
            </>
        );
    }

	// Verificar si la lista de stocks está vacía
    if (stocks.length === 0) {
        return (
            <>
                <ViewHeader
                    label="Inventario"
                    icon={<StockSVG />}
                    createNavigate="nuevoproducto"
                />

				<ViewMessage message='No hay productos en el inventario.'/>
            </>
        );
    }
	
	return (
		<>
			<ViewHeader
                label="Inventario"
                icon={<StockSVG/>}
                createNavigate="nuevoproducto"
            />

			<div className="dark:text-white">
                {stocks.map((stock) =>
                (
                    <div
                        key={stock.id}
                        className="flex items-center border-b dark:border-black dark:bg-[#202020] hover:dark:bg-[#303030] active:dark:bg-[#101010] p-3"
                        onClick={() => handleClick(stock.id)}
                    >

                        <div className="flex flex-col text-[12px] justify-center">
                            <span><strong>{stock.name}</strong></span>
                            
                            <span>{stock.description}</span>
                        </div>

                        <div className="grow"/>

						<div className='flex flex-col items-center'>

							<span className='text-[12px]'><strong>${stock.unitValue}</strong></span>

                        	<span className="text-[12px]">{stock.stock}</span>

						</div>

						

                    </div>
                ))}
            </div>
		</>
	)
}

export default GetAllStocks