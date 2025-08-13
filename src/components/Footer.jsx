import React from 'react'

const Footer = () => {
    return (
        <div className='bg-black flex flex-col justify-center items-center w-full bottom-0'>
            <div className='m-2'>
                <h1 className='text-2xl font-bold text-center'>
                    <span className='text-violet-500'> &#123; &lt; </span>
                    <span className='text-white'>Pass</span>
                    <span className='text-violet-500'>Locker /&gt; &#125;</span>
                </h1>
            </div>
            <div className='text-white flex justify-center items-center mb-5'>
                Made with <img src="public\icons\Heart_corazón.svg.webp" alt="" style={{"width":"16px","height":"14px","marginRight":"5px","marginLeft":"5px"}}/> by AMAN SAHI
            </div>
        </div>
    )
}

export default Footer

