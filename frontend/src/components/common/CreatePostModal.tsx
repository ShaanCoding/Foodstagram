import 'react-responsive-modal/styles.css';

import { light, regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MutableRefObject, useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';

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

							{
							/*
								<Form onSubmit={ () => {} }>
								</Form>
							*/
							}

							<form action="http://localhost:3001/posts" method="POST">
								<div>
									
									<input type="file" accept="image/png, image/jpeg, image/*" name="picture" required/>
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
										*/
									}
								</div>
							</form>
					</div>
                </div>
            </Modal>
        </div>
	)
}

export default CreatePostModal
