import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useSession, signIn } from "next-auth/react"
import Header from '../components/Header'
import { GiRapidshareArrow } from 'react-icons/gi'
import HomeCategoryItem from '../components/HomeCategoryItem'
import HighLight from '../components/HighLight'
import Loader from '../components/Loader'


export async function getServerSideProps(context) {
  const secure = context.req.connection.encrypted
  const url = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/highlights`
  const res = await axios.get(url)
 
  return {
    props: {
      highlights: res.data
    }
  }
}


export default function Home({ highlights }) {
  const { data: session } = useSession()
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const changeImage = setInterval(() => {
      let i = imageIndex + 1
      if (i > 3) { i = 0 }
      setImageIndex(i)
    }, 5000)

    return () => {
      clearInterval(changeImage)
    }
  }, [imageIndex])

  return (
    <>
      <Header />
      <section className='h-auto '>
        <div className='w-full h-40 bg-black relative flex flex-col-reverse md:flex-row items-center md:items-start md:justify-between rounded-br-[70%]'>
          <div className='w-[10%] md:w-[40%] h-14 md:h-auto md:flex justify-center items-start hidden'>
            <GiRapidshareArrow color='#7e22ce' size={220} />
          </div>
          <div className='z-10 rounded-2xl bg-slate-200 w-[90%] h-[50%] md:w-[60%] md:h-[70%] md:mr-10 shadow-2xl shadow-black p-5'>
            <h1 className='font-faudiowide text-base md:text-3xl text-center'>All About Healt and Fitness Life</h1>
            <p className='font-fgrotesque text-sm md:text-2xl font-bold text-center'>find various posts with interesting topycs like...</p>
          </div>
        </div>
        <div className='w-[90%] md:w-[45%] h-auto md:h-auto grid grid-cols-3 grid-rows-auto-fit-100 gap-2 m-auto my-7'>
          <HomeCategoryItem title='Rutines' />
          <HomeCategoryItem title='Food' />
          <HomeCategoryItem title='Health' />
          <HomeCategoryItem title='Exercise' />
          <HomeCategoryItem title='Good habits' />
          <HomeCategoryItem title='And More...' />
        </div>
        <div className='w-full h-[400px] mt-14 md:mt-28 px-4 flex flex-col-reverse md:flex-row justify-center'>
          <div className='relative w-full md:w-[40%] h-1/2 md:h-full bg-purple-400 bg-opacity-60 rounded-tr-full rounded-tl-full p-1'>
            <Image className='drop-shadow-2xl shadow-black' src={'/opinions.svg'} alt='opinion svg' layout='fill' />
          </div>
          <div className='w-full h-1/2 md:w-1/2 md:h-full font-fgrotesque p-6 flex flex-col justify-center'>
            <h1 className='text-2xl md:text-5xl font-bold'>We like to see your opinions, comments and anything about the posts</h1>
            <p className='text-base md:text-2xl font-semibold'>but before you have to be part of the blog so <button onClick={() => signIn({ callbackUrl: '/' })} className='text-xl md:text-3xl text-purple-600 font-bold outline-none boder-none bg-none'>SingIn!!</button></p>
          </div>
        </div>
        <div className='w-full h-auto px-6 md:px-20 mt-16 pt-9 pb-12 bg-white rounded-tr-full shadow-2xl shadow-black'>
          <h1 className='font-faudiowide text-3xl text-center md:text-left md:text-5xl px-3 mt-5'>Highlights</h1>
          <div className='w-full h-auto flex flex-col gap-44 mt-16'>
            {
              highlights
                ? (
                  highlights.map((post, index) => {
                    if (index % 2 === 0) {
                      return <HighLight key={index} highlightPost={post} reverse={true} />
                    } else {
                      return <HighLight key={index} highlightPost={post} reverse={false} />
                    }
                  })
                )
                : <Loader />
            }
          </div>
        </div>
      </section>
    </>

  )
}
