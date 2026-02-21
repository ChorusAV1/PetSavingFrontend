import { useState } from "react";
import Header from "./Components/Header"
import Navbar from "./Components/Navbar"
import NavbarButton from "./Components/NavbarButton"
import ViewControl from "./Components/ViewControl";
import { Route, Routes, useLocation } from "react-router-dom";
import Appointments from "./Components/MainViews/Appointments";
import Clients from "./Components/MainViews/Clients";
import Calculator from "./Components/MainViews/Calculator";
import DeficitCalculator from "./Components/CalculatorViews/DeficitCalculator";
import MantenimientoCalculator from "./Components/CalculatorViews/MantenimientoCalculator";
import GoteoCalculator from "./Components/CalculatorViews/GoteoCalculator";
import NuevoCliente from "./Components/NuevoCliente";
import ListClients from "./Components/ListClients";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App()
{

    const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false)
	const location = useLocation();
	const isAuthPage = location.pathname === "/login" || location.pathname === "/register";


 	const toggleSidebar = () =>
  	{
   		setIsNavbarOpen(!isNavbarOpen);
 	}
  
  	return (
			<div className="flex flex-col h-screen
                    dark:bg-[#191919]">
				{/*Hides Navbar in Login and Register*/}
        		{!isAuthPage && <Header handleSandwichOnClick={toggleSidebar} />}
      			{!isAuthPage && (
					<Navbar isOpen={isNavbarOpen}>
						<NavbarButton label="Consultas" path="/appointments"/>
						<NavbarButton label="Clientes" path="/clients"/>
						<NavbarButton label="Mascotas" path="/appointments"/>
						<NavbarButton label="Inventario" path="/appointments"/>
						<NavbarButton label="Calculadora" path="/calculator"/>
					</Navbar>
				)}
      			<ViewControl>
        			<Routes>
						<Route path="/login" element={<Login/>}/>
						<Route path="/register" element={<Register/>}/>
						<Route path="/appointments" element={<ProtectedRoute> <Appointments/> </ProtectedRoute>}/>
						<Route path="/clients" element={<ProtectedRoute> <Clients/> </ProtectedRoute>}>
							<Route path="lista" element = {<ListClients/>}/>
							<Route path="nuevocliente" element = {<NuevoCliente/>}/>
						</Route>
						<Route path="/pets" element={<Appointments/>}/>
						<Route path="/inventory" element={<Appointments/>}/>
						<Route path="/calculator" element={<Calculator/>}>
							<Route path="deficit" element={<DeficitCalculator/>}/>
							<Route path="mantenimiento" element={<MantenimientoCalculator/>}/>
							<Route path="goteo" element={<GoteoCalculator/>}/>
						</Route>
					</Routes>
					<ToastContainer position="top-center" autoClose={2000} theme="dark"/>
     	 		</ViewControl>
  	  		</div>
	)
}

export default App
