import React from 'react'
import { motion } from 'framer-motion'
import { FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'

const CommentsList = ({ postComments, selectComment, deleteCommentFunction }) => {
    return (
        <>
            {
                postComments.map((comment, index) => (
                    <motion.div
                        key={comment.id}
                        className='relative w-full bg-slate-100 p-2 font-fgrotesque rounded-lg my-2 box-border'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1] }}
                        transition={{ duration: index / 5 }}
                        drag={false}
                        dragElastic={1}
                        dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
                    >
                        <button onClick={() => deleteCommentFunction(comment.id, comment.postname)} className='float-right p-1 w-[30px] h-[30px] flex justify-center items-center bg-red-600 rounded-sm '>
                            <FaTrashAlt />
                        </button>
                        <motion.button
                            className='w-full'
                            onClick={() => selectComment(comment)}
                        >
                            <div className=' w-full flex justify-between items-center'>
                                <div className=' w-full flex flex-row justify-between items-start'>
                                    <p className='font-semibold text-lg'><span className='font-bold'>By: </span>{comment.author.name}</p>
                                    <p className='font-semibold text-lg'><span className='font-bold'>Date: </span>{new Date(comment.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className='w-full flex flex-col items-start'>
                                <p className='text-xl font-semibold text-justify'><span className='font-bold'>Post Title: </span>{comment.postname}</p>
                                <p className='text-xl font-semibold h-[55px] line-clamp-2 text-justify overflow-hidden'><span className='font-bold'>Comment: </span>{comment.comment}</p>
                            </div>
                        </motion.button>
                    </motion.div>
                ))
            }
        </>
    )
}

export default CommentsList