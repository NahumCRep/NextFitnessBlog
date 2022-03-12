import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='w-full h-[100vh] relative bg-black flex flex-col md:flex-row bg-[url(/headerbgOne.jpg)] bg-cover md:bg-contain bg-no-repeat bg-center overflow-hidden'>
            <div className='w-full h-2/5 md:w-1/2 md:h-full flex items-center justify-center md:justify-start md:pl-16'>
                <div>
                    <p className='font-faudiowide text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-black via-fuchsia-700 to-slate-800'>Fitness Blog</p>
                    <p className='font-fgrotesque text-gray-100 text-lg md:text-2xl'>not a decision but a lifestyle</p>
                </div>
            </div>
            <div className='w-full md:w-auto h-auto md:h-[100px] absolute ml-7 md:ml-0 bottom-8 md:-right-16 md:top-[50%] z-40 flex flex-col md:flex-row gap-10 md:gap-24 justify-center md:pt-4 md:rotate-90'>
                <Link href='https://www.facebook.com/'><a><span className='font-fgrotesque text-lg tracking-widest bg-clip-text text-transparent bg-gradient-to-br from-violet-700 via-violet-400 to-cyan-800'>facebook</span></a></Link>
                <Link href='https://www.instagram.com/'><a><span className='font-fgrotesque text-lg tracking-widest bg-clip-text text-transparent bg-gradient-to-br from-violet-700 via-violet-400 to-cyan-800'>instagram</span></a></Link>
                <Link href='https://twitter.com/'><a><span className='font-fgrotesque text-lg tracking-widest bg-clip-text text-transparent bg-gradient-to-br from-violet-700 via-violet-400 to-cyan-800'>twitter</span></a></Link>
            </div>
            {/* absolute div for decoration */}
            <div className={`w-[90%] h-screen md:w-1/2 md:h-[80%] absolute top-0 right-0 shadow-2xl shadow-[#212121] rotate-45`}></div>
        </div>
    )
}

export default Header