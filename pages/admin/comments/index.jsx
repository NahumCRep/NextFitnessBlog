import React, { useState, useRef, useEffect } from 'react'
import AdminPage from '../../../components/AdminPage'
import axios from 'axios'
import Loader from '../../../components/Loader'
import { FaRegCommentDots } from 'react-icons/fa'
import CommentsList from '../../../components/CommentsList'
import CommentModal from '../../../components/CommentModal'
import { AnimatePresence } from 'framer-motion'

export async function getServerSideProps(context) {
  const secure = context.req.connection.encrypted
  const url = `${secure ? "https" : "http"}://${context.req.headers.host}/api/posts/comments/getall`
  const res = await axios.get(url)

  return {
    props: {
      comments: res.data
    }
  }
}


const AdminComments = ({ comments }) => {
  const [isError, setIsError] = useState(false)
  const [allComments, setAllComments] = useState(comments)
  const [selectedComment, setSelectedComment] = useState(null)
  const postRef = useRef(null)

  const axiosGetAllComments = (commentValue) => {
    axios.get(`/api/posts/comments/getall?post=${commentValue}`).then(res => {
      postRef.current.value = ''
      setAllComments(res.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const getAllPostComments = (commentPost) => {
    if (commentPost == undefined) {
      if (postRef.current.value == '') {
        setIsError(true)
      } else {
        setIsError(false)
        axiosGetAllComments(postRef.current.value)
      }
    } else {
      axiosGetAllComments(commentPost)
    }
  }

  const getAllComments = () => {
    axios.get(`/api/posts/comments/getall`).then(res => {
      postRef.current.value = ''
      setIsError(false)
      setAllComments(res.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const deleteComment = (commentID, commentPostName) => {
    axios.post("/api/posts/comments/delete", { data: { commentID } })
      .then(res => {
        getAllPostComments(commentPostName)
      }).catch(error => {
        console.log(error)
      })
  }



  return (
    <AdminPage>
      <section className='w-full h-auto min-h-screen flex flex-col md:flex-row'>
        <div className='w-full h-60 md:h-full md:w-[25%]'>
          <div className='flex flex-col px-5 pt-8 gap-3'>
            <label className='font-fgrotesque font-bold text-xl tracking-widest' htmlFor='category'><FaRegCommentDots color='#7e22ce' size={25} />Search Post Comments</label>
            <input className='h-8 outline-none border-none px-2 font-fgrotesque font-semibold text-lg rounded-md shadow-inner shadow-slate-500' ref={postRef} type='text' name="category" />
            {isError && (<p className='text-red-500 font-fgrotesque font-bold text-lg'>ingrese el titulo del post</p>)}
            <button onClick={() => getAllPostComments()} className='bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors duration-500 ease-in-out font-fgrotesque text-xl font-bold flex items-center justify-center gap-2 p-2'>Search</button>
            <button onClick={() => getAllComments()} className='bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors duration-500 ease-in-out font-fgrotesque text-xl font-bold flex items-center justify-center gap-2 p-2'>Show All</button>
          </div>
        </div>
        <div className='md:w-[75%] h-auto grid grid-cols-1 md:grid-cols-2 gap-2 p-2 justify-items-center mt-4 box-border'>
          {
            allComments
              ? (
                allComments == ''
                  ? <p>no comments</p>
                  : <CommentsList postComments={allComments} selectComment={setSelectedComment} deleteCommentFunction={deleteComment} />
              )
              : <Loader />
          }
        </div>
        <AnimatePresence>
          {selectedComment &&
            <CommentModal
              commentSelected={selectedComment}
              selectComment={setSelectedComment}
            />
          }
        </AnimatePresence>
      </section>
    </AdminPage>
  )
}

export default AdminComments