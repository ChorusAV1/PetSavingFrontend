export interface ReadInventoryDTO
{
    id: string;
    name: string;
    description: string;
    unitValue: number;
    stock: number;
    supplerName: string;
}

export interface CreateInventoryDTO
{
    name: string;
    description: string;
    unitValue: number;
    stock: number;
    supplerName: string;
}

export interface UpdateInventoryDTO
{
  name: string;
  description: string;
  unitValue: number;
  stock: number;
  supplerName: string;
}