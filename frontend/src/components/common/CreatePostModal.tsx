import 'react-responsive-modal/styles.css'

import {
	light,
	regular,
	solid,
} from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Modal } from 'react-responsive-modal'

import {
	CreateNewPost,
	UseCreatePostMutation,
	UseUpdatePostMutation,
} from '../../api/UsePostMutation'
import Form from '../form/Form'
import InputField from '../form/InputField'
import SubmitButton from '../form/SubmitButton'

interface Props {
	openButton: MutableRefObject<any> // TODO: not pass a button to listen for click, but display conditionally where needed

	post_id?: number // if post_id is passed, then it is an update, otherwise it is a create
	image?: string
	caption?: string
	location?: string
	visible?: boolean


	//openButton: MutableRefObject<any>
}

const CreatePostModal = (props: Props) => {
	let { openButton, visible, image, caption, location } = props
	if(visible === undefined ){
		visible=false

	}
	const [imgSource, setImgSource] = useState(image)
	const [imgPics, setImgPics] = useState(image)

	const [imgUploaded, setImageUploaded] = useState(false)
	const [open, setOpen] = useState(visible)
	const onOpenModal = () => setOpen(true)
	const onCloseModal = () => {
		setOpen(false)
		setImageUploaded(false)
	}

	useEffect(() => {
		if (openButton && openButton.current) {
			openButton.current.onclick = () => onOpenModal()
		}
	}, [openButton])

	const createMutation = UseCreatePostMutation()
	const updateMutation = UseUpdatePostMutation()

	const picture = useRef<HTMLInputElement>(null)
	const _picture = useRef<HTMLInputElement>(null)

	const img = useRef<HTMLImageElement>(null)
	const onPictureSelected = (e: React.ChangeEvent<HTMLInputElement>) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(
				(e.target as HTMLInputElement).files![0] as unknown as File
			)
			reader.onload = () => resolve(reader.result)
			reader.onerror = (error) => reject(error)
		})
			.then((base64string) =>
				(base64string as string).slice('data:image/png;base64,'.length)
			)

			.then((base64image) => {
				setImageUploaded(true)
				//picture.current!.value = base64image
				setImgPics(base64image)
				setShowpreview(true)
				setImgSource(`data:image/png;base64,${base64image}`)
				//if (img.current)
				//	img.current!.src = `data:image/png;base64,${base64image}`
			})

	const [showPreview, setShowpreview] = useState(false)

	const onResetButtonClicked = () => {
		_picture.current!.files = null // clear the file input
		//picture.current!.value = '' // clear the hidden input (base64)
		setImgPics("")
		setImgSource("")
		//img.current!.removeAttribute('src') // clear the picture
	}

	return (
		<div>
			<Modal
				classNames={{ modal: 'rounded-md w-4/5 h-4/5' }}
				open={open}
				showCloseIcon={false}
				onClose={onCloseModal}
				center
			>
				<div className="flex flex-col justify center items-center h-full">
					<h1 className="mb-3">Create a Post</h1>

					<div className="w-full bg-gray-200 flex flex-col justify center items-center h-full">
						{imgUploaded === false && (
							<>
								<div className="w-full h-full flex justify-center items-center flex-col" />
								<FontAwesomeIcon
									className="w-24 h-24"
									icon={regular('images')}
								/>
								<p className="text-xl font-extralight mt-4 mb-4">
									Drag photos and videos here
								</p>{' '}
							</>
						)}

						<Form
							onSubmit={(data) =>
								createMutation.mutate(data as unknown as CreateNewPost)
							}
						>
							<div className="px-8">
								<input
									ref={_picture}
									onChange={onPictureSelected}
									type="file"
									accept="image/*"
									name="_picture"
									required
								/>
								<button onClick={onResetButtonClicked}>Clear</button>
								<img ref={img} src={imgSource} className="w-full" />
								<input ref={picture} src={imgPics} hidden name="picture" />
								<br />
								{imgUploaded === true && (
									<>
										<label>Caption</label>
										<InputField
											type="text"
											name="caption"
											placeholder="Caption"
											initialValue={caption}
											required
											minLength={5}
										/>

										<label>Location Name</label>
										<InputField
											type="text"
											name="location"
											initialValue={location}
											placeholder="Location"
											required
											minLength={5}
										/>

										<SubmitButton
											text="Submit"
											loading={createMutation.isLoading}
										/>
									</>
								)}

								{/*
									<button type="button" className="bg-insta-green px-3 py-1 text-white rounded mt-3">Select from computer</button>
									<form action="http://localhost:3001/posts" method="POST"></form>
									*/}
							</div>
						</Form>
					</div>
				</div>
			</Modal>
		</div>
	)
}
CreatePostModal.defaultProps={
	visible:false

}

export default CreatePostModal
