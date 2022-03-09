import axios from 'axios'
import React from 'react'
import Router, { useRouter } from 'next/router'
import ReactMarkdown from "react-markdown"
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import '@uiw/react-markdown-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

export async function getServerSideProps(context) {
    const secure = context.req.connection.encrypted
    const url = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/${context.params.id}`
    const res = await axios.get(url)

    return {
        props: {
            post: res.data
        }
    }
}

const MarkDownEditor = dynamic(
    () => import("@uiw/react-markdown-editor").then((mod) => mod.default), {
    ssr: false
}
)

export default function Post({ post }) {
    const router = useRouter()
    console.log(post)
    const deletePost = () => {
        axios.delete(`/api/posts/${post.id}`)
        .then((res)=>{
            router.replace('/admin/posts')
        }).catch(error=>console.log(error))
    }

    return (
        <section className='w-full h-auto mt-[5rem] bg-gray-100 flex flex-col gap-8 items-center'>
            <div className='flex justify-between w-[90%] md:w-[70%] h-20 items-center px-5 pt-8'>
                <Link href='/admin/posts' passHref>
                    <a>
                        <button className='transition-transform duration-700 ease-in-out hover:-translate-x-1'><FaArrowLeft color='#7e22ce' size={25} /></button>
                    </a>
                </Link>
                <div className='flex gap-2'>
                    <button className='w-28 h-11 rounded-md font-fgrotesque text-xl font-semibold transition-color duration-700 ease-in-out bg-blue-400 hover:bg-blue-300'>Edit Post</button>
                    <button onClick={()=>deletePost()} className='w-28 h-11 rounded-md font-fgrotesque text-xl font-semibold transition-color duration-700 ease-in-out bg-red-500 hover:bg-red-400'>Delete Post</button>
                </div>
            </div>
            <article className='w-[90%] md:w-[70%] h-auto min-h-screen prose prose-xl leading-10 prose-p:my-16 prose-invert p-5 md:0'>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
        </section>
    )
}