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
import PatchClient from "./Components/ClientViews/PatchClient";
import Pet from "./Components/MainViews/Pet";
import ListPet from "./Components/PetViews/ListPet";
import PostPet from "./Components/PetViews/PostPet";
import DetailPet from "./Components/PetViews/DetailPet";
import PatchPet from "./Components/PetViews/PatchPet";
import GetAllAppointments from "./Components/AppointmentViews/GetAllAppointments";
import PostAppointment from "./Components/AppointmentViews/PostAppointment";
import ApptsSVG from "./assets/ApptsSVG";
import CustSVG from "./assets/CustSVG";
import PetsSVG from "./assets/PetsSVG";
import Placeholder20x20 from "./assets/Placeholder20x20";
import CalcSVG from "./assets/CalcSVG";
import StaffSVG from "./assets/StaffSVG";

function App()
{
    const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false)

 	const toggleSidebar = () =>
  	{
   		setIsNavbarOpen(!isNavbarOpen);
 	}

	const [appointmentToShow, setAppointmentToShow] = useState<string>("");

	const goToAppointment = (id: string) =>
	{
		setAppointmentToShow(id);
	}

	const [clientToShow, setClientToShow] = useState<string>("")

	const goToClient = (id: string) =>
	{
		setClientToShow(id);
	}

	const [petToShow, setPetToShow] = useState<string>("");

	const goToPet = (id: string) =>
	{
		setPetToShow(id);
	}
  
  	return (
		<BrowserRouter>
			<div className="flex flex-col h-screen
                    dark:bg-[#191919]">
        		<Header handleSandwichOnClick={toggleSidebar}/>
      			<Navbar isOpen={isNavbarOpen}>
        			<NavbarButton label="Consultas" path="/appointments" icon={<ApptsSVG/>}/>
        			<NavbarButton label="Clientes" path="/clients" icon={<CustSVG/>}/>
        			<NavbarButton label="Mascotas" path="/pets" icon={<PetsSVG/>}/>
        			<NavbarButton label="Inventario" path="/appointments" icon={<Placeholder20x20/>}/>
        			<NavbarButton label="Calculadora" path="/calculator" icon={<CalcSVG/>}/>
					<NavbarButton label="Personal" path="/staff" icon={<StaffSVG/>}/>
      			</Navbar>
      			<ViewControl>
        			<Routes>
						<Route path="/appointments" element = {<Appointments/>}>
							<Route path="list" element = {<GetAllAppointments handleAppointmentClick={goToAppointment}/>}/>
							<Route path="nuevaconsulta" element = {<PostAppointment/>}/>
						</Route>
						<Route path="/clients" element = {<Clients/>}>
							<Route path="lista" element = {<ListClients handleClientClick={goToClient}/>}/>
							<Route path="nuevocliente" element = {<NuevoCliente/>}/>
							<Route path="detallecliente" element = {<DetailClients id={clientToShow}/>}/>
							<Route path="editarcliente" element = {<PatchClient id={clientToShow}/>}/>
						</Route>
						<Route path="/pets" element={<Pet/>}>
							<Route path="list" element = {<ListPet handlePetClick={goToPet}/>}/>
							<Route path="nuevamascota" element = {<PostPet/>}/>
							<Route path="detallemascota" element = {<DetailPet id={petToShow}/>}/>
							<Route path="editarmascota" element = {<PatchPet id={petToShow}/>}/>
						</Route>
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
