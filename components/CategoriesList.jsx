import React from 'react' 
import { motion } from 'framer-motion'

const CategoriesList = ({ listOfCategories, selectCategory }) => {
    return (
        <>
            {
                listOfCategories == ''
                    ? <p className='font-fgrotesque text-lg tracking-widest p-3 h-20 flex items-center justify-center'>No hay Categorias Registradas</p>
                    : (
                        listOfCategories.map((item, index) => (
                            <motion.button
                                key={item.id}
                                className='bg-purple-800 w-auto max-w-fit px-4 h-[3rem] rounded-md flex justify-center '
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1] }}
                                transition={{ duration: index / 5 }}
                                drag={false}
                                dragElastic={1}
                                dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
                                onClick={() => selectCategory(item)}
                            >
                                <motion.h2 className='font-fgrotesque text-3xl text-gray-200'>{item.name}</motion.h2>
                            </motion.button>
                        ))
                    )
            }
        </>
    )
}

export default CategoriesList