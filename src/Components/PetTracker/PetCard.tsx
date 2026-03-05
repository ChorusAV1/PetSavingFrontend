import { useEffect, useState } from "react";
import { getStatusByAdmissionId } from "./api/Status";

interface Admission {
  id: number;
  admissionDate: string;
  admissionReason: string;
}

interface Status {
  id: number;
  admission: Admission;
  currentStatus: string;
  notes: string;
}

export default function PetCard() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    // Ejemplo: admissionId = 1
    getStatusByAdmissionId(1).then(setStatus).catch(console.error);
  }, []);

  if (!status) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="p-6 bg-white text-black dark:bg-gray-900 dark:text-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Detalles de la mascota</h2>
      <p><span className="font-medium">ID de seguimiento:</span> {status.id}</p>
      <p><span className="font-medium">Fecha de ingreso:</span> {status.admission.admissionDate}</p>
      <p><span className="font-medium">Motivo de ingreso:</span> {status.admission.admissionReason}</p>
      <p><span className="font-medium">Status:</span> {status.currentStatus}</p>
      <p><span className="font-medium">Notas:</span> {status.notes}</p>
    </div>
  );
}
