import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import AdminPage from '../../../components/AdminPage'
import axios from 'axios'
import Loader from '../../../components/Loader'
import { BsPlusLg } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import { useSession } from 'next-auth/react'
import CategoriesList from '../../../components/CategoriesList'
import CategoryModal from '../../../components/CategoryModal'

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

const Categories = ({ categories }) => {
    // console.log(categories)
    const [isLoading, setIsLoading] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isError, setIsError] = useState(false)
    const categoryRef = useRef(null)
    const { data: session } = useSession()
    const [allCategories, setAllCategories] = useState(categories)

    const getAllCategories = () =>{
        setIsLoading(true)
        axios.get('/api/categories').then(res => {
            setIsLoading(false)
            setAllCategories(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        if(selectedCategory == null){
            getAllCategories()
        }
    },[selectedCategory])

    const addCategory = () => {
        if (categoryRef.current.value == '') {
            setIsError(true)
        } else {
            setIsError(false)
            setIsLoading(true)
            axios.post("/api/categories", {
                name: categoryRef.current.value,
                author: session.user,
                date: new Date()
            }).then(res => {
                categoryRef.current.value = ''
                setIsLoading(false)
                getAllCategories()
                // router.replace("/admin/categories")
            }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <AdminPage>
            <section className='w-full h-screen flex flex-col md:flex-row'>
                <div className='w-full h-52 md:h-full md:w-[25%]'>
                    <div className='flex flex-col px-5 pt-8 gap-3'>
                        <label className='font-fgrotesque font-bold text-xl tracking-widest' htmlFor='category'><BiCategory color='#7e22ce' size={25} />Add Category</label>
                        <input className='h-8 outline-none border-none px-2 font-fgrotesque text-lg' ref={categoryRef} type='text' name="category" />
                        {isError && (<p className='text-red-500 font-fgrotesque font-bold text-lg'>ingrese una categoria</p>)}
                        <button onClick={addCategory} className='bg-green-500 hover:bg-green-400 transition-colors duration-500 ease-in-out font-fgrotesque text-xl font-bold flex items-center justify-center gap-2 p-2'><BsPlusLg /> Add</button>
                    </div>
                </div>
                <div className='w-full md:w-[75%]'>
                    <h1 className='font-faudiowide text-2xl px-8 pt-7'>Categories</h1>
                    <div className=' w-full h-auto p-8 flex flex-wrap gap-5 justify-start'>
                        {
                            isLoading
                                ? <Loader />
                                : <CategoriesList listOfCategories={allCategories} selectCategory={setSelectedCategory} />
                        }
                    </div>
                </div>
                <AnimatePresence>
                    {selectedCategory &&
                        <CategoryModal
                            categorySelected={selectedCategory}
                            selectCategory={setSelectedCategory}
                        />
                    }
                </AnimatePresence>
            </section>
        </AdminPage>
    )
}

export default Categories