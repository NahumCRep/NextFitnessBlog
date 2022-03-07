import React from 'react'
import { getCsrfToken } from "next-auth/react"
import {AiFillGithub} from "react-icons/ai"
import {AiFillGoogleCircle} from "react-icons/ai"

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    // console.log(csrfToken)
    return {
      props: { csrfToken },
    }
}

export default function Login({ csrfToken }) {
  return (
    <>
        <form className='flex justify-center mb-5' action='/api/auth/signin/github' method='POST'>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <button className='bg-slate-900 p-3 rounded hover:bg-yellow-100 hover:text-black' type="submit"><AiFillGithub className='w-10 h-10 inline-block'/> Inicia sesión con GitHub</button>
        </form>
        <form className='flex justify-center' action='/api/auth/signin/google' method='POST'>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <button className='bg-slate-900 p-3 rounded hover:bg-yellow-100 hover:text-black' type="submit"><AiFillGoogleCircle className='w-10 h-10 inline-block'/> Inicia sesión con Google</button>
        </form>
    </>
  )
}