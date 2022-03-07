import React from 'react'
import { motion } from 'framer-motion'

const CategoryModal = ({ categorySelected, selectCategory }) => {
    
    const closeModal = (e) => {
        if(e.currentTarget === e.target) {
            selectCategory(null)
          }
    }

    return (
        <div className='fixed top-0 h-screen w-screen bg-black bg-opacity-10'>
            <div className='flex h-screen' onClick={e => closeModal(e)}>
                <motion.div
                    animate={{ scale: [0.7, 1.5, 1] }}
                    exit={{ scale: 0 }}
                    className='m-auto bg-white rounded-lg shadow-lg px-14 pt-5 pb-10'
                >
                    <h1>{categorySelected.name}</h1>
                </motion.div>
            </div>
        </div>
    )
}

export default CategoryModal