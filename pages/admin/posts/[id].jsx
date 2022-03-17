import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import ReactMarkdown from "react-markdown"
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import PostForm from '../../../components/PostForm'
import { useSession } from 'next-auth/react'

export async function getServerSideProps(context) {
    const secure = context.req.connection.encrypted
    const url = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/${context.params.id}`
    const res = await axios.get(url)

    const catgUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
    const catgRes = await axios.get(catgUrl)

    return {
        props: {
            post: res.data,
            categories: catgRes.data
        }
    }
}

export default function Post({ post, categories }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isPendingSave, setIsPendingSave] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()
    console.log(post)
    const deletePost = () => {
        axios.delete(`/api/posts/${post.id}`)
            .then((res) => {
                router.replace('/admin/posts')
            }).catch(error => console.log(error))
    }

    const saveContent = (postTitle, postImage, postCategory, postHighlight, postDescription, content) => {
        setIsPendingSave(true)
        axios.put(`/api/posts/${post.id}`, {
            title: postTitle,
            author: session.user,
            image: postImage,
            category: postCategory,
            highlight: postHighlight,
            description: postDescription,
            date: new Date(),
            content,
        }).then(res => {
            setIsPendingSave(false)
            router.replace("/admin/posts")
        })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <section className='w-full h-auto mt-[5rem]  flex flex-col gap-8 items-center'>
            <div className='flex justify-between w-[90%] md:w-[70%] h-20 items-center px-5 pt-8'>
                <Link href='/admin/posts' passHref>
                    <a>
                        <button className='transition-transform duration-700 ease-in-out hover:-translate-x-1'><FaArrowLeft color='#7e22ce' size={25} /></button>
                    </a>
                </Link>
                <div className='flex gap-2'>
                    <button onClick={() => setIsEditing(!isEditing)} className='w-28 h-11 rounded-md font-fgrotesque text-xl font-semibold transition-color duration-700 ease-in-out bg-blue-400 hover:bg-blue-300'>
                        {
                            isEditing ? 'Stop Editing' : 'Edit Post'
                        }
                    </button>
                    <button onClick={() => deletePost()} className='w-28 h-11 rounded-md font-fgrotesque text-xl font-semibold transition-color duration-700 ease-in-out bg-red-500 hover:bg-red-400'>
                        Delete Post
                    </button>
                </div>
            </div>
            {
                isEditing
                    ? <div className='w-full h-auto'><PostForm savePostFunction={saveContent} pendingSave={isPendingSave} allCategories={categories} postData={post} modeEditing={isEditing} /></div>
                    : (
                        <article className='w-[90%] md:w-[80%] prose-p:text-justify text-black h-auto min-h-screen prose prose-h1:text-black prose-h1:text-3xl md:prose-h1:text-6xl prose-xl leading-10 prose-p:my-16 dark:prose-invert p-5 md:0'>
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </article>
                    )
            }
        </section>
    )
}