import React, { type JSX } from 'react'

interface Props 
{
    name: string;
}

const View: React.FC<Props> = ({name}: Props): JSX.Element =>
{
  return (
    <>
        <div className="h-15
                           dark:bg-[#202020] dark:text-white">
            {name}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad laudantium maiores repellendus, quidem deleniti dolores ipsum nobis asperiores cumque pariatur!
        </div>
    </>
  )
}

export default View