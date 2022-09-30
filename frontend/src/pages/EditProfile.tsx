import React from "react";
import styles from "../styles/Profile.module.css";
import InputField from '../components/form/InputField'
import SubmitButton from '../components/form/SubmitButton'
import { Link } from "react-router-dom";
import Form from '../components/form/Form'
import UseProfileQuery from "../api/UseProfileQuery";
import UseEditProfileMutation from "../api/UseEditProfileMutation";
import InputFieldProfile from "../components/form/InputFieldProfile";
import SubmitButtonProfile from "../components/form/SubmitButtonProfile";

const EditProfile = () => {

    const profileQuery = UseProfileQuery("1")
    const editProfileMutation = UseEditProfileMutation()

    return (
        <div className="relative max-w-2xl mx-auto my-3">
            {profileQuery.isLoading == false && (
                <>

                    <div className="flex flex-col justify-center items-center my-5">

                        <h1 className="text-3xl font-semibold py-3">Edit your profile</h1>

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
                                <InputFieldProfile placeholder="Username" name="username" initialValue={profileQuery.data?.data.data.username} />
                            </label>

                            <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                                <span className="text-md font-semibold text-zinc-900">
                                    Name
                                </span>
                                <InputFieldProfile placeholder="Full Name" name="fullName" initialValue={profileQuery.data?.data.data.name} />
                            </label>

                            <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                                <span className="text-md font-semibold text-zinc-900">
                                    Profile description
                                </span>
                                <InputFieldProfile placeholder="Bio" name="bio" initialValue={profileQuery.data?.data.data.bio} />
                            </label>

                            <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                                <span className="text-md font-semibold text-zinc-900">
                                    Email
                                </span>
                                <InputFieldProfile placeholder="Email address" type="email" name="email" initialValue={profileQuery.data?.data.data.email} />
                            </label>

                            <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                                <span className="text-md font-semibold text-zinc-900">
                                    Password
                                </span>
                                <input className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none" id="name" type="password" placeholder="Your password (not functional)" />
                            </label>

                            <label className="relative block p-3 bg-gray-100 rounded-2xl mt-5">
                                <span className="text-md font-semibold text-zinc-900">
                                    Phone Number
                                </span>
                                <InputFieldProfile placeholder="Phone number" type="phone" name="phone" initialValue={profileQuery.data?.data.data.phone} />
                            </label>

                            <div className="flex space-x-4 justify-center">
                                <SubmitButtonProfile text="Save" />
                                <Link to="/profile">
                                    <button className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400 rounded">Back to profile</button>
                                </Link>
                            </div>

                        </Form>

                    </div>
                </>
            )}
        </div>
    )
}

export default EditProfile
