import React from "react";
import styles from "../styles/Profile.module.css";
import { Link } from "react-router-dom";

const EditProfile = () => {
    return (
        <div className="relative max-w-2xl mx-auto my-3">

            <div className="flex flex-col justify-center items-center my-5">

                <h1 className="text-3xl font-semibold py-3">Edit your profile</h1>

                <form className="mx-5 my-5">

                    <div className="grid grid-cols-5 py-3 mb-5">
                        <div></div>
                        <div className="block pt-2 place-self-end self-center font-semibold">
                            <p>Profile Picture</p>
                        </div>
                        <div className="place-self-end px-4">
                            <img className="h-20 w-20 object-cover rounded-full place-items-center" src="https://source.unsplash.com/8hI_OW99d28" alt="Current profile photo" />
                        </div>
                        <label className="block pt-2 self-center col-span-2">
                            <span className="sr-only t-2">Choose profile photo</span>
                            <input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-300" />
                        </label>
                    </div>

                    <label className="relative block p-3 bg-gray-100 rounded-2xl">
                        <span className="text-md font-semibold text-zinc-900">
                            Username
                        </span>
                        <input className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" id="name" type="text" placeholder="Your username" value="@freaky_foodie" />
                    </label>

                    <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                        <span className="text-md font-semibold text-zinc-900">
                            Name
                        </span>
                        <input className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" id="name" type="text" placeholder="Your name" value="Big Eater" />
                    </label>

                    <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                        <span className="text-md font-semibold text-zinc-900">
                            Profile description
                        </span>
                        <textarea id="profileDescription" rows={5} className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" placeholder="Profile description">Hi, I like food and I love eating, and when I eat, it's usually healthy. However, since I'm only 22 years old I've never taken a Keto Diet (yet) but so far I feel great. I have a healthy appetite and am also healthy in my everyday life.</textarea>
                    </label>

                    <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                        <span className="text-md font-semibold text-zinc-900">
                            Email
                        </span>
                        <input className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" id="name" type="text" placeholder="Your email address" value="foodinmytummy@email.com" />
                    </label>

                    <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                        <span className="text-md font-semibold text-zinc-900">
                            Password
                        </span>
                        <input className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" id="name" type="password" placeholder="Your password" />
                    </label>

                    <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                        <span className="text-md font-semibold text-zinc-900">
                            Phone Number
                        </span>
                        <input className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" id="name" type="text" placeholder="Your phone number" value="+61 423 456 789" />
                    </label>

                </form>

                <div className="flex space-x-4">
                    <Link to="/profile">
                        <button className="my-5 px-5 py-2 font-semibold text-sm border rounded bg-green-500 text-white">Save</button>
                    </Link>
                    <Link to="/profile">
                        <button className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400 rounded">Back to profile</button>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default EditProfile
