import React from 'react'
import AdminPage from '../../components/AdminPage'
import Image from 'next/image'
import { useSession, signOut } from "next-auth/react"
import Loader from '../../components/Loader'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { BsFilePost } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import { FaUsers, FaRegCommentDots } from 'react-icons/fa'
import axios from 'axios'
import LogCard from '../../components/LogCard'

export async function getServerSideProps(context) {
    const secure = context.req.connection.encrypted
    const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/datalog/posts_amount`
    const postAmount = await axios.get(postUrl)
    // console.log(postAmount.data)
    const categoryUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/datalog/categories_amount`
    const categoryAmount = await axios.get(categoryUrl)
    // console.log(categoryAmount.data)
    const userUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/datalog/users_amount`
    const userAmount = await axios.get(userUrl)
    // console.log(userAmount.data)
    return {
        props: {
            posts: postAmount.data,
            categories: categoryAmount.data,
            users: userAmount.data
        }
    }
}

const Admin = ({ posts, categories, users }) => {
    const { data: session } = useSession()
    return (
        <AdminPage>
            <section className='h-auto md:h-screen flex flex-col md:flex-row'>
                <div className='md:w-[20%] h-full flex flex-col items-start shadow-md shadow-black'>
                    <div className='flex flex-col items-start p-4'>
                        {
                            session
                                ? (
                                    <>
                                        <div className='relative w-20 h-20'>
                                            <Image className='rounded-full' src={session.user.image} alt='profile picture' layout='fill' />
                                        </div>
                                        <p className='font-fgrotesque font-semibold text-xl mt-4' >{session.user.name}</p>
                                        <p className='font-fgrotesque font-semibold text-xl' >{session.user.email}</p>
                                    </>
                                )
                                : <Loader />
                        }
                    </div>
                    <div className='h-full w-full flex items-end p-4'>
                        <button onClick={() => signOut({ callbackUrl: '/' })} className='w-full h-10 flex gap-2 items-center justify-center bg-green-500 font-fgrotesque font-bold text-xl'>Logout <RiLogoutBoxLine /></button>
                    </div>
                </div>
                <div className='flex justify-center w-full'>
                    <div className='w-full h-auto p-5 grid gap-4 grid-cols-auto-fit justify-items-center'>
                        <LogCard name={'Users'} amount={users} >
                            <FaUsers color='#7e22ce' size={40} />
                        </LogCard>
                        <LogCard name={'Categories'} amount={categories} >
                            <BiCategory color='#7e22ce' size={40} />
                        </LogCard>
                        <LogCard name={'Posts'} amount={posts} >
                            <BsFilePost color='#7e22ce' size={40} />
                        </LogCard>
                        <LogCard name={'Comments'} amount={'falta'} >
                            <FaRegCommentDots color='#7e22ce' size={40} />
                        </LogCard>
                    </div>
                </div>
            </section>
        </AdminPage>
    )
}

export default Admin