import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function UrlForm(){
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const handleOnChange = (e) =>  {
        setUrl(e.target.value);
    }
    const ShortenUrl = async () => {
        console.log(url);
        const reqBody = {
            url: url
        }
        // Change this before Push to production

        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://url-shortner-backend-zpn2.onrender.com'
        // const backendUrl = "http://localhost:8000"

        // 
        try {
            const res = await axios.post(`${backendUrl}/url`, reqBody);
            toast.success("Encrypted Url Generated 🧑‍💻!!!")
            setShortUrl(`${backendUrl}/${res.data.id}`);
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const copyUrl = async () => {
        try {
            if(shortUrl){
                await navigator.clipboard.writeText(shortUrl)
                toast.success("Copied..")
            }
            else
                toast.error("Can't Generate ShortURL without any URL")
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    return (
        <div>
            <h1 className="text-4xl text-green-500 font-bold my-4">
                Url Form
            </h1>
            <div className="flex flex-col sm:w-3/4 mx-auto gap-8">
                <div className="flex items-center flex-wrap gap-4">
                    <label htmlFor="url" className="text-2xl font-bold basis-[425px] sm:basis-auto">Enter Url</label>
                    <input type="text" onChange={handleOnChange} id="url" name="url" className="p-2 border-2 border-gray-300 grow rounded-md" value={url} />
                    <button onClick={ShortenUrl} className="bg-green-500 text-white font-bold p-2 rounded-md min-w-[200px]">Encrypt 🧑‍💻</button>
                </div>
                <div className="flex items-center flex-wrap gap-4">
                    <label htmlFor="shortUrl" className="text-2xl font-bold">Encrypted Url</label>
                    <input type="text" id="shortUrl" name="shortUrl" className="p-2 border-2 border-gray-300 grow rounded-md" value={shortUrl} />
                    <button onClick={copyUrl} className="bg-blue-500 text-white font-bold p-2 rounded-md min-w-[200px]">Copy</button>
                </div>
            </div>
            <Toaster />
        </div>
    )
}