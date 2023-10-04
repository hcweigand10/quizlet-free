import React, {useState} from 'react'
import icon from "../../assets/icon.png"

const Footer = () => {

    return (
            
<footer className="bg-slate-200 shadow dark:bg-gray-900 w-full">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0">
                <img src={icon} className="h-8 mr-3" alt="Quiz Quo Pro Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Quiz Quo Pro</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 pt-2">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="/" className="mr-4 hover:underline md:mr-6 ">Home</a>
                </li>
            </ul>
        </div>
        <hr className="my-2 border-gray-300 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">© 2023 <a href="https://henryweigand.com/" className="underline" target='_blank' rel='noreferrer'>henryweigand.com</a></span>
    </div>
</footer>


    )
}

export default Footer