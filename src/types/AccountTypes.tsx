export interface RegisterAndLoginRequestDTO
{
    id: string;
    userName: string;
    token: string;
}

export interface LoginResponseDTO
{
    id: string;
    userName: string;
    token: string;
}