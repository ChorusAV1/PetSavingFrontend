import React, { type JSX } from 'react'

interface DetailPetProps
{
    id: string;
}

const DetailPet:React.FC<DetailPetProps> = ({ id }: DetailPetProps): JSX.Element =>
{
    return (
        <div className="dark:text-white">DetailPet {id}</div>
    )
}

export default DetailPet