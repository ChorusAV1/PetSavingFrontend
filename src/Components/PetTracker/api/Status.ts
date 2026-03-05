// src/api/Status.ts
const API_URL = "http://localhost:5126"; // tu backend real

export async function getStatusByAdmissionId(admissionId: number) {
  const response = await fetch(`${API_URL}/api/status/${admissionId}`);
  if (!response.ok) throw new Error("Error al obtener status");
  return response.json();
}