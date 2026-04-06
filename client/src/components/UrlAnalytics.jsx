import React, { useEffect, useState } from "react";

export default function UrlAnalytics(){
  const [url, setUrl] = useState(''); 
  const [clicks, setClicks] = useState(0);
  // Change this before Push to production

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://url-shortner-backend-zpn2.onrender.com'
  // const backendUrl = "http://localhost:8000"

  // 
  const updateUrl = (e) => {
    setUrl(e.target.value);
  }
  const getAnalytics = async() => {
    try {
      const shortId = url.match(`${backendUrl}/(.*)`)[1];
      console.log(shortId);
      const res = await fetch(`${backendUrl}/analytics/${shortId}`);
      const data = await res.json();
      setClicks(data.totalClicks);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col justify-evenly w-full">
      <h1 className="text-4xl text-blue-500 font-bold my-4 font-sans">
        Url Analytics
      </h1>
      <div className="flex items-center flex-wrap gap-4 sm:w-3/4 m-auto">
        <label htmlFor="url" className="text-2xl font-bold">Enter Encrypted Url</label>
        <input 
          type="text" 
          id="url" 
          name="url" 
          className="p-2 border-2 border-gray-300 grow rounded-md" 
          onChange={updateUrl} 
          value={url} 
          placeholder="Enter full encrypted url here.."
        />
        <button className="bg-blue-500 text-white font-bold p-2 rounded-md min-w-[200px]" onClick={getAnalytics}>Get Analytics</button>
      </div>
        <h2 className="text-4xl text-center text-yellow-500 font-bold my-4 font-sans">Number of Clicks: <span className="text-blue-300">{clicks}</span></h2>
    </div>
  )
}