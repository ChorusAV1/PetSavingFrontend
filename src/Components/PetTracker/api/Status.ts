// src/api/Status.ts
const API_URL = import.meta.env.VITE_API_URL; // tu backend real

export async function getStatusByAdmissionId(admissionId: number) {
  const response = await fetch(`${API_URL}/status/${admissionId}`);
  if (!response.ok) throw new Error("Error al obtener status");
  return response.json();
}