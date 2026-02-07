import { useState } from "react";
import Header from "./Components/Header"
import Navbar from "./Components/Navbar"
import NavbarButton from "./Components/NavbarButton"
import ViewControl from "./Components/ViewControl";
import View from "./Components/View";

function App()
{

  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false)

  const toggleSidebar = () =>
  {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const [activeView, setActiveView] = useState<string>("Consultas");

  const handleNavBarButtonOnClick = (viewName: string) =>
  {
    setActiveView(viewName);
    console.log(viewName);
  }
  
  return (
    <div className="flex flex-col h-screen
                    dark:bg-[#191919]">
      <Header handleSandwichOnClick={toggleSidebar}/>
      <Navbar isOpen={isNavbarOpen}>
        <NavbarButton label="Consultas" handleNavBarButtonOnClick = {handleNavBarButtonOnClick}/>
        <NavbarButton label="Clientes" handleNavBarButtonOnClick = {handleNavBarButtonOnClick}/>
        <NavbarButton label="Mascotas" handleNavBarButtonOnClick = {handleNavBarButtonOnClick}/>
        <NavbarButton label="Inventario" handleNavBarButtonOnClick = {handleNavBarButtonOnClick}/>
        <NavbarButton label="Calculadora" handleNavBarButtonOnClick = {handleNavBarButtonOnClick}/>
        <NavbarButton label="Personal" handleNavBarButtonOnClick = {handleNavBarButtonOnClick}/>
      </Navbar>
      <ViewControl activeView={activeView}>
        <View name="Consultas">

        </View>
        <View name="Clientes">

        </View>
      </ViewControl>
    </div>
  )
}

export default App
