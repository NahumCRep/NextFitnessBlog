import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HighLight = ({highlightPost, reverse}) => {
  return (
    <div className={`w-full h-[500px] md:h-[400px] flex gap-5 flex-col ${reverse ? 'md:flex-row-reverse':'md:flex-row'}`}>
        <div className='relative w-full h-1/2 md:w-1/2 md:h-full'>
            <Image className='rounded-full ' src={highlightPost.image} alt="post image" layout='fill' />
        </div>
        <div className='w-full h-1/2 md:w-1/2 md:h-full font-fgrotesque px-3 flex flex-col gap-3 justify-center'>
            <p className='text-3xl md:text-5xl font-bold'>{highlightPost.title}</p>
            <p className='text-base md:text-xl font-semibold'>Date: {new Date(highlightPost.date).toLocaleDateString()}</p>
            <p className='text-lg  md:text-2xl font-semibold w-full md:h-40 h-44 text-justify line-clamp-4  md:line-clamp-5 overflow-hidden'>{highlightPost.description}</p>
            <div className='w-full'>
                <Link href={`/posts/${highlightPost.id}`} passHref>
                    <a>
                        <button className='outline-none border-none bg-none font-extrabold text-2xl text-purple-600 trasition-all duration-700 ease-in-out hover:tracking-widest'>
                            Read Post
                        </button>
                    </a>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HighLight