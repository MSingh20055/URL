import React from "react";
import UrlForm from "./components/UrlForm";
import UrlAnalytics from "./components/UrlAnalytics";

export default function App(){
  return (
    <div>
      <h1 className="text-4xl text-yellow-500 font-bold my-10 text-center font-serif tracking-widest">
        URL Encrypter
      </h1>
      <div className="flex flex-col justify-center mx-10">
        <UrlForm />
        <UrlAnalytics />
      </div>
    </div>
  )
}