import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Header from '../components/Header'
import HeaderTwo from '../components/HeaderTwo'

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
    <HeaderTwo />
      <div className='h-[600px]'>
        <button onClick={() => signIn()}>Sign in</button>
        <button onClick={() => signOut()}>Sign out</button>
        <Link href="/editor">Editor</Link>
      </div>
    </>

  )
}
