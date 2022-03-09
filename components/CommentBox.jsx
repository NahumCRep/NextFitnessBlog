import React from 'react'
import Image from 'next/image'

const CommentBox = ({ commentsList }) => {
    console.log(commentsList)
    return (
        <div className='w-full h-auto flex flex-col gap-2'>
            {
                commentsList == ''
                    ? <p className='font-fgrotesque text-xl font-bold w-full text-center'>0 comments</p>
                    : (
                        commentsList.map((comment) => {
                            return (
                                <div className='bg-fuchsia-200 w-full h-auto font-fgrotesque p-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center flex-row gap-2'>
                                            <div className='relative w-[2rem] h-[2rem] flex items-center'>
                                                {
                                                    comment.author.image
                                                        ? <Image className='rounded-full' src={comment.author.image} alt='profile pic' layout='fill' />
                                                        : <FaUserCircle size={25} />
                                                }
                                            </div>
                                            <span className='text-lg md:text-xl font-bold '>{comment.author.name} {comment.author.role == 'admin' ? '(Admin)':''}</span>
                                        </div>
                                        <span className='font-semibold'>{new Date(comment.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className='mt-3 px-9 font-bold'>
                                        {comment.comment}
                                    </p>
                                </div>
                            )
                        })
                    )
            }
        </div>
    )
}

export default CommentBox