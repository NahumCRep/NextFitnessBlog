import axios from 'axios'
import {useRef, useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import RectanglePostsList from '../../components/RectanglePostsList'
import Loader from '../../components/Loader'
import Link from 'next/link'
import { useRouter } from 'next/router'

export async function getServerSideProps(context){
    const secure = context.req.connection.encrypted
    let postsRes
    if(context.query.name){
        const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/search?name=${context.query.name}`
        postsRes = await axios.get(postUrl)
    }else if(context.query.category){
        const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/search?category=${context.query.category}`
        postsRes = await axios.get(postUrl)
    }else if(context.query.highlights){
        const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/highlights`
        postsRes = await axios.get(postUrl)
    }else{
        const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts`
        postsRes = await axios.get(postUrl)
    }

    const categoryUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
    const categoriesRes = await axios.get(categoryUrl)
 
    return{
        props:{
            posts: postsRes.data,
            categories: categoriesRes.data
        }
    }
}


const RegularPosts = ({posts, categories}) => {
    const searchRef = useRef(null)
    const router = useRouter()

    const searchPost = () => {
        if (searchRef.current.value !== '') {
            router.push(`/posts?name=${searchRef.current.value}`)
            searchRef.current.value = ''
        } else {
            alert('Ingrese un texto a buscar')
        }
    }

    const getAllPosts = () =>{
        router.push('/posts')
    }

    const getAllHighlights = () =>{
        router.push('/posts?highlights=true')
    }

    return (
        <section className='pt-[6rem] px-6 h-full min-h-screen flex flex-col items-center'>
            <div className='w-full flex py-5 justify-between items-center flex-col md:flex-row'>
                <h1 className='font-faudiowide text-2xl'>Posts</h1>
                <div className='flex justify-center items-center gap-9 flex-col md:flex-row w-full md:w-auto mt-3 md:mt-0'>
                    <button onClick={()=>getAllPosts()} className='w-full h-10 rounded-lg md:w-28 font-fgrotesque text-xl font-bold bg-slate-100'>Search All</button>
                    <button onClick={()=>getAllHighlights()} className='w-full h-10 rounded-lg md:w-28 font-fgrotesque text-xl font-bold bg-slate-100'>Highlights</button>
                    <div className='flex gap-2 mt-3 md:mt-0'>
                        <input ref={searchRef} type='text' className='w-[300px] text-center rounded-md px-2 outline-none border-none shadow-inner shadow-slate-500' />
                        <button onClick={() => searchPost()} className='h-10 p-2 rounded-md flex justify-center items-center bg-white shadow-inner shadow-slate-500'><FaSearch size={20} /></button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col-reverse md:flex-row w-full h-full my-6'>
                <div className='h-auto w-full  md:h-full  md:w-[70%] flex flex-col gap-5 border-t-4 md:border-t-0 md:border-r-4 border-purple-600 mt-7 md:mt-0 pt-2 md:pt-0'>
                    {
                          posts
                          ? <RectanglePostsList listOfPosts={posts} />
                          : <Loader />
                    }
                </div>
                <div className=' h-auto w-full md:h-full md:w-[30%] px-2 '>
                    <div className='w-full h-auto'>
                        <h1 className='font-faudiowide text-lg'>Categories</h1>
                        <div className='w-full h-auto flex justify-start flex-wrap gap-2 mt-4 py-2 box-border'>
                            {
                                categories
                                ? (
                                    categories.map((category)=>{
                                        return(
                                            <Link key={category.id} href={`/posts?category=${category.name}`} passHref>
                                                <a>
                                                    <p className='w-auto h-[40px] p-2 bg-purple-600 font-fgrotesque text-lg font-semibold text-gray-100 rounded-lg flex jus items-center'>{category.name}</p>
                                                </a>
                                            </Link>
                                        )
                                    })
                                )
                                : <Loader />
                            }       
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegularPosts