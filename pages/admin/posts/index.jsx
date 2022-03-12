import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import AdminPage from '../../../components/AdminPage'
import Link from 'next/link'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import Loader from '../../../components/Loader'
import AdminPostsList from '../../../components/AdminPostsList'


export async function getServerSideProps(context) {
    const secure = context.req.connection.encrypted
    let postsRes
    if (context.query.name) {
        const url = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/search?name=${context.query.name}`
        postsRes = await axios.get(url)
    }else if(context.query.highlights){
        const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/highlights`
        postsRes = await axios.get(postUrl)
    }else {
        const url = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts`
        postsRes = await axios.get(url)
    }


    return {
        props: {
            posts: postsRes.data
        }
    }
}


const Posts = ({ posts }) => {
    const router = useRouter();
    const searchRef = useRef(null)
    console.log(posts)

    const searchPost = () => {
        if (searchRef.current.value !== '') {
            router.push(`/admin/posts?name=${searchRef.current.value}`)
        } else {
            alert('Ingrese un texto a buscar')
        }
    }

    const getAllPosts = () => {
        router.push('/admin/posts')
    }

    const getAllHighlights = () => {
        router.push('/admin/posts?highlights=true')
    }


    return (
        <AdminPage>
            <section className='h-auto w-full'>
                <div className='flex py-5 px-9 justify-between items-center flex-col md:flex-row'>
                    <h1 className='font-faudiowide text-2xl'>Posts</h1>
                    <div className='flex justify-center items-center gap-5 md:gap-9 flex-col md:flex-row w-full md:w-auto mt-5 md:mt-0'>
                        <button onClick={() => getAllPosts()} className='w-full  h-10 rounded-lg md:w-28 font-fgrotesque text-xl font-bold bg-slate-100'>All</button>
                        <button onClick={() => getAllHighlights()} className='w-full h-10 rounded-lg  md:w-28 font-fgrotesque text-xl font-bold bg-slate-100'>Highlights</button>
                        <div className='flex gap-2 mt-3 md:mt-0'>
                            <input ref={searchRef} type='text' className='w-[300px] text-center rounded-md px-2 outline-none border-none shadow-inner shadow-slate-500' />
                            <button onClick={() => searchPost()} className='h-10 p-2 rounded-md flex justify-center items-center bg-white shadow-inner shadow-slate-500'><FaSearch size={20} /></button>
                        </div>
                        <Link href="/admin/posts/create"  >
                            <a>
                                <span className='h-10 p-2 w-full rounded-md bg-green-500 font-fgrotesque text-xl font-semibold flex justify-center items-center transition-colors duration-500 hover:bg-green-400'>Create Post</span>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='h-auto pb-5'>
                    <div className='w-full h-auto p-5 grid gap-4 grid-cols-auto-fit justify-items-center' >
                        {
                            posts
                                ? <AdminPostsList listOfPosts={posts} />
                                : <Loader />
                        }
                    </div>
                </div>
            </section>
        </AdminPage>
    )
}

export default Posts