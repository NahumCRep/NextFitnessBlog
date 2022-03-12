import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { BiCategory } from 'react-icons/bi'
import { FaTimes, FaTrashAlt, FaEdit } from 'react-icons/fa'
import axios from 'axios'

const CategoryModal = ({ categorySelected, selectCategory, refreshingData }) => {
    const [isEditing, setisEditing] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const nameRef = useRef(null)

    const closeModal = (e) => {
        if (e.currentTarget === e.target) {
            selectCategory(null)
        }
    }

    const editCategory = () => {
        if (nameRef.current.value == '') {
            setIsEmpty(true)
        } else {
            setIsEmpty(false)
            axios.put("/api/categories", {
                ...categorySelected,
                name: nameRef.current.value
            }).then(res => {
                selectCategory(null)
                refreshingData(true)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const deleteCategory = () => {
        axios.delete("/api/categories", { data: { categorySelected } }).then(res => {
            selectCategory(null)
            refreshingData(true)
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <div className='fixed top-0 h-screen w-screen bg-black bg-opacity-10'>
            <div className='flex h-screen' onClick={e => closeModal(e)}>
                <motion.div
                    animate={{ scale: [0.7, 1.5, 1] }}
                    exit={{ scale: 0 }}
                    className={`m-auto bg-white rounded-lg shadow-lg p-6 w-[270px] ${isEmpty ? 'h-[190px]':'h-[170px]'}  `}
                >
                    <div className='flex justify-between'>
                        <BiCategory color='#7e22ce' size={25} />
                        <motion.button onClick={() => selectCategory(null)}><FaTimes size={25} /></motion.button>
                    </div>
                    <div className='mt-3 h-10 flex items-center'>
                        {
                            !isEditing
                                ? <h1 className='font-fgrotesque font-bold text-2xl '>{categorySelected.name}</h1>
                                : <input ref={nameRef} className='font-fgrotesque font-bold text-2xl w-full outline-none border-b-2 border-fuchsia-600' type="text" defaultValue={categorySelected.name} />
                        }
                    </div>
                    {isEmpty && <p className='font-fgrotesque text-red-600 font-bold'>ingrese un texto</p>}
                    <div className='flex justify-between mt-7 '>
                        <motion.button onClick={() => editCategory()} className={`${isEditing ? 'visible' : 'invisible'} py-1 px-2 font-fgrotesque font-bold bg-green-500 rounded-sm `}>Accept</motion.button>
                        <div className='flex justify-end gap-2'>
                            <motion.button onClick={() => setisEditing(!isEditing)} className='p-1 w-[30px] flex justify-center items-center bg-blue-500 rounded-sm ' title='edit'><FaEdit color='#ffffff' /></motion.button>
                            <motion.button onClick={() => deleteCategory()} className='p-1 w-[30px] flex justify-center items-center bg-red-600 rounded-sm ' title='delete'><FaTrashAlt color='#ffffff' /></motion.button>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CategoryModal