import React, { type JSX } from 'react'

interface GetAllStaffProps
{
	handleStaffClick?: (id: string) => void;
}

const GetAllStaff: React.FC<GetAllStaffProps> = ({ handleStaffClick }: GetAllStaffProps): JSX.Element =>
{
	return (
		<div>GetAllStaff</div>
	)
}

export default GetAllStaff