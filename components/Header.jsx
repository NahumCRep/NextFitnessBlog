import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa'

const Header = () => {
    return (
        <header className='w-full h-[80vh] bg-gray-50 flex mt-[5rem] flex-col md:flex-row'>
            <div className='w-1/2 h-full bg-gray-50 flex items-center'>
                <div className='w-[80%] h-[80%]  relative'>
                    <Image src={'/header.svg'} alt="big logo" layout='fill' />
                </div>
            </div>
            <div className='w-1/2 h-full bg-[#212121] flex relative'>
                <div className='w-[80%] h-80 bg-gray-500 absolute -left-24 top-14 shadow-md shadow-black'>
                    <div className='relative w-full h-full'>
                        <Image src={"/headerOne.jpg"} alt="header image" layout='fill'/>
                    </div>
                </div>
                <div className='w-[80%] h-full flex items-end box-border pl-16'>
                    <p className='font-farvo mb-8 text-4xl text-gray-50'>ejercicios, rutinas, salud y bienestar</p>
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
                    <div className='w-[2px] h-44 bg-orange-500 rounded-t-full rounded-b-full'></div>
                </div>
            </div>
        </header>
    )
}

export default Header