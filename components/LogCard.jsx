import React from 'react'
import Loader from './Loader'

const LogCard = ({name, children, amount}) => {
    return (
        <div className='w-[300px] h-[200px] bg-white shadow-lg shadow-black p-6 rounded-xl'>
            {/* space to icon */}
            {children}
            <p className='font-fgrotesque text-2xl font-bold '>{name}</p>
            <h1>
                {
                    amount
                        ? <h1 className='font-faudiowide text-6xl text-center mt-2'>{amount}</h1>
                        : <Loader />
                }
            </h1>
        </div>
    )
}

export default LogCard