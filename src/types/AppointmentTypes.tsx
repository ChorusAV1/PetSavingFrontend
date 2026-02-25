export interface POSTAppointmentRequestDTO
{
    petId: string;
    clientId: string;
    vetId: string;
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
    name: string;
    species: string;
}

interface ClientSummaryDTO
{
    firstName: string;
    lastName: string;
}
interface VetSummaryDTO
{
    userName: string;
    specialization: string;
}