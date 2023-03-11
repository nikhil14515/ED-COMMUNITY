import React from 'react'
import Image from 'next/image'
import Loader from "../public/gifs/Loading.gif"
const Loading = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen overflow-hidden bg-black'>
        <Image src={Loader} className='f-full' alt="" priority={true} quality={100}/>
    </div>
  )
}

export default Loading