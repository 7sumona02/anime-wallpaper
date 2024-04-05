/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import React, { useEffect, useState } from 'react'
import {Download} from 'lucide-react'

const page = () => {
    const [images, setImages] = useState([])
    const [currentImage, setCurrentImage] = useState("")

    async function fetchData() {
        const res = await fetch("/api")
        const data = await res.json()
        setImages(prev => [...prev,...data])
      }

    useEffect(() => {
      
      fetchData()
    }, [])

    async function downloadImage(imageSrc) {
        const image = await fetch(imageSrc)
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)
      
        const link = document.createElement('a')
        link.href = imageURL
        link.download = crypto.randomUUID()+"_sumona.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    
  return (
    <div className='flex flex-col justify-center items-center space-y-4 min-h-screen w-full p-20 relative'>
        <div className="grid grid-cols-4 gap-4 m-20">
        {images.map((image,index) => {
          return (
            <div className="shadow-xl w-44 relative" key={index}>
              <figure className="h-full"><img src={image} alt={image} className="h-full w-full object-cover rounded-md" 
                onClick={()=>{ setCurrentImage(image);
                    document.getElementById('my_modal_3').showModal()}} /></figure>
                <button className='bg-gray-100 p-2 absolute right-2 top-2 h-2 w-2 rounded-full flex justify-center items-center  hover:opacity-70' onClick={()=>{ 
                   downloadImage(image)}}>Download</button>
            </div>
          )
        })}
      </div>
      {images.length > 0 && <button className="btn btn-neutral" onClick={() => fetchData()}>More..</button>}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
        
        

        <dialog id="my_modal_3" className="modal w-full absolute">
        <div className="modal-box w-96 h-fit flex justify-center items-center relative">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <img src={currentImage} className='object-contain w-full h-full'  />
            <a className="btn btn-neutral absolute bottom-10 p-5 text-white bg-zinc-800 flex justify-center items-center" onClick={() => downloadImage(currentImage)}>Download</a>
        </div>
        </dialog>
    </div>
  )
}

export default page