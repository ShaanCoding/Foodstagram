import React, { useState } from "react";


const Post = ( ) => {
    return (
    <div className="flex flex-col justify center items-center">
        <h1 className="font-bold">Create a Post</h1>
       
        <div>
        <form className="mt-12"action="">
            <input 
            type="text"
            name="Caption"
            placeholder="Write a caption...."
            ></input>
        </form>
        </div>

        <div>
        <form  action="">
            <input type="file" id="myFile" name="filename"></input>
        </form>
        
        </div>
       

        <div>
        <button type="button" className="bg-blue-500 px-3 py-1 text-white rounded mt-3">Create Post</button>
        </div>
    </div>

    );

}

export default Post;