import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link'

const Page = ({ children }) => {
    return (
        <div className='min-h-screen h-auto bg-slate-300 flex flex-col justify-between '>
            <Navbar />
            <main className='bg-slate-200 h-auto'>
                {children}
            </main>
            <footer className="w-full h-60 md:h-56 bg-black p-10 text-white">
                <div className='flex gap-9'>
                    <ul className='flex flex-col font-fgrotesque'>
                        <li className='text-xl font-bold'>Navigation</li>
                        <li><Link href='/'>Home</Link></li>
                        <li><Link href='/posts'>Posts</Link></li>
                        <li><Link href='/about'>About</Link></li>
                        <li><Link href='/posts?highlights=true'>Highlights</Link></li>
                    </ul>
                    <ul className='flex flex-col font-fgrotesque'>
                        <li className='text-xl font-bold'>Contact</li>
                        <li><Link href='/'>Facebook</Link></li>
                        <li><Link href='/posts'>Instagram</Link></li>
                        <li><Link href='/about'>Twitter</Link></li>
                    </ul>
                </div>
                <p className='w-full text-center mt-10 md:pt-5 md:mt-0 font-fgrotesque text-sm md:text-lg font-medium '>Tzuzul Bootcamp 2022 &copy; Nahum Casco</p>
            </footer>
        </div>
    )
}

export default Page