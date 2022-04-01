import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from "react-markdown"
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
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
    const [allPostComments, setAllPostComments] = useState(comments)
    const [postRate, setPostRate] = useState({
        likes: post.likes.length,
        dislikes: post.dislikes.length,
        userRated: ""
    })

    useEffect(() => {
        if (session) {
            if (post.likes.length > 0 || post.dislikes.length > 0) {
                if (post.likes.includes(session.user.id)) {
                    setPostRate({
                        ...postRate,
                        userRated: "like"
                    })
                } else if (post.dislikes.includes(session.user.id)) {
                    setPostRate({
                        ...postRate,
                        userRated: "dislike"
                    })
                }
                else {
                    setPostRate({
                        ...postRate,
                        userRated: ""
                    })
                }
            }
        }
    }, [])

    const getAllPostComments = () => {
        axios.get(`/api/posts/comments/${post.id}`).then(res => {
            setAllPostComments(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const saveComment = () => {
        axios.post("/api/posts/comments", {
            post: post.id,
            postname: post.title,
            author: session.user,
            comment: commentRef.current.value,
            date: new Date()
        }).then(res => {
            commentRef.current.value = ''
            getAllPostComments()
        })
            .catch(error => {
                console.log(error)
            })
    }

    const likePost = () => {
        if (session) {
            let replace = null
            postRate.userRated == 'like' || postRate.userRated == 'dislike'
                ? replace = true
                : replace = false

            axios.post('/api/posts/likes', {
                option: 'like',
                post: post.id,
                user: session.user.id,
                replace
            }).then(res => {
                if (postRate.userRated == '') {
                    setPostRate({
                        ...postRate,
                        likes: postRate.likes + 1,
                        userRated: 'like'
                    })
                } else if (postRate.userRated == 'dislike') {
                    setPostRate({
                        dislikes: postRate.dislikes - 1,
                        likes: postRate.likes + 1,
                        userRated: 'like'
                    })
                }
            }).catch(error => console.log(error))
        } else {
            alert('please login to rate')
        }
    }

    const dislikePost = () => {
        if (session) {
            let replace = null
            postRate.userRated == 'like' || postRate.userRated == 'dislike'
                ? replace = true
                : replace = false

            axios.post('/api/posts/likes', {
                option: 'dislike',
                post: post.id,
                user: session.user.id,
                replace
            }).then(res => {
                if (postRate.userRated == '') {
                    setPostRate({
                        ...postRate,
                        dislikes: postRate.dislikes + 1,
                        userRated: 'dislike'
                    })
                } else if (postRate.userRated == 'like') {
                    setPostRate({
                        likes: postRate.likes - 1,
                        dislikes: postRate.dislikes + 1,
                        userRated: 'dislike'
                    })
                }
            }).catch(error => console.log(error))
        }else {
            alert('please login to rate')
        }
    }

    return (
        <section className='w-full h-auto mt-[5rem] bg-gray-100 flex flex-col gap-8 items-center'>
            <div className='w-[90%] md:w-[70%]'>
                <div className='flex justify-start w-full h-20 items-center px-5 pt-8'>
                    <Link href='/posts' passHref>
                        <a>
                            <button className='transition-transform duration-700 ease-in-out hover:-translate-x-1'><FaArrowLeft color='#7e22ce' size={25} /></button>
                        </a>
                    </Link>
                </div>
            </div>
            <div className='bg-purple-500 w-[80%] md:w-[50%] py-2 px-4 flex justify-between items-center font-fgrotesque font-bold'>
                <p>{post.category}</p>
                <p>{new Date(post.date).toLocaleDateString()}</p>
            </div>
            <article className='w-[90%] md:w-[100%] prose-p:text-justify text-black h-auto min-h-screen prose prose-h1:text-black prose-h1:text-3xl md:prose-h1:text-6xl prose-lg md:prose-xl leading-10 prose-p:my-16 dark:prose-invert p-5 md:0'>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
            <div className='w-[90%] md:w-[70%] h-11 p-5 flex justify-between items-center font-fgrotesque font-bold'>
                <p className='text-lg  '>By: {post.author.name}</p>
                <div className='flex gap-6 items-center'>
                    <p>Do you like it?</p>
                    <div className='flex items-center gap-3'>
                        <p>{postRate.likes}</p>
                        <button onClick={() => likePost()} className={`hover:text-slate-500  ${postRate.userRated == 'like' && 'text-purple-600'}`} ><AiFillLike size={25} /></button>
                    </div>
                    <div className='flex items-center gap-3'>
                        <p>{postRate.dislikes}</p>
                        <button onClick={() => dislikePost()} className={`pt-2 hover:text-slate-500 ${postRate.userRated == 'dislike' && 'text-purple-600'}`}><AiFillDislike size={25} /></button>
                    </div>
                </div>
            </div>
            <div className='w-[90%] md:w-[70%] h-auto border-t-4 border-purple-600'>
                <h1 className='font-faudiowide text-xl p-5'>Comments</h1>
                <div className='h-[150px]'>
                    {
                        !session
                            ? <p className='w-full text-center font-fgrotesque text-lg font-bold'>Login to Comment</p>
                            : (
                                <div>
                                    <textarea ref={commentRef} className='text-black font-fgrotesque text-lg font-bold w-full md:w-full h-20 resize-none  mt-3 px-4 py-1 rounded-md flex justify-center items-center bg-white shadow-inner shadow-slate-500 outline-none border-none' type="text" />
                                    <button onClick={() => saveComment()} className='h-12 w-48 transit duration-1000 ease-in-out bg-purple-600 hover:bg-purple-500 rounded-lg font-fgrotesque text-lg font-semibold mt-3 float-right'>accept</button>
                                </div>
                            )
                    }
                </div>
                <div className='mt-4 w-full h-auto mb-4'>
                    {
                        allPostComments
                            ? <CommentBox commentsList={allPostComments} />
                            : <Loader />
                    }
                </div>
            </div>
        </section>
    )
}

export default RegularPost