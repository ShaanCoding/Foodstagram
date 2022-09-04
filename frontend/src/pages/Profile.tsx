import React from "react";
import styles from "../styles/Profile.module.css";

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

        <button className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400">Edit profile</button>

        <p className="mb-3 text-center">Hi, I like food and I love eating, and when I eat, it's usually healthy. However, since I'm only 22 years old I've never taken a Keto Diet (yet) but so far I feel great. I have a healthy appetite and am also healthy in my everyday life.</p>
      </div>
      {/* top bar end */}


      {/* middle navigation */}
      <div className="grid grid-cols-4">
        <button className="mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="border-b-2 border-gray-600 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
        <button className="mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </button>
        <button className="mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button className="mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      {/* middle navigation end */}

      {/* post grid */}
      <div className="grid grid-cols-3 gap-0.5 mt-2">

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/kcA-c3f_3FE')]">
          {/* small player with views */}
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>800</span>
          </div>
          {/* small player with views end */}
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/tkfRSPt-jdk')]">
          {/* small player with views */}
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>800</span>
          </div>
          {/* small player with views end */}
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/rQsYZnCRU00')]">
          {/* small player with views */}
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>800</span>
          </div>
          {/* small player with views end */}
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/rAyCBQTH7ws')]">
          {/* small player with views */}
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>800</span>
          </div>
          {/* small player with views end */}
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/u9tN9NIJgMc')]">
          {/* small player with views */}
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>800</span>
          </div>
          {/* small player with views end */}
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/uQs1802D0CQ')]">
          {/* small player with views */}
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>800</span>
          </div>
          {/* small player with views end */}
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/bBzjWthTqb8')]">
          {/* small player with views */}
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>800</span>
          </div>
          {/* small player with views end */}
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/E94j3rMcxlw')]">
          {/* small player with views */}
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>800</span>
          </div>
          {/* small player with views end */}
        </div>

        <div className="relative w-full h-60 bg-cover bg-center bg-no-repeat bg-[url('https://source.unsplash.com/hTR1XPtTo_k')]">
          {/* small player with views */}
          <div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>800</span>
          </div>
          {/* small player with views end */}
        </div>


      </div>
      {/* post grid end */}

      {/* bottom navigation */}
      <div className="sticky bottom-0 left-0 bg-white w-full py-2 px-3 mt-1 text-xs">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </div>
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Friends</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="bg-black text-white px-5 py-2 rounded-md border border-pink-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>Inbox</span>
          </div>
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile</span>
          </div>
        </div>
      </div>
      {/* bottom navigation end */}
    </div>

  )
}

export default Profile
