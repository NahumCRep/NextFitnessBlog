import React from 'react'

const HomeCategoryItem = ({title}) => {
    return (
        <div className='w-28 h-16 md:w-[200px] md:h-[100px] bg-[#212121] rounded-xl flex justify-center items-center'>
            <h2 className='font-fgrotesque text-lg md:text-2xl font-semibold text-purple-700'>{title}</h2>
        </div>
    )
}

export default HomeCategoryItem