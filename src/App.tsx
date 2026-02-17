import { useState } from "react";
import Header from "./Components/Header"
import Navbar from "./Components/Navbar"
import NavbarButton from "./Components/NavbarButton"
import ViewControl from "./Components/ViewControl";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appointments from "./Components/Appointments";
import Clients from "./Components/Clients";

function App()
{

    const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false)

 	const toggleSidebar = () =>
  	{
   		setIsNavbarOpen(!isNavbarOpen);
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
        			<NavbarButton label="Calculadora" path="/appointments"/>
      			</Navbar>
      			<ViewControl>
        			<Routes>
						<Route path="/appointments" element={<Appointments/>}/>
						<Route path="/clients" element={<Clients/>}/>
						<Route path="/pets" element={<Appointments/>}/>
						<Route path="/inventory" element={<Appointments/>}/>
						<Route path="/calculator" element={<Appointments/>}/>
					</Routes>
     	 		</ViewControl>
  	  		</div>
		</BrowserRouter>
	)
}

export default App
