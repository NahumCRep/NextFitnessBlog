import React from 'react'
import { motion } from 'framer-motion'
import { FaTrashAlt } from 'react-icons/fa'

const CommentsList = ({postComments , selectComment}) => {
    return (
        <>
         {
         postComments.map((comment, index) => (
            <motion.button
                key={comment.id}
                className='w-[90%]  md:w-[450px] h-[160px] bg-slate-100 p-2 font-fgrotesque rounded-lg my-2 box-border'
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1] }}
                transition={{ duration: index / 5 }}
                drag={false}
                dragElastic={1}
                dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
                onClick={() => selectComment(comment)}
            >
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col items-start'>
                        <p className='font-semibold text-lg'><span className='font-bold'>By: </span>{comment.author.name}</p>
                        <p className='font-semibold text-lg'><span className='font-bold'>Date: </span>{new Date(comment.date).toLocaleDateString()}</p>
                    </div>
                    <button className='p-1 w-[30px] h-[30px] flex justify-center items-center bg-red-600 rounded-sm '><FaTrashAlt /></button>
                </div>
                <div className='w-full flex flex-col items-start'>
                    <p className='text-xl font-semibold'><span className='font-bold'>Post Title: </span>{comment.postname}</p>
                    <p className='text-xl font-semibold h-[55px] line-clamp-2 text-justify overflow-hidden'><span className='font-bold'>Comment: </span>{comment.comment}</p>
                </div>
            </motion.button>
            ))
        }
        </>
    )
}

export default CommentsList