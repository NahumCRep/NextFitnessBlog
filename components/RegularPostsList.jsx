import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const RegularPostsList = ({ listOfPosts }) => {
    return (
        <>
            {
                listOfPosts == ''
                    ? <p className='font-fgrotesque text-lg tracking-widest p-3 h-20 flex items-center justify-center'>No hay Posts Guardados</p>
                    : (
                        listOfPosts.map((item, index) => (
                            <Link key={item.id} href={`/posts/${item.id}`} passHref>
                                <a>
                                    <motion.button
                                        key={item.id}
                                        className='bg-white w-full h-[400px] md:w-[96%] p-3 md:p-4 md:h-[200px] rounded-md flex flex-col-reverse md:flex-row gap-8 justify-start transition-shadow duration-700 hover:shadow-lg hover:shadow-black'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1] }}
                                        transition={{ duration: index / 5 }}
                                        drag={false}
                                        dragElastic={1}
                                        dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
                                    >
                                        <div className='relative w-full md:w-[200px] h-[200px] md:h-full mt-1 md:mt-2'>
                                            <Image src={item.image} alt="post image" layout='fill' />
                                        </div>
                                        <div className='w-full md:w-[80%] flex flex-col justify-center pt-1'>
                                            <div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='relative h-10 w-10 mt-1 '>
                                                        <Image className='rounded-full' src={item.author.image} alt="profile picture" layout='fill' />
                                                    </div>
                                                    <div className='flex flex-col justify-center items-start flex-grow'>
                                                        <p className='font-fgrotesque text-xl font-semibold'>{item.author.name}</p>
                                                        <p className='font-fgrotesque text-sm font-bold'>{new Date(item.date).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <motion.h2 className='w-full text-left font-fgrotesque text-xl font-semibold mt-2'>{item.title}</motion.h2>
                                            </div>
                                            <p className='font-fgrotesque text-lg w-full md:w-[95%] h-20 line-clamp-3 font-medium overflow-hidden text-justify'>
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.button>
                                </a>
                            </Link>
                        ))
                    )
            }
        </>
    )
}

export default RegularPostsList