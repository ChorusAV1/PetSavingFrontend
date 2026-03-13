export interface GETAdmissionDTO
{
    id: string;
    pet: PetSummaryDTO;
    vet: VetSummaryDTO;
    admissionDate: string;
    dischargeDate: string;
    admissionReason: string;
    cageNumber: number;
    discharged: boolean;
}

export interface GetOneAdmissionDTO
{
    id: string;
    pet: PetSummaryDTO;
    vet: VetSummaryDTO;
    admissionDate: string;
    dischargeDate: string;
    admissionReason: string;
    cageNumber: number;
    discharged: boolean;
    statuses: GetOneStatusSummaryDTO[];
}

interface PetSummaryDTO
{
    id: string;
    name: string;
    species: string;
}

interface VetSummaryDTO
{
    id: string;
    userName: string;
    specialization: string;
}

export interface GetOneStatusSummaryDTO
{
    id: string
    currentStatus: string
    notes: string
}

export interface POSTAdmissionDTO
{
    petId: string;
    vetId: string | null;
    dischargeDate: string;
    admissionReason: string;
    cageNumber: number;
}
export interface CreateAdmissionForm
{
    petName: string;
    dischargeDate: string;
    admissionReason: string;
    cageNumber: number;
}

export interface PATCHAdmissionDTO
{
    petId: string;
    vetId: string | null;
    dischargeDate: string;
    admissionReason: string;
    cageNumber: number;
}