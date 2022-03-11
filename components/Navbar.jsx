import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { MdLogin } from 'react-icons/md'
import { FaBars, FaTimes } from 'react-icons/fa'
import { GiHandGrip, GiJumpingRope, GiWeightLiftingUp } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import { RiLogoutBoxLine } from 'react-icons/ri'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showNavColor, setShowNavColor] = useState(true)
    const { data: session } = useSession()
    const router = useRouter()
    // console.log(session)

    function getScrollValue() {
        if (router.pathname == '/') {
            if (window.pageYOffset < 50) {
                setShowNavColor(false)
            } else {
                setShowNavColor(true)
            }
        }
    }

    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", getScrollValue);
        }
        watchScroll();
        return () => {
            window.removeEventListener("scroll", getScrollValue);
        };

    })

    useEffect(()=>{
        if(router.pathname == '/'){
            setShowNavColor(false)
        }else{
            setShowNavColor(true)
        }
    },[router.pathname])

    return (
        <nav className={` ${showNavColor ? 'bg-black' : ''} w-full h-[5rem] flex justify-between box-border fixed z-50 shadow-md shadow-black`}>
            <div className='h-full w-[30%]  md:pl-16 flex items-center'>
                <div className={`relative w-44 h-[60%] flex items-center justify-center gap-2`}>
                    <GiJumpingRope color='#7e22ce' size={25} />
                    <GiWeightLiftingUp color='#7e22ce' size={25} />
                    <p className='font-faudiowide text-gray-50 text-xl'>FBlog</p>
                </div>
            </div>
            <div className='w-auto h-[5rem]  flex items-center justify-end md:justify-center'>
                <ul className={`w-1/2 md:w-auto ${showMenu ? 'h-screen' : 'h-0'}  bg-black bg-opacity-75 md:bg-transparent  overflow-hidden transition-all duration-700 ease-in-out  z-50 top-[5rem] md:top-0 absolute flex flex-col items-center justify-center gap-20 md:mr-8 md:w-full md:h-full md:relative md:flex-row `}>
                    <li className='font-fgrotesque text-gray-50 text-xl font-semibold transition-all duration-500 hover:text-purple-600'><Link href="/">Home</Link></li>
                    <li className='font-fgrotesque text-gray-50 text-xl font-semibold transition-all duration-500 hover:text-purple-600'><Link href="/posts">Posts</Link></li>
                    <li className='font-fgrotesque text-gray-50 text-xl font-semibold transition-all duration-500 hover:text-purple-600'><Link href="/about">About</Link></li>
                    <li className='font-fgrotesque text-gray-50 text-xl font-semibold transition-all duration-500 hover:text-purple-600'>
                        {
                            session
                                ? (
                                    <Link href={session.user.role === 'admin' ? '/admin' : '/profile'}>
                                        <a>
                                            <div className='flex flex-col items-center md:flex-row gap-2'>
                                                <div className='relative w-[2rem] h-[2rem] flex items-center'>
                                                    {
                                                        session.user.image
                                                            ? <Image className='rounded-full' src={session.user.image} alt='profile pic' layout='fill' />
                                                            : <FaUserCircle size={25} />
                                                    }
                                                </div>
                                                <span>{session.user.name}</span>
                                            </div>
                                        </a>
                                    </Link>
                                )
                                : <button className='flex items-center gap-2 outline-none border-none' onClick={() => signIn({ callbackUrl: '/' })}>Login <MdLogin /></button>
                        }
                    </li>
                    <li className='font-fgrotesque text-gray-50 text-xl font-semibold transition-all duration-500 hover:text-purple-600'>
                        {
                            session && <button className='w-fit outline-none border-none flex items-center justify-center mb-8 md:mb-0' onClick={() => signOut({ callbackUrl: '/' })} ><RiLogoutBoxLine size={25} /></button>
                        }
                    </li>
                </ul>
                <button className={`md:hidden block outline-none border-none mr-6`} onClick={() => setShowMenu(!showMenu)}>
                    {
                        showMenu
                            ? <FaTimes color='#7e22ce' size={30} />
                            : <FaBars color='#7e22ce' size={30} />
                    }
                </button>
            </div>
        </nav>
    )
}

export default Navbar