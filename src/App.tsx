import { useState } from "react";
import Header from "./Components/Header"
import Navbar from "./Components/Navbar"
import NavbarButton from "./Components/NavbarButton"
import ViewControl from "./Components/ViewControl";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appointments from "./Components/MainViews/Appointments";
import Clients from "./Components/MainViews/Clients";
import Calculator from "./Components/MainViews/Calculator";
import DeficitCalculator from "./Components/CalculatorViews/DeficitCalculator";
import MantenimientoCalculator from "./Components/CalculatorViews/MantenimientoCalculator";
import GoteoCalculator from "./Components/CalculatorViews/GoteoCalculator";
import NuevoCliente from "./Components/ClientViews/NuevoCliente";
import ListClients from "./Components/ClientViews/ListClients";
import DetailClients from "./Components/ClientViews/DetailClients";

function App()
{
    const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false)

	const [clientToShow, setClientToShow] = useState<string>("")

 	const toggleSidebar = () =>
  	{
   		setIsNavbarOpen(!isNavbarOpen);
 	}

	const goToClient = (id: string) =>
	{
		setClientToShow(id);
	}
  
  	return (
		<BrowserRouter>
			<div className="flex flex-col h-screen
                    dark:bg-[#191919]">
        		<Header handleSandwichOnClick={toggleSidebar}/>
      			<Navbar isOpen={isNavbarOpen}>
        			<NavbarButton label="Consultas" path="/appointments"/>
        			<NavbarButton label="Clientes" path="/clients"/>
        			<NavbarButton label="Mascotas" path="/appointments"/>
        			<NavbarButton label="Inventario" path="/appointments"/>
        			<NavbarButton label="Calculadora" path="/calculator"/>
      			</Navbar>
      			<ViewControl>
        			<Routes>
						<Route path="/appointments" element={<Appointments/>}/>
						<Route path="/clients" element={<Clients/>}>
							<Route path="lista" element = {<ListClients handleClientClick={goToClient}/>}/>
							<Route path="nuevocliente" element = {<NuevoCliente/>}/>
							<Route path="detallecliente" element = {<DetailClients id={clientToShow}/>}/>
						</Route>
						<Route path="/pets" element={<Appointments/>}/>
						<Route path="/inventory" element={<Appointments/>}/>
						<Route path="/calculator" element={<Calculator/>}>
							<Route path="deficit" element={<DeficitCalculator/>}/>
							<Route path="mantenimiento" element={<MantenimientoCalculator/>}/>
							<Route path="goteo" element={<GoteoCalculator/>}/>
						</Route>
					</Routes>
     	 		</ViewControl>
  	  		</div>
		</BrowserRouter>
	)
}

export default App
