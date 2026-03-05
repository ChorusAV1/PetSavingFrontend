import React, { useState, type JSX } from 'react'
import PetSearch from './PetSearch';
import PetCard from './PetCard';

const PetTracker:React.FC = ():JSX.Element => {
  const [showPet, setShowPet] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Barra superior */}
      <header className="bg-blue-600 text-white dark:bg-gray-900 dark:text-white px-6 py-3 shadow-md">
        <h1 className="text-lg font-semibold">Seguimiento de mascotas</h1>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-100">
        <PetSearch onSearch={() => setShowPet(true)} onClear={() => setShowPet(false)} />

        {showPet && (
          <div className="mt-6 w-full flex justify-center">
            <PetCard />
          </div>
        )}
      </main>
    </div>
  );
}

export default PetTracker