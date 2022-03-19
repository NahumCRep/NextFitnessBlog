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

    const postUrl = `${secure ? "https" : "http"}://${context.req.headers.host}/api/datalog/posts_amount`
    const postAmount = await axios.get(postUrl)

    return {
        props: {
            categories: res.data,
            quantity: postAmount.data
        }
    }
}

const Create = ({ categories, quantity }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [isPendingSave, setIsPendingSave] = useState(false)

    const setPageNumber = () => {
        if(quantity === 0 || quantity < 10){
            return 1
        }else{
            if(quantity % 10 === 0){
                return (quantity / 10) + 1 
            }else{
                return (Math.trunc(quantity / 10)) + 1
            }
        }
    }

    const saveContent = (postTitle, postImage, postCategory, postHighlight, postDescription, content) => {
        setIsPendingSave(true)
        let pageNumber = setPageNumber()
        axios.post("/api/posts/create", {
            title: postTitle,
            author: session.user,
            image: postImage,
            category: postCategory,
            highlight: postHighlight,
            description: postDescription,
            date: new Date(),
            content,
            page: pageNumber,
            likes:[],
            dislikes:[]
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