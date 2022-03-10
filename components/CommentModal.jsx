import React from 'react'
import { motion } from 'framer-motion'
import { FaRegCommentDots, FaTimes } from 'react-icons/fa'

const CommentModal = ({commentSelected, selectComment, selectedComment}) => {
    const closeModal = (e) => {
        if (e.currentTarget === e.target) {
            selectComment(null)
        }
    }

    return (
        <div className='fixed top-0 h-screen w-screen bg-black bg-opacity-10'>
            <div className='flex h-screen' onClick={e => closeModal(e)}>
                <motion.div
                    animate={{ scale: [0.7, 1.5, 1] }}
                    exit={{ scale: 0 }}
                    className={`m-auto bg-white rounded-lg shadow-lg p-6 w-[80%] md:w-[60%] h-auto  `}
                >
                    <div className='flex justify-between'>
                        <FaRegCommentDots color='#7e22ce' size={25} />
                        <motion.button onClick={() => selectComment(null)}><FaTimes size={25} /></motion.button>
                    </div>
                    <p className='w-full mt-2'>
                        {commentSelected.comment}
                    </p>
                    
                </motion.div>
            </div>
        </div>
    )
}

export default CommentModal