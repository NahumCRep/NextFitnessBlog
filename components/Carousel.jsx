import React from 'react'
import Link from 'next/link'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

const Carousel = ({ highlightsPosts }) => {
    console.log(highlightsPosts)
    return (
        <article className='cursor-pointer w-full h-full bg-fuchsia-500 relative flex overflow-hidden'>
            {
                highlightsPosts && (
                    highlightsPosts.map((post) => {
                        return (
                            <div className='h-full w-full min-w-full overflow-hidden relative'>
                                <img className='absolute w-full h-full object-cover' src={post.image}></img>
                                <div className='absolute w-full h-full bg-black flex flex-col justify-center items-center transition-all duration-700 ease-in-out bg-opacity-70 hover:bg-opacity-50'>
                                    <h3 className='font-fgrotesque font-bold text-4xl text-white'>{post.title}</h3>
                                    <Link href={`/posts/${post.id}`} passHref>
                                        <a>
                                            <button className='outline-none border-none mt-5 font-fgrotesque text-xl font-bold bg-slate-100 p-3 rounded-xl transition-all duration-700 ease-in-out hover:tracking-widest'>Read Post</button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                )
            }
            <div className='group absolute w-[80px] h-full left-0 flex justify-center items-center transition-all duration-700 ease-in-out bg-purple-500 bg-opacity-0 hover:bg-opacity-40'>
                <button className='transition-all duration-700 ease-in-out group-hover:-translate-x-1 outline-none border-none bg-none mr-2'><MdArrowBackIosNew color='#ffffff' size={30} /></button>
            </div>
            <div className='group absolute w-[80px] h-full right-0 flex justify-center items-center transition-all duration-700 ease-in-out bg-purple-500 bg-opacity-0 hover:bg-opacity-40'>
                <button className='transition-all duration-700 ease-in-out group-hover:translate-x-1 outline-none border-none bg-none ml-2'><MdArrowForwardIos color='#ffffff' size={30} /></button>
            </div>
        </article>
    )
}

export default Carousel