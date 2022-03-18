import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import RegularPostsList from '../../components/RegularPostsList'
import Loader from '../../components/Loader'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Carousel from '../../components/Carousel'

export async function getServerSideProps(context) {
    const secure = context.req.connection.encrypted
    let postsRes
    if (context.query.name) {
        const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/search?name=${context.query.name}`
        postsRes = await axios.get(postUrl)
    } else if (context.query.category) {
        const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/search?category=${context.query.category}`
        postsRes = await axios.get(postUrl)
    } else if (context.query.highlights) {
        const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/highlights`
        postsRes = await axios.get(postUrl)
    } else if (context.query.page) {
        const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts?page=${context.query.page}`
        postsRes = await axios.get(postUrl)
    } else {
        const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts?page=1`
        postsRes = await axios.get(postUrl)
    }

    const highlightsUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/highlights`
    const highlightsRes = await axios.get(highlightsUrl)

    const categoryUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
    const categoriesRes = await axios.get(categoryUrl)

    return {
        props: {
            categories: categoriesRes.data,
            posts: postsRes.data,
            highlights: highlightsRes.data
        }
    }
}


const RegularPosts = ({ categories, posts, highlights }) => {
    const searchRef = useRef(null)
    const router = useRouter()
    const [maxPage, setMaxPage] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        let maxPage = []
        axios.get('/api/posts')
            .then(res => {
                res.data.forEach((post) => {
                    maxPage.push(post.page)
                })
                setMaxPage(Math.max(...maxPage))
            })
            .catch(error => console.error())
    }, [])

    const searchPost = () => {
        if (searchRef.current.value !== '') {
            router.push(`/posts?name=${searchRef.current.value}`)
            searchRef.current.value = ''
        } else {
            alert('Ingrese un texto a buscar')
        }
    }

    const getAllPosts = () => {
        router.push('/posts')
    }

    const getAllHighlights = () => {
        router.push('/posts?highlights=true')
    }

    const nextPage = () => {

    }

    const prevPage = () => {

    }

    const firstPage = () => {
        router.push('/posts?page=1')
    }

    const lastPage = () => {
        router.push(`/posts?page=${maxPage}`)
    }

    return (
        <section className='pt-[6rem] px-6 h-full min-h-screen flex flex-col items-center'>
            <div className='w-full flex py-5 justify-between items-center flex-col md:flex-row'>
                <h1 className='font-faudiowide text-2xl'>Posts</h1>
                <div className='flex justify-center items-center gap-9 flex-col md:flex-row w-full md:w-auto mt-3 md:mt-0'>
                    <button onClick={() => getAllPosts()} className='w-full h-10 rounded-lg md:w-28 font-fgrotesque text-xl font-bold bg-slate-100'>Search All</button>
                    <button onClick={() => getAllHighlights()} className='w-full h-10 rounded-lg md:w-28 font-fgrotesque text-xl font-bold bg-slate-100'>Highlights</button>
                    <div className='flex gap-2 mt-3 md:mt-0'>
                        <input ref={searchRef} type='text' className='w-[300px] text-center rounded-md px-2 outline-none border-none shadow-inner shadow-slate-500' />
                        <button onClick={() => searchPost()} className='h-10 p-2 rounded-md flex justify-center items-center bg-white shadow-inner shadow-slate-500'><FaSearch size={20} /></button>
                    </div>
                </div>
            </div>
            <div className='w-full h-[300px] md:h-[400px] bg-slate-500'>
                <Carousel highlightsPosts={highlights} autoPlay={true} />
            </div>
            <div className='flex flex-col md:flex-row w-full h-full my-6 gap-16'>
                <div className=' h-auto w-full md:h-full md:w-[20%] p-2 bg-slate-100'>
                    <h1 className='font-faudiowide text-lg py-2 px-2 border-b-2 border-purple-600'>Categories</h1>
                    <div className='w-full h-auto flex flex-col gap-2 mt-2 box-border'>
                        {
                            categories
                                ? (
                                    categories.map((category) => {
                                        return (
                                            <Link key={category.id} href={`/posts?category=${category.name}`} passHref>
                                                <a>
                                                    <p className='w-auto h-[40px] p-2 hover:bg-slate-200 font-fgrotesque text-lg font-semibold text-black flex jus items-center'>{category.name}</p>
                                                </a>
                                            </Link>
                                        )
                                    })
                                )
                                : <Loader />
                        }
                    </div>

                </div>
                <div className='h-auto w-full  md:h-full  md:w-[75%] flex flex-col gap-5 border-t-4 md:border-t-0 md:border-r-4 border-purple-600 mt-7 md:mt-0 pt-2 md:pt-0'>
                    {
                        posts
                            ? <RegularPostsList listOfPosts={posts} />
                            : <Loader />
                    }
                    <div className='w-full h-[70px] flex gap-4 items-center justify-center font-fgrotesque font-bold'>
                        <button onClick={()=>firstPage()} className='py-1 px-2 bg-slate-50 rounded-md font-bold'><span className='text-xl'>&#171;</span> first</button>
                        <button className='py-1 px-4 bg-slate-50 rounded-md text-xl font-bold'>&#8249;</button>
                        {
                           maxPage && <p>{`${currentPage}-${maxPage}`}</p>
                        }
                        <button className='py-1 px-4 bg-slate-50 rounded-md text-xl font-bold'>&#8250;</button>
                        <button onClick={()=>lastPage()} className='py-1 px-2 bg-slate-50 rounded-md font-bold'>last <span className='text-xl'>&#187;</span></button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegularPosts