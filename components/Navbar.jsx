import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdLogin } from 'react-icons/md'

const Navbar = () => {
    const [showLogo, setShowLogo] = useState(false)

    // useEffect(()=>{
    //     window.onscroll = () =>{
    //         window.scrollY > 50 
    //         ? setShowLogo(true)
    //         : setShowLogo(false)
    //     }
    // },[window.onscroll])
    // ${showLogo ? 'block':'hidden'}

    return (
        <nav className='w-full h-[5rem] flex box-border fixed z-50'>
            <div className='h-full w-1/2 bg-gray-50 pl-16 flex items-center'>
                <div className={`relative w-44 h-[60%] flex items-center justify-center`}>
                    <Image src="/logo.svg" alt="logo" layout='fill' />
                </div>
            </div>
            <ul className='w-1/2 h-[5rem] bg-[#212121] flex items-center justify-center gap-24'>
                <li className='font-farvo text-gray-50 text-xl'><Link href="/">Home</Link></li>
                <li className='font-farvo text-gray-50 text-xl'><Link href="/">Posts</Link></li>
                <li className='font-farvo text-gray-50 text-xl'><Link href="/">About</Link></li>
                <li className='font-farvo text-gray-50 text-xl'><Link href="/" passHref><a><span className='flex items-center gap-2'>Login <MdLogin /></span></a></Link></li>
            </ul>
        </nav>
    )
}

export default Navbar