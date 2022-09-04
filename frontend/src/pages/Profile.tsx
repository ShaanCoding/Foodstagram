import React from "react";
import styles from "../styles/Profile.module.css";
import { Link } from "react-router-dom";

const Profile = () => {
  return (

    <div className="relative max-w-2xl mx-auto my-3">

      {/* top bar */}
      <div className="flex flex-col justify-center items-center my-5">
        <div className="w-32 h-32 bg-cover bg-center bg-no-repeat rounded-full" style={{ backgroundImage: "url('https://source.unsplash.com/8hI_OW99d28')" }}></div>
        <span className="my-3">@freaky_foodie</span>

        <div className="grid grid-cols-3 gap-10 text-sm">
          <div className="flex flex-col items-center">
            <span className="font-bold">9</span>
            <span>Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">1,082</span>
            <span>Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">2,054</span>
            <span>Following</span>
          </div>
        </div>

        <Link to="/editprofile">
          <button className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400 rounded">Edit profile</button>
        </Link>

        <p className="mb-3 text-center">Hi, I like food and I love eating, and when I eat, it's usually healthy. However, since I'm only 22 years old I've never taken a Keto Diet (yet) but so far I feel great. I have a healthy appetite and am also healthy in my everyday life.</p>
      </div>
      {/* top bar end */}

      {/* post grid */}
      <div className="grid grid-cols-3 gap-0.5 mt-2">

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/kcA-c3f_3FE')]">
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <span>930</span>
          </div>
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/tkfRSPt-jdk')]">
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <span>673</span>
          </div>
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/rQsYZnCRU00')]">
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <span>993</span>
          </div>
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/rAyCBQTH7ws')]">
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <span>583</span>
          </div>
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/u9tN9NIJgMc')]">
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <span>667</span>
          </div>
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/uQs1802D0CQ')]">
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <span>923</span>
          </div>
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/bBzjWthTqb8')]">
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <span>783</span>
          </div>
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/E94j3rMcxlw')]">
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <span>493</span>
          </div>
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/hTR1XPtTo_k')]">
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <span>401</span>
          </div>
        </div>

      </div>
      {/* post grid end */}

    </div>

  )
}

export default Profile
