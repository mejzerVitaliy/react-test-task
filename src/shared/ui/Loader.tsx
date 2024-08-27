import React from 'react'

const Loader:React.FC = () => {
    return (
        <main className='w-full h-full flex justify-center items-center'>
            <span className='w-[150px] h-[150px] border-[4px] border-dashed border-black rounded-full animate-[LoaderAnimation_3s_linear_infinite]'></span>
        </main>
    )
}

export default Loader