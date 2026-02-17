import type { JSX } from "react";

interface ViewProps 
{
    children: React.ReactNode;
    name: string;
}

const View: React.FC<ViewProps> = ({children}: ViewProps): JSX.Element =>
{
    return (
      <>
          {children}
      </>
    )
}

export default View