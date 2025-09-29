import React from 'react'
import { IoCall } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import ContactForm from '../ContactUsComponents/ContactForm';

const Queries = () => {
    return (
        <>
            <div className='hidden lg:block'>
                <div>
                    <h1 className='text-[22px] text-[#326EE6]'>Contact With Us</h1>
                    <h2 className='text-4xl text-black pb-4'>Have queries? Reach out to our experts.</h2>
                    <div className='flex flex-row justify-start gap-5 mt-5 mb-10'>
                        <div className='flex flex-col group justify-center items-center gap-2 border-2 shadow-xs border-gray-200 rounded-md p-3 w-40 h-40 hover:bg-[#00457C] hover:text-white'>
                            <IoCall className='text-2xl text-white bg-[#00457C] group-hover:bg-white group-hover:text-[#00457C] rounded-full size-9 p-2' />
                            <div>Call</div>
                            <div>9999999999</div>
                        </div>
                        <div className='flex flex-col group justify-center items-center gap-2 border-2 shadow-xs border-gray-200 rounded-md p-3 w-40 h-40 hover:bg-[#00457C] hover:text-white'>
                            <LuMessageSquareText className='text-2xl text-white bg-[#00457C] group-hover:bg-white group-hover:text-[#00457C] rounded-full size-9 p-2' />
                            <div>Messages</div>
                            <div>9999999999</div>
                        </div>
                        <div className='flex flex-col group justify-center items-center gap-2 border-2 shadow-xs border-gray-200 rounded-md p-3 w-40 h-40 hover:bg-[#00457C] hover:text-white'>
                            <MdEmail className='text-2xl text-white bg-[#00457C] group-hover:bg-white group-hover:text-[#00457C] rounded-full size-9 p-2' />
                            <div>Emails</div>
                            <div>abc@email.com</div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <h1 className='text-2xl'>To Connect With Us</h1>
                        <div className='flex flex-row gap-4 pl-5'>
                            <button className='flex justify-center items-center bg-[#00457C] size-10 rounded-full text-white p-2 cursor-pointer'>
                                <FaFacebookF />
                            </button>
                            <button className='flex justify-center items-center bg-[#00457C] size-10 rounded-full text-white p-2 cursor-pointer'>
                                <FaInstagram />
                            </button>
                            <button className='flex justify-center items-center bg-[#00457C] size-10 rounded-full text-white p-2 cursor-pointer'>
                                <FaTwitter />
                            </button>
                        </div>
                    </div>
                </div>
                {/* <div className='flex justify-center items-center shadow-md size-fit px-10 py-3 md:size-96 rounded-md'>
                    <div className='md:w-80'>
                        <ContactForm />
                    </div>
                </div> */}
            </div>



            <div className='flex flex-col gap-4 justify-center items-center lg:hidden px-12 py-10'>
                <div className='text-center mb-5'>
                    <h1 className='text-3xl text-black'>Have queries?<br /><span className='text-[21px]'>Reach out to our experts.</span></h1>
                </div>
                {/* <div className='flex justify-center items-center shadow-md size-fit px-10 py-3 md:size-96 rounded-md'>
                    <div className='md:w-80'>
                        <ContactForm />
                    </div>
                </div> */}
                <div className='flex flex-col justify-center gap-5 mt-5 mb-7'>
                    <div className='flex flex-row group items-center gap-2 border-2 shadow-xs border-gray-200 rounded-md px-3 py-2 w-auto hover:bg-[#00457C] hover:text-white'>
                        <IoCall className='text-2xl text-white bg-[#00457C] group-hover:bg-white group-hover:text-[#00457C] rounded-full size-9 p-2' />
                        <div className='font-bold'>Call:</div>
                        <div>9999999999</div>
                    </div>
                    <div className='flex flex-row group items-center gap-2 border-2 shadow-xs border-gray-200 rounded-md px-3 py-2 w-auto hover:bg-[#00457C] hover:text-white'>
                        <LuMessageSquareText className='text-2xl text-white bg-[#00457C] group-hover:bg-white group-hover:text-[#00457C] rounded-full size-9 p-2' />
                        <div className='font-bold'>Messages:</div>
                        <div>9999999999</div>
                    </div>
                    <div className='flex flex-row group items-center gap-2 border-2 shadow-xs border-gray-200 rounded-md px-3 py-2 w-auto hover:bg-[#00457C] hover:text-white'>
                        <MdEmail className='text-2xl text-white bg-[#00457C] group-hover:bg-white group-hover:text-[#00457C] rounded-full size-9 p-2' />
                        <div className='font-bold'>Emails:</div>
                        <div>abc@email.com</div>
                    </div>
                </div>
                <div className='flex flex-col gap-5 justify-center items-center '>
                    <h1 className='text-xl'>To Connect With Us</h1>
                    <div className='flex flex-row gap-4 pl-5'>
                        <button className='flex justify-center items-center bg-[#00457C] size-10 rounded-full text-white p-2 cursor-pointer'>
                            <FaFacebookF />
                        </button>
                        <button className='flex justify-center items-center bg-[#00457C] size-10 rounded-full text-white p-2 cursor-pointer'>
                            <FaInstagram />
                        </button>
                        <button className='flex justify-center items-center bg-[#00457C] size-10 rounded-full text-white p-2 cursor-pointer'>
                            <FaTwitter />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Queries