import React from 'react'
import { RiLoader3Fill } from 'react-icons/ri'

const Loader = () => {
  return (
    <div className='w-full flex justify-center items-center animate-spin' ><RiLoader3Fill color='#7e22ce' size={30} /></div>
  )
}

export default Loader