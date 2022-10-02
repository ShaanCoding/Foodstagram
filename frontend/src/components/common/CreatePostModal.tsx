import 'react-responsive-modal/styles.css'

import {
	light,
	regular,
	solid,
} from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Modal } from 'react-responsive-modal'

import { CreateNewPost, UseCreatePostMutation } from "../../api/UsePostMutation";
import Form from "../form/Form";

interface Props {
	openButton: MutableRefObject<any>
}

const CreatePostModal = (props: Props) => {
    const { openButton } = props;
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    useEffect(() => {
        if (openButton && openButton.current) {
            openButton.current.onclick = () => (onOpenModal())
        }


    }, [openButton])

	const postMutation = UseCreatePostMutation();
	
	const picture = useRef<HTMLInputElement>(null);
	const _picture = useRef<HTMLInputElement>(null);
	
	const img = useRef<HTMLImageElement>(null);
	const onPictureSelected = (e: React.ChangeEvent<HTMLInputElement>) => 
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(((e.target as HTMLInputElement).files![0] as unknown as File));
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		})
		.then(base64string => (base64string as string).slice("data:image/png;base64,".length))
		.then(base64image => {
			picture.current!.value = base64image;
			setShowpreview(true)
			if(img.current) img.current!.src = `data:image/png;base64,${base64image}`;
		})
		
	const [showPreview, setShowpreview] = useState(false);

	const onResetButtonClicked = () => {
		_picture.current!.files = null; // clear the file input
		picture.current!.value = ""; // clear the hidden input (base64)
		img.current!.removeAttribute("src"); // clear the picture
	}

    return (
        <div>
            <Modal classNames = {{modal:"rounded-md w-4/5 h-4/5"}} open={open} showCloseIcon={false} onClose={onCloseModal} center>
                <div className="flex flex-col justify center items-center h-full">
                    <h1 className="mb-3">Create a Post</h1>
                        
						
						<div className="w-full bg-gray-200 h-[0.5px] flex flex-col justify center items-center h-full">
                            <div className="w-full h-full flex justify-center items-center flex-col" />
							<FontAwesomeIcon
								className="w-24 h-24"
								icon={
									regular("images")
								}
							/>
							
							<p className="text-xl font-extralight mt-4 mb-4">Drag photos and videos here</p>

							<Form onSubmit={ (data) => postMutation.mutate(data as unknown as CreateNewPost) }>
								<div>
									<input ref={_picture} onChange={onPictureSelected} type="file" accept="image/png, image/jpeg, image/*" name="_picture" required/>
									<button onClick={onResetButtonClicked}>Clear</button>
									<img ref={img} width={100} height={100}/>
									<input ref={picture} hidden name="picture" />
									<br />

									<label>
										Caption:
										<input type="text" name="caption" placeholder='Caption' required />
									</label>
									<br />
									
									<label>
										Location:
										<input type="text" name="location" placeholder="Location" required/>
									</label>
									<br />

									<input type="submit" className="bg-insta-green px-3 py-1 text-white rounded mt-3"/> 

									{
										/*
										<button type="button" className="bg-insta-green px-3 py-1 text-white rounded mt-3">Select from computer</button>
										<form action="http://localhost:3001/posts" method="POST"></form>
										*/
									}
								</div>
							</Form>
					</div>
                </div>
            </Modal>
        </div>
	)
}

export default CreatePostModal
