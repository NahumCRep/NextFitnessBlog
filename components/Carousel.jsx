import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

const Carousel = ({ highlightsPosts, autoPlay }) => {
    const slider = useRef()

    useEffect(() => {
        if (autoPlay) {
            const autoPlaySlider = setInterval(() => {
                sliderNext()
            }, 5000)

            return () => clearInterval(autoPlaySlider);
        }
    }, []);

    const sliderNext = () => {
        if (slider.current !== null) {
            if (slider.current.children.length > 0) {
                const firstSlide = slider.current.children[0];
                const slideLength = slider.current.children[0].offsetWidth;
                slider.current.style.transition = `500ms ease-out all`;
                slider.current.style.transform = `translateX(-${slideLength}px)`;

                const stopTransition = () => {
                    slider.current.style.transition = 'none';
                    slider.current.style.transform = 'translateX(0px)';
                    slider.current.appendChild(firstSlide);

                    slider.current.removeEventListener('transitionend', stopTransition);
                }

                slider.current.addEventListener('transitionend', stopTransition);
            }
        }
    }

    const sliderPrev = () => {
        if (slider.current.children.length > 0) {
            const index = slider.current.children.length - 1;
            const lastSlide = slider.current.children[index];
            slider.current.insertBefore(lastSlide, slider.current.firstChild);

            slider.current.style.transition = 'none';
            const slideLength = slider.current.children[0].offsetWidth;
            slider.current.style.transform = `translateX(-${slideLength}px)`;

            setTimeout(() => {
                slider.current.style.transition = `500ms ease-out all`;
                slider.current.style.transform = `translateX(0px)`;
            }, 30);
        }
    }

    return (
        <article className='cursor-pointer w-full h-full relative flex overflow-hidden'>
            <div ref={slider} className='w-full h-full relative flex'>
                {
                    highlightsPosts && (
                        highlightsPosts.map((post) => {
                            return (
                                <div key={post.id} className='h-full w-full min-w-full overflow-hidden relative'>
                                    <img className='absolute w-full h-full object-cover' src={post.image}></img>
                                    <div className='absolute w-full h-full bg-black flex flex-col justify-center items-center transition-all duration-700 ease-in-out bg-opacity-70 hover:bg-opacity-50'>
                                        <h3 className='font-fgrotesque font-bold text-2xl md:text-4xl text-white'>{post.title}</h3>
                                        <Link href={`/posts/${post.id}`} passHref>
                                            <a>
                                                <button className='outline-none border-none mt-5 font-fgrotesque text-lg md:text-xl font-bold bg-slate-100 p-2 md:p-3 rounded-xl transition-all duration-700 ease-in-out hover:tracking-widest'>Read Post</button>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
            <div className='group absolute w-[80px] h-full left-0 transition-all duration-700 ease-in-out bg-purple-500 bg-opacity-0 hover:bg-opacity-40'>
                <button onClick={() => sliderPrev()} className='h-full w-full flex justify-center items-center transition-all duration-700 ease-in-out group-hover:-translate-x-1 outline-none border-none bg-none'><MdArrowBackIosNew color='#ffffff' size={30} /></button>
            </div>
            <div className='group absolute w-[80px] h-full right-0 transition-all duration-700 ease-in-out bg-purple-500 bg-opacity-0 hover:bg-opacity-40'>
                <button onClick={() => sliderNext()} className='w-full h-full flex justify-center items-center transition-all duration-700 ease-in-out group-hover:translate-x-1 outline-none border-none bg-none'><MdArrowForwardIos color='#ffffff' size={30} /></button>
            </div>
        </article>
    )
}

export default Carousel