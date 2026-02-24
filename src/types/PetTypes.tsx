export interface POSTPetRequestDTO
{
    clientId: string;
    name: string;
    species: string;
    breed: string;
    gender: string;
    birthDate: string;
    weight: number;
    adoptedDate: string;
    rating: number;
}

export interface GETPetRequestDTO
{
    id: string;
    client: clientSummaryDTO;
    name: string;
    species: string;
    breed: string;
    gender: string;
    birthDate: string;
    weight: number;
    adoptedDate: string;
    rating: number;
}

interface clientSummaryDTO
{
    firstName: string;
    lastName: string;
}