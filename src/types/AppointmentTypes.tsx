export interface POSTAppointmentRequestDTO
{
    petId: string;
    clientId: string;
    vetId: string | null;
    diagnosis: string;
    treatment: string;
    notes: string;
    followUpDate: string;
}

export interface GETAppointmentRequestDTO
{
    id: string;
    pet: PetSummaryDTO;
    client: ClientSummaryDTO;
    vet: VetSummaryDTO,
    appointmentDate: string;
    diagnosis: string;
    treatment: string;
    notes: string;
    followUpDate: string;
}

interface PetSummaryDTO
{
    id: string;
    name: string;
    species: string;
}

interface ClientSummaryDTO
{
    id: string;
    firstName: string;
    lastName: string;
}
interface VetSummaryDTO
{
    id: string;
    userName: string;
    specialization: string;
}