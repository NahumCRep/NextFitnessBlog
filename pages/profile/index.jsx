import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Profile = () => {
  const { data: session } = useSession()
  console.log(session)
  return (
    <section className='w-full h-full min-h-screen mt-20'>
      <div className='flex items-center bg-[#212121] p-4 gap-6'>
        <div className='w-24 h-24 relative'>
          <Image className='rounded-full' src={session.user.image} alt='profile picture' layout='fill' />
        </div>
        <div className='font-fgrotesque text-gray-50'>
          <p className='text-base  md:text-xl font-semibold tracking-widest'>{session.user.name}</p>
          <p className='text-base  md:text-xl font-semibold tracking-widest'>{session.user.email}</p>
        </div>
      </div>
    </section>
  )
}

export default Profile