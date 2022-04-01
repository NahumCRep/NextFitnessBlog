import {useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { GiImperialCrown } from 'react-icons/gi'

export default function AdminPage({children}) {
    const [currentPage, setCurrentPage] = useState(0)
    const { data: session } = useSession()
    const router = useRouter()

    if(session === null || session?.user?.role==="regular"){
        router.replace("/")
    }
    
    useEffect(()=>{
        if(router.route == '/admin') setCurrentPage(0)
        else if(router.route == '/admin/posts' || router.route == '/admin/posts/create' || router.route == '/admin/posts/create'|| router.route == '/admin/posts/search') setCurrentPage(1)
        else if(router.route == '/admin/categories') setCurrentPage(2)
        else if(router.route == '/admin/comments') setCurrentPage(3)
    },[router.route])

    return (
        <>
            <section className='bg-black w-full h-48 flex flex-col justify-end items-center'>
                <div className='flex items-center justify-center gap-2 text-gray-50'>
                    <GiImperialCrown size={25} />
                    <span className='font-faudiowide pt-2'>Admin</span>
                </div>
                <ul className='flex px-7 py-5 gap-5 text-gray-50'>
                    <li className={`font-fgrotesque ${currentPage == 0 ? 'border-b-2 border-fuchsia-700':''}`}><Link href="/admin">Admin</Link></li>
                    <li className={`font-fgrotesque ${currentPage == 1 ? 'border-b-2 border-fuchsia-700':''}`}><Link href="/admin/posts">Posts</Link></li>
                    <li className={`font-fgrotesque ${currentPage == 2 ? 'border-b-2 border-fuchsia-700':''}`}><Link href="/admin/categories">Categories</Link></li>
                    <li className={`font-fgrotesque ${currentPage == 3 ? 'border-b-2 border-fuchsia-700':''}`}><Link href="/admin/comments">Comments</Link></li>
                </ul>
            </section>
            <section className='bg-slate-300 h-auto min-h-screen'>
                {children}
            </section>
        </>
    )
}