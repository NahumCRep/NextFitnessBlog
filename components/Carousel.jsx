import React from 'react'
import Link from 'next/link'

const Carousel = ({ highlightsPosts }) => {
    console.log(highlightsPosts)
    return (
        <article className='cursor-pointer w-full h-full bg-fuchsia-500'>
            {
                highlightsPosts && (
                    <div className='h-full w-full overflow-hidden relative'>
                        <img className='absolute w-full h-full object-cover' src={highlightsPosts[0].image}></img>
                        <div className='absolute w-full h-full bg-black flex flex-col justify-center items-center transition-all duration-700 ease-in-out bg-opacity-70 hover:bg-opacity-50'>
                            <h3 className='font-fgrotesque font-bold text-4xl text-white'>{highlightsPosts[0].title}</h3>
                            <Link href={`/posts/${highlightsPosts[0].id}`} passHref>
                                <a>
                                    <button className='outline-none border-none mt-5 font-fgrotesque text-xl font-bold bg-purple-600 p-3 rounded-xl transition-all duration-700 ease-in-out hover:tracking-widest'>Read Post</button>
                                </a>
                            </Link>
                        </div>
                    </div>
                )
            }
        </article>
    )
}

export default Carousel