import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { motion } from "framer-motion"
// import { Transition } from '@tailwindui/react'

const imageList = [
    '/headerOne.jpg',
    '/headerTwo.jpg',
    '/headerThree.jpg',
    '/headerFour.jpg'
]

const Header = () => {
    const [imageIndex, setImageIndex] = useState(0)
    const [opacityAnimation, setOpacityAnimation] = useState(false)
    const imageRef = useRef(null)

    // const listImages = [
    //     <Image className='animate-fade-in' src={imageList[0]} alt="header image" layout='fill' />,
    //     <Image className='animate-fade-in' src={imageList[1]} alt="header image" layout='fill' />,
    //     <Image className='animate-fade-in' src={imageList[2]} alt="header image" layout='fill' />,
    //     <Image className='animate-fade-in' src={imageList[3]} alt="header image" layout='fill' />,
    // ]

    useEffect(()=>{
        const changeImage = setInterval(()=>{
            let i = imageIndex + 1
            if(i > 3){i = 0}
            setImageIndex(i)
            // console.log(imageRef.current.className.add('animate-fade-in'))
        },5000)

        return () => {
            clearInterval(changeImage)
        }
    },[imageIndex])


    return (
        <header className='w-full h-[80vh] bg-gray-50 flex mt-[5rem] flex-col md:flex-row'>
            <div className='w-full h-2/5 md:w-1/2 md:h-full bg-gray-50 flex items-center justify-center md:justify-start'>
                <div className='w-[80%] h-[80%] relative '>
                    <Image src={'/header.svg'} alt="big logo" layout='fill' />
                </div>
            </div>
            <div className='w-full h-3/5 md:w-1/2 md:h-full bg-[#212121] flex relative'>
                <div className=' w-[75%] h-[50%] md:w-[80%] bg-[#212121] md:h-80 absolute top-11 md:-left-24 md:top-14 shadow-md shadow-black'>
                    <div ref={imageRef} className={`relative w-full h-full opacity-70  `}>
                        <Image className='animate-fade-in' src={imageList[imageIndex]} alt="header image" layout='fill' />
                    </div>
                </div>
                <div className='w-[80%] h-full flex items-end box-border pl-16'>
                    <p className='font-farvo mb-8 text-xl md:text-4xl text-gray-50'>ejercicios, rutinas, salud y bienestar</p>
                </div>
                <div className='w-[20%] h-full flex flex-col justify-end items-center gap-5 pb-6'>
                    <Link href="www.facebook.com">
                        <a>
                            <button className='w-[30px] h-[30px] rounded-full bg-orange-500 flex items-center justify-center'>
                                <FaFacebookF size={17} />
                            </button>
                        </a>
                    </Link>
                    <Link href="www.instagram.com">
                        <a>
                            <button className='w-[30px] h-[30px] rounded-full bg-orange-500 flex items-center justify-center'>
                                <FaInstagram size={17} />
                            </button>
                        </a>
                    </Link>
                    <Link href="www.twitter.com">
                        <a>
                            <button className='w-[30px] h-[30px] rounded-full bg-orange-500 flex items-center justify-center'>
                                <FaTwitter size={17} />
                            </button>
                        </a>
                    </Link>
                    <div className='w-[1px] h-20 md:w-[2px] md:h-44 bg-orange-500 rounded-t-full rounded-b-full'></div>
                </div>
            </div>
        </header>
    )
}

export default Header