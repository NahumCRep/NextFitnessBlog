import React, { useRef, useState } from 'react'
import AdminPage from '../../../components/AdminPage'
// import dynamic from 'next/dynamic'
// import '@uiw/react-markdown-editor/markdown-editor.css'
// import '@uiw/react-markdown-preview/markdown.css'
// import Loader from '../../../components/Loader'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import PostForm from '../../../components/PostForm'

// const MarkDownEditor = dynamic(
//     () => import("@uiw/react-markdown-editor").then((mod) => mod.default), {
//     ssr: false
// }
// )


export async function getServerSideProps(context) {
    const secure = context.req.connection.encrypted
    const url = `${secure ? "https" : "http"}://${context.req.headers.host}/api/categories`
    const res = await axios.get(url)

    return {
        props: {
            categories: res.data
        }
    }
}



const Create = ({ categories }) => {
    const router = useRouter()
    const { data: session } = useSession()
    // const [content, setContent] = useState("")
    const [isPendingSave, setIsPendingSave] = useState(false)
    // const titulo = useRef()
    // const image = useRef()
    // const category = useRef()
    // const description = useRef()

    // const saveContent = () => {
    //     setIsPendingSave(true)
    //     if(!image.current.value.startsWith('http://') || image.current.value.startsWith('https://')){
    //         image.current.value = 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
    //     }
    //     axios.post("/api/posts/create", {
    //         title: titulo.current.value,
    //         author: session.user,
    //         image: image.current.value,
    //         category: category.current.value,
    //         description: description.current.value,
    //         date: new Date(),
    //         content,
    //     }).then(res => {
    //         setIsPendingSave(false)
    //         router.replace("/admin/posts")
    //     })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
    const saveContent = (postTitle, postImage, postCategory, postHighlight, postDescription, content) => {
        setIsPendingSave(true)
        // if(!postImage.startsWith('http://') || postImage.startsWith('https://')){
        //     postImage = 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
        // }
        axios.post("/api/posts/create", {
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
        <AdminPage>
            {/* <div className='p-7 h-auto'>
                <div>
                    <h1 className='font-fgrotesque text-2xl font-bold'>Post Category</h1>
                    <select ref={category} className='w-full md:w-[15%] h-10 mt-3 font-fgrotesque text-lg font-bold py-2 px-4 cursor-pointer rounded-md flex justify-center items-center bg-white shadow-inner shadow-slate-500 outline-none border-none'>
                        {
                            categories.map((categ) => {
                                return (
                                    <option key={categ.id}>{categ.name}</option>
                                )
                            })
                        }
                    </select>
                    <h1 className='font-fgrotesque text-2xl font-bold mt-4'>Post Title</h1>
                    <input className='text-black font-fgrotesque text-lg font-bold w-full md:w-[70%] mt-3 h-10 px-4 py-1 rounded-md flex justify-center items-center bg-white shadow-inner shadow-slate-500 outline-none border-none' type="text" ref={titulo} placeholder="Titulo de la publicación"></input>
                    <h1 className='font-fgrotesque text-2xl font-bold mt-4'>Post Image URL</h1>
                    <input className='text-black font-fgrotesque text-lg font-bold w-full md:w-[70%] h-10 mt-3 px-4 py-1 rounded-md flex justify-center items-center bg-white shadow-inner shadow-slate-500 outline-none border-none' type="text" ref={image} placeholder="Imagen de la publicación"></input>
                    <h1 className='font-fgrotesque text-2xl font-bold mt-4'>Post Description</h1>
                    <textarea className='text-black font-fgrotesque text-lg font-bold w-full md:w-[70%] h-28 resize-none  mt-3 px-4 py-1 rounded-md flex justify-center items-center bg-white shadow-inner shadow-slate-500 outline-none border-none' type="text" ref={description} />
                </div>
                <MarkDownEditor
                    value={content}
                    onChange={(editor, data, value) => {
                        setContent(value)
                    }}
                    style={{ height: '100%' }}
                    className='h-full mt-5'
                />
                <div className='flex items-center'>
                    <div className='w-[87%]'>
                        {
                            isPendingSave && <Loader />
                        }
                    </div>
                    <button className='bg-green-500 hover:bg-green-400 font-fgrotesque font-semibold text-2xl tracking-wider text-black px-5 py-2 rounded-md mt-10 mb-10 float-right' onClick={saveContent}>Save Post</button>
                </div>
            </div> */}
            <PostForm savePostFunction={saveContent} pendingSave={isPendingSave} allCategories={categories} />

        </AdminPage>
    )
}

export default Create