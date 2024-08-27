import React from 'react'

interface TitleProps{
    title: string
}

const Title:React.FC<TitleProps> = ({title}) => {
    return (
        <h1 className='font-karla font-semibold text-[24px] leading-[33px] tracking-wide text-center '>{title}</h1>
    )
}

export default Title