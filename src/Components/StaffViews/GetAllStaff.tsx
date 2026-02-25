import React from 'react'

interface GetAllStaffProps
{
    id: string;
}

const GetAllStaff = ({ id }: GetAllStaffProps) =>
{
  return (
    <div>GetAllStaff {id}</div>
  )
}

export default GetAllStaff