import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import '@uiw/react-markdown-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import Loader from './Loader'



const MarkDownEditor = dynamic(
    () => import("@uiw/react-markdown-editor").then((mod) => mod.default), {
    ssr: false
}
)

const PostForm = ({ savePostFunction, pendingSave, allCategories, postData, modeEditing }) => {
    const [content, setContent] = useState("")
    const titulo = useRef()
    const image = useRef()
    const category = useRef()
    const description = useRef()
    const highlight = useRef()

    const sendPostToSave = () => {
        savePostFunction(
            titulo.current.value,
            image.current.value,
            category.current.value,
            highlight.current.checked,
            description.current.value,
            content)
    }

    useEffect(()=>{
        if(postData){
            titulo.current.value = postData.title
            image.current.value = postData.image
            category.current.value = postData.category
            highlight.current.checked = postData.highlight
            description.current.value = postData.description
            setContent(postData.content)
        }
    },[modeEditing])

    return (
        <div className='p-7 h-auto'>
            <div>
                <div className='flex gap-11'>
                    <div className='flex flex-col md:w-[15%]'>
                        <h1 className='font-fgrotesque text-2xl font-bold'>Post Category</h1>
                        <select ref={category} className='w-full  h-10 mt-3 font-fgrotesque text-lg font-bold py-2 px-4 cursor-pointer rounded-md flex justify-center items-center bg-white shadow-inner shadow-slate-500 outline-none border-none'>
                            {
                                allCategories.map((categ) => {
                                    return (
                                        <option key={categ.id}>{categ.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col md:w-[10%] justify-center items-center'>
                        <h1 className='font-fgrotesque text-2xl font-bold'>Highlight</h1>
                        <input ref={highlight} className='h-10 w-10 mt-3 rounded-md bg-white shadow-inner shadow-slate-500 outline-none border-none' type='checkbox' />
                    </div>
                </div>
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
                        pendingSave && <Loader />
                    }
                </div>
                <button onClick={sendPostToSave} className='w-full md:w-auto bg-green-500 hover:bg-green-400 font-fgrotesque font-semibold text-2xl tracking-wider text-black px-5 py-2 rounded-md mt-10 mb-10 float-right'>Save Post</button>
            </div>
        </div>
    )
}

export default PostForm