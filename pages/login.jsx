import React from 'react'
import { getCsrfToken } from "next-auth/react"
import { AiFillGithub } from "react-icons/ai"
import { AiFillGoogleCircle } from "react-icons/ai"
import Image from 'next/image'

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  
  return {
    props: { csrfToken },
  }
}

export default function Login({ csrfToken }) {
  return (
    <section className='w-full h-screen flex flex-col justify-center items-center font-fgrotesque'>
      <div className='relative w-[200px] h-[200px]'>
          <Image src={'/login.svg'} alt='login image' layout='fill' />
      </div>
      <div>
        <h1 className='text-3xl font-bold mb-4'>Login with....</h1>
        <form className='flex justify-center mb-5' action='/api/auth/signin/github' method='POST'>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <button className='w-56 text-xl font-bold  transition-colors duration-700 ease-in-out bg-purple-700 p-3 rounded hover:bg-purple-500' type="submit"><AiFillGithub color='#ffffff' className='w-10 h-10 inline-block' /> GitHub</button>
        </form>
        <form className='flex justify-center' action='/api/auth/signin/google' method='POST'>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <button className='w-56 text-xl font-bold  transition-colors duration-700 ease-in-out bg-purple-700 hover:bg-purple-500 p-3 rounded' type="submit"><AiFillGoogleCircle color='#ffffff' className='w-10 h-10 inline-block' /> Google</button>
        </form>
      </div>

    </section>
  )
}