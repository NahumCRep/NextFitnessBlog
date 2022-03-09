import React, { useRef, useState } from 'react'
import AdminPage from '../../../components/AdminPage'
import dynamic from 'next/dynamic'
import '@uiw/react-markdown-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import Loader from '../../../components/Loader'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const MarkDownEditor = dynamic(
    () => import("@uiw/react-markdown-editor").then((mod) => mod.default), {
    ssr: false
}
)


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
    const [content, setContent] = useState("")
    const [isPendingSave, setIsPendingSave] = useState(false)
    const titulo = useRef()
    const image = useRef()
    const category = useRef()

    const saveContent = () => {
        // console.log(content)
        // console.log(category.current.value)
        setIsPendingSave(true)
        axios.post("/api/posts/create", {
            title: titulo.current.value,
            author: session.user,
            image: image.current.value,
            category: category.current.value,
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
            <div className='p-7 h-screen'>
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
            </div>

        </AdminPage>
    )
}

export default Create