import React from 'react'

interface GetAllStocksProps
{
    id: string;
}

const GetAllStocks = ({ id }: GetAllStocksProps) =>
{
  return (
    <div>GetAllStocks {id}</div>
  )
}

export default GetAllStocks