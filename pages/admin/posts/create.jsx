import React, { useRef, useState } from 'react'
import AdminPage from '../../../components/AdminPage'
import dynamic from 'next/dynamic'
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css'

import axios from 'axios'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const MarkDownEditor = dynamic(
    ()=>import("@uiw/react-markdown-editor").then((mod)=>mod.default),{
        ssr:false
    }
)

export default function Create() {
    const router = useRouter()
    const {data:session} = useSession()
    const [content,setContent] = useState("")

    const titulo = useRef()
    const image = useRef()

    const saveContent = () =>{
        console.log(content)
        axios.post("/api/posts/create",{
            title:titulo.current.value,
            author:session.user,
            image:image.current.value,
            date: new Date(),
            content,
        }).then(res=>{
            router.replace("/admin/posts")
        })
        .catch(error=>{
            console.log(error)
        })
    }

  return (
    <AdminPage>

        <div className='p-7'>
            <input className='text-black' type="text" ref={titulo} placeholder="Titulo de la publicación"></input>
            <input className='text-black' type="text" ref={image} placeholder="Imagen de la publicación"></input>
            <MarkDownEditor
                value={content}
                onChange={(editor,data,value)=>{
                    setContent(value)
                }}
            />
            <button className='bg-yellow-200 text-black px-5 py-2 rounded-md mt-10' onClick={saveContent}>Guardar</button>
        </div>

    </AdminPage>
  )
}