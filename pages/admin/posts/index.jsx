import React, { useEffect } from 'react'
import AdminPage from '../../../components/AdminPage'
import Link from 'next/link'
import axios from 'axios'

export default function Posts() {
    useEffect(()=>{
        axios.get("/api/posts")
        .then(posts=>{
            console.log(posts.data)
        })
    },[])
    return (
        <AdminPage>
            <h1>Posts</h1>
            <Link href="/admin/posts/create">Crear nueva publicación</Link>
        </AdminPage>
    )
}