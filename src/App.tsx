import { useState } from "react";
import Header from "./Components/Header"
import Navbar from "./Components/Navbar"
import NavbarButton from "./Components/NavbarButton"
import ViewControl from "./Components/View/ViewControl";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Appointments from "./Components/MainViews/Appointments";
import Clients from "./Components/MainViews/Clients";
import Calculator from "./Components/MainViews/Calculator";
import DeficitCalculator from "./Components/CalculatorViews/DeficitCalculator";
import MantenimientoCalculator from "./Components/CalculatorViews/MantenimientoCalculator";
import GoteoCalculator from "./Components/CalculatorViews/GoteoCalculator";
import NuevoCliente from "./Components/ClientViews/NuevoCliente";
import ListClients from "./Components/ClientViews/ListClients";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
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
import CalcSVG from "./assets/CalcSVG";
import StaffSVG from "./assets/StaffSVG";
import GetOneAppointment from "./Components/AppointmentViews/GetOneAppointment";
import StockSVG from "./assets/StockSVG";
import Stock from "./Components/MainViews/Stock";
import GetAllStocks from "./Components/StockViews/GetAllStocks";
import Staff from "./Components/MainViews/Staff";
import GetAllStaff from "./Components/StaffViews/GetAllStaff";
import PostStock from "./Components/StockViews/PostStock";
import GetOneStock from "./Components/StockViews/GetOneStock";
import PatchStock from "./Components/StockViews/PatchStock";
import PetTracker from "./Components/PetTracker/PetTracker";

function App()
{
    const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false)
	const location = useLocation();
	const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/";

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

	const [stockToShow, setStockToShow] = useState<string>("")

	const goToStock = (id: string): void =>
	{
		setStockToShow(id);
	}
  
  	return (
		<div className="flex flex-col h-screen dark:bg-[#191919]">

			{/*Hides Navbar in Login and Register*/}
        	{!isAuthPage && <Header handleSandwichOnClick={toggleSidebar} />}
      		{!isAuthPage && (
				<Navbar isOpen={isNavbarOpen}>
					<NavbarButton label="Consultas" path="/appointments" icon={<ApptsSVG/>}/>
					<NavbarButton label="Clientes" path="/clients" icon={<CustSVG/>}/>
					<NavbarButton label="Mascotas" path="/pets" icon={<PetsSVG/>}/>
					<NavbarButton label="Inventario" path="/inventory" icon={<StockSVG/>}/>
					<NavbarButton label="Calculadora" path="/calculator" icon={<CalcSVG/>}/>
					<NavbarButton label="Personal" path="/staff" icon={<StaffSVG/>}/>
				</Navbar>
			)}

      		<ViewControl>
        		<Routes>

					<Route path="/" element={<PetTracker/>}/>
					<Route path="/register" element={<Register/>}/>
					<Route path="/login" element={<Login/>}/>
					<Route path="*" element={<ProtectedRoute> <Navigate to="/"/> </ProtectedRoute>}/>

					<Route path="/appointments" element = {<ProtectedRoute> <Appointments/> </ProtectedRoute>}>

						<Route path="list" element = {<ProtectedRoute> <GetAllAppointments handleAppointmentClick={goToAppointment}/> </ProtectedRoute>}/>
						<Route path="nuevaconsulta" element = {<PostAppointment/>}/>
						<Route path="detalleconsulta" element = {<GetOneAppointment id={appointmentToShow}/>}/>

					</Route>

					<Route path="/clients" element = {<ProtectedRoute> <Clients/> </ProtectedRoute>}>

						<Route path="lista" element = {<ListClients handleClientClick={goToClient}/>}/>
						<Route path="nuevocliente" element = {<NuevoCliente/>}/>
						<Route path="detallecliente" element = {<DetailClients id={clientToShow}/>}/>
						<Route path="editarcliente" element = {<PatchClient id={clientToShow}/>}/>

					</Route>

					<Route path="/pets" element={<ProtectedRoute> <Pet/> </ProtectedRoute>}>

						<Route path="list" element = {<ListPet handlePetClick={goToPet}/>}/>
						<Route path="nuevamascota" element = {<PostPet/>}/>
						<Route path="detallemascota" element = {<DetailPet id={petToShow}/>}/>
						<Route path="editarmascota" element = {<PatchPet id={petToShow}/>}/>

					</Route>

					<Route path="/inventory" element = {<ProtectedRoute> <Stock/> </ProtectedRoute>}>

						<Route path="list" element = {<GetAllStocks handleStockClick={goToStock}/>}/>
						<Route path="nuevoproducto" element = {<PostStock/>}/>
						<Route path="detalleproducto" element = {<GetOneStock id={stockToShow}/>}/>
						<Route path="editarproducto" element = {<PatchStock id={stockToShow}/>}/>

					</Route>

					<Route path="/calculator" element={<ProtectedRoute> <Calculator/> </ProtectedRoute>}>

						<Route path="deficit" element={<DeficitCalculator/>}/>
						<Route path="mantenimiento" element={<MantenimientoCalculator/>}/>
						<Route path="goteo" element={<GoteoCalculator/>}/>

					</Route>

					<Route path="/staff" element={<Staff/>}>

						<Route path="list" element={<GetAllStaff/>}/>

					</Route>

				</Routes>
				<ToastContainer position="top-center" autoClose={2000} theme="dark"/>
     	 	</ViewControl>
  	  	</div>
	)
}

export default App
