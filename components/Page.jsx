import React from 'react'
import Navbar from './Navbar'
import Seo from './Seo'

const Page = ({children}) => {
    return (
        <div className='h-screen bg-slate-300 flex flex-col justify-between '>
            <Seo />
            <Navbar />
            <main className='bg-slate-300'>
                {children}
            </main>
            <footer className="bg-slate-900 p-10 text-white">
                <ul className='flex'>
                    <li>Link 1</li>
                    <li>Link 1</li>
                    <li>Link 1</li>
                    <li>Link 1</li>
                    <li>Link 1</li>
                </ul>
            </footer>
        </div>
    )
}

export default Page