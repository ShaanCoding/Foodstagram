import React from "react";
import styles from "../styles/Profile.module.css";
import InputField from '../components/form/InputField'
import SubmitButton from '../components/form/SubmitButton'
import { Link } from "react-router-dom";
import Form from '../components/form/Form'
import UseProfileQuery from "../api/UseProfileQuery";
import UseEditProfileMutation from "../api/UseEditProfileMutation";

const EditProfile = () => {

    const profileQuery = UseProfileQuery("1")
    const editProfileMutation = UseEditProfileMutation()

    return (
        <div className="relative max-w-2xl mx-auto my-3">
            {profileQuery.isLoading == false && (
                <>

                    <div className="flex flex-col justify-center items-center my-5">

                        <h1 className="text-3xl font-semibold py-3">Edit your profile</h1>

                        <form className="mx-5 my-5">

                            <Form
                                onSubmit={(data) => {
                                    editProfileMutation.mutate({
                                        fullName: data['fullName'],
                                        username: data['username'],
                                        bio: data['bio'],
                                        email: data['email'],
                                        phone: data['phone'],
                                    })
                                }}
                            >

                                <InputField placeholder="Full Name" name="fullName" initialValue={profileQuery.data?.data.data.name} />
                                <InputField placeholder="Username" name="username" initialValue={profileQuery.data?.data.data.username} />
                                <InputField placeholder="Bio" name="bio" initialValue={profileQuery.data?.data.data.bio} />
                                <InputField placeholder="Email address" type="email" name="email" initialValue={profileQuery.data?.data.data.email} />
                                <InputField placeholder="Phone Number" type="phone" name="phone" initialValue={profileQuery.data?.data.data.phone} />

                                <SubmitButton text="Save" />

                            </Form>

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
                                    <input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-insta-green file:text-white hover:file:bg-green-500" />
                                </label>
                            </div>

                            <label className="relative block p-3 bg-gray-100 rounded-2xl">
                                <span className="text-md font-semibold text-zinc-900">
                                    Username
                                </span>
                                <input className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" id="name" type="text" placeholder="Your username" value={profileQuery.data?.data.data.username} />
                            </label>

                            <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                                <span className="text-md font-semibold text-zinc-900">
                                    Name
                                </span>
                                <input className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" id="name" type="text" placeholder="Your name" value={profileQuery.data?.data.data.name} />
                            </label>

                            <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                                <span className="text-md font-semibold text-zinc-900">
                                    Profile description
                                </span>
                                <textarea id="profileDescription" rows={5} className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" placeholder="Profile description">{profileQuery.data?.data.data.bio}</textarea>
                            </label>

                            <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                                <span className="text-md font-semibold text-zinc-900">
                                    Email
                                </span>
                                <input className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" id="name" type="text" placeholder="Your email address" value={profileQuery.data?.data.data.email} />
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
                                <button className="my-5 px-5 py-2 font-semibold text-sm border rounded bg-insta-green hover:bg-green-500 text-white">Save</button>
                            </Link>
                            <Link to="/profile">
                                <button className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400 rounded">Back to profile</button>
                            </Link>
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}

export default EditProfile
