import axios from 'axios'
import React, { useRef, useState } from 'react'
import Router, { useRouter } from 'next/router'
import ReactMarkdown from "react-markdown"
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import { useSession } from "next-auth/react"
import Loader from '../../components/Loader'
import CommentBox from '../../components/CommentBox'

export async function getServerSideProps(context) {
    const secure = context.req.connection.encrypted
    const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/${context.params.id}`
    const postRes = await axios.get(postUrl)

    const commentUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/comments/${context.params.id}`
    const commentRes = await axios.get(commentUrl)

    return {
        props: {
            post: postRes.data,
            comments: commentRes.data
        }
    }
}

const RegularPost = ({ post, comments }) => {
    const { data: session } = useSession()
    const commentRef = useRef(null)
    const [isPendingSave, setIsPendingSave] = useState(false)

    const saveComment = () => {
        setIsPendingSave(true)
        axios.post("/api/posts/comments", {
            post: post.id,
            author: session.user,
            comment: commentRef.current.value,
            date: new Date()
        }).then(res => {
            commentRef.current.value = ''
            setIsPendingSave(false)
        })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <section className='w-full h-auto mt-[5rem] bg-gray-100 flex flex-col gap-8 items-center'>
            <div className='w-[90%] md:w-[70%]'>
                <div className='flex justify-between w-full  h-20 items-center px-5 pt-8'>
                    <Link href='/posts' passHref>
                        <a>
                            <button className='transition-transform duration-700 ease-in-out hover:-translate-x-1'><FaArrowLeft color='#7e22ce' size={25} /></button>
                        </a>
                    </Link>
                    <div className='flex gap-2'>
                        <button className='w-28 h-11 rounded-md font-fgrotesque text-xl font-semibold transition-color duration-700 ease-in-out bg-blue-400 hover:bg-blue-300'>Save Post</button>
                    </div>
                </div>
                <article className='w-[90%] md:w-full h-auto min-h-screen prose prose-xl leading-10 prose-p:my-16 prose-invert p-5 md:0'>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </article>
            </div>

            <div className='w-[90%] md:w-[70%] h-auto border-t-4 border-fuchsia-600'>
                <h1 className='font-faudiowide text-xl p-5'>Comments</h1>
                <div className='h-[150px]'>
                    {
                        !session
                            ? <p className='w-full text-center font-fgrotesque text-lg font-bold'>Login to Comment</p>
                            : (
                                <div>
                                    <textarea ref={commentRef} className='text-black font-fgrotesque text-lg font-bold w-full md:w-full h-20 resize-none  mt-3 px-4 py-1 rounded-md flex justify-center items-center bg-white shadow-inner shadow-slate-500 outline-none border-none' type="text" />
                                    <button onClick={()=>saveComment()} className='h-12 w-20 transit duration-1000 ease-in-out bg-fuchsia-600 hover:bg-fuchsia-500 rounded-lg font-fgrotesque text-lg font-semibold mt-3 float-right'>accept</button>
                                </div>
                            )
                    }
                </div>
                <div className='mt-4 w-full h-auto mb-4'>
                    {
                        comments
                            ? <CommentBox commentsList={comments} />
                            : <Loader />
                    }
                </div>
            </div>
        </section>
    )
}

export default RegularPost