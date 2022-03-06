import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdLogin } from 'react-icons/md'
import { FaBars, FaTimes } from 'react-icons/fa'
import { GiHandGrip, GiJumpingRope, GiWeightLiftingUp } from 'react-icons/gi'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showNavColor, setShowNavColor] = useState(false)
    const [scrollY, setScrollY] = useState(0);

    function getScrollValue() {
        window.pageYOffset > 50 
        ? setShowNavColor(true)
        : setShowNavColor(false)
    }

    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", getScrollValue);
        }
        watchScroll();
        return () => {
            window.removeEventListener("scroll", getScrollValue);
        };
    });

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         window.onscroll = () => {
    //             window.scrollY > 50
    //                 ? setShowNavColor(true)
    //                 : setShowNavColor(false)
    //         }
    //     }
    // }, [window.onscroll])
    // ${showLogo ? 'block':'hidden'}

    return (
        <nav className={` ${showNavColor ? 'bg-black' : ''} w-full h-[5rem] flex box-border fixed z-50 shadow-md shadow-black`}>
            <div className='h-full w-1/2  md:pl-16 flex items-center'>
                {/* <div className={`relative w-44 h-[60%] flex items-center justify-center`}>
                    <Image src="/dumbellTeal.svg" alt="logo" layout='fill' />
                </div> */}
                <div className={`relative w-44 h-[60%] flex items-center justify-center gap-2`}>
                    <GiJumpingRope color='#7e22ce' size={25} />
                    <GiWeightLiftingUp color='#7e22ce' size={25} />
                    <p className='font-faudiowide text-gray-50 text-xl'>FBlog</p>
                </div>
            </div>
            <div className='w-1/2 h-[5rem]  flex items-center justify-end md:justify-center'>
                <ul className={`w-1/2 ${showMenu ? 'h-screen' : 'h-0'} backdrop-blur-md md:backdrop-blur-none overflow-hidden transition-all duration-700 ease-in-out  z-50 top-[5rem] md:top-0 absolute flex flex-col items-center justify-center gap-24 md:w-full md:h-full md:relative md:flex-row `}>
                    <li className='font-fgrotesque text-gray-50 text-xl font-semibold transition-all duration-500 hover:text-purple-600'><Link href="/">Home</Link></li>
                    <li className='font-fgrotesque text-gray-50 text-xl font-semibold transition-all duration-500 hover:text-purple-600'><Link href="/">Posts</Link></li>
                    <li className='font-fgrotesque text-gray-50 text-xl font-semibold transition-all duration-500 hover:text-purple-600'><Link href="/">About</Link></li>
                    <li className='font-fgrotesque text-gray-50 text-xl font-semibold transition-all duration-500 hover:text-purple-600'><Link href="/" passHref><a><span className='flex items-center gap-2'>Login <MdLogin /></span></a></Link></li>
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