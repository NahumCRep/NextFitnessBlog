import React, { useState } from 'react'
import AdminPage from '../../../components/AdminPage'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import PostForm from '../../../components/PostForm'


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
    const [isPendingSave, setIsPendingSave] = useState(false)

    const saveContent = (postTitle, postImage, postCategory, postHighlight, postDescription, content) => {
        setIsPendingSave(true)
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
            <PostForm savePostFunction={saveContent} pendingSave={isPendingSave} allCategories={categories} />
        </AdminPage>
    )
}

export default Create