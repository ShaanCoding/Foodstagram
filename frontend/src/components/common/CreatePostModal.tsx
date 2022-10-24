import 'react-responsive-modal/styles.css'

import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-responsive-modal'

import {
	UseCreatePostMutation,
	UseUpdatePostMutation,
} from '../../api/UsePostMutation'
import InputField from '../form/InputField'
import SubmitButton from '../form/SubmitButton'
import Carousel from './Carousel'

type Props = {
	open: boolean
	onClose: () => void
} & (CreatePostProps | UpdatePostProps)

interface CreatePostProps {}

interface UpdatePostProps {
	post_id: number // if post_id is passed, then it is an update, otherwise it is a create
	caption: string
	location_name: string
}

const CreatePostModal = ({ open, onClose, ...props }: Props) => {
	const newPost = !('post_id' in props)

	const fileInputRef = useRef<HTMLInputElement>(null)
	const [imagePreview, setImagePreview] = useState<string[]>([])
	const captionInputRef = useRef<HTMLInputElement>(null)
	const locationInputRef = useRef<HTMLInputElement>(null)

	const createMutation = UseCreatePostMutation()
	const updateMutation = UseUpdatePostMutation()

	/**
	 * Send the data
	 */
	const onSubmit = async () => {
		const caption = captionInputRef.current?.value ?? ''
		const location = locationInputRef.current?.value ?? ''

		const imageValid = newPost ? imagePreview.length > 0 : true
		const captionValid = captionInputRef.current!.validity.valid
		const locationValid = locationInputRef.current!.validity.valid

		if (!(imageValid && captionValid && locationValid))
			return alert('Invalid input')

		newPost
			? createMutation.mutate(
					{ picture: imagePreview, location, caption },
					{
						onError(error, variables, context) {
							alert(`Error creating post: ${error}`)
						},
						onSuccess(data, variables, context) {
							alert('Post created!')
							cleanup()
							onClose()
						},
					}
			  )
			: updateMutation.mutate(
					{ post_id: props.post_id, location, caption },
					{
						onError(error, variables, context) {
							alert(`Error updating post: ${error}`)
						},
						onSuccess(data, variables, context) {
							alert('Post updated!')
							cleanup()
							onClose()
						},
					}
			  )
	}

	/**
	 * When a picture/pictures is/are selected, convert them to base64 and set them as previews
	 */
	const onPictureSelected = (e: React.ChangeEvent<HTMLInputElement>) =>
		Promise.all([...e.target.files!].map((file) => toBase64(file)))
			.then((base64strings) =>
				base64strings.map((base64string) =>
					base64string.slice('data:image/png;base64,'.length)
				)
			)
			.then((base64images) => setImagePreview(base64images))

	/**
	 * Convert a File to base64
	 */
	const toBase64 = (file: File) =>
		new Promise<string>((resolve, reject) => {
			const reader = new FileReader()
			reader.onloadend = () =>
				reader.result ? resolve(reader.result.toString()) : reject()
			reader.onerror = (error) => reject(error)
			reader.readAsDataURL(file)
		})

	/**
	 * Clear the visible and invisible input field, and the preview
	 */
	const cleanup = () => {
		fileInputRef.current && (fileInputRef.current.value = '')
		captionInputRef.current && (captionInputRef.current.value = '')
		locationInputRef.current && (locationInputRef.current.value = '')
		setImagePreview([])
	}

	useEffect(() => {
		return cleanup
	}, [])

	const title = newPost ? 'Create a post' : 'Edit post'

	return (
		<Modal
			classNames={{ modal: 'rounded-md w-4/5 h-4/5' }}
			showCloseIcon={false}
			onClose={onClose}
			open={open}
			center
		>
			<div className="flex flex-col justify center items-center h-full">
				<h1 className="mb-3">{title}</h1>

				<div className="w-full flex flex-col justify center items-center h-full">
					{!imagePreview.length && newPost && (
						<>
							{/* <div className="w-full h-full flex justify-center items-center flex-col" /> */}
							<FontAwesomeIcon
								className="w-24 h-24 mt-24"
								icon={regular('images')}
							/>
							<p className="text-xl font-extralight mt-4 mb-4">
								Drag photos and videos here
							</p>
						</>
					)}

					<div className="px-8">
						{newPost && (
							<>
								{/* Visible input to select files, holding File obects */}
								<input
									ref={fileInputRef}
									onChange={onPictureSelected}
									type="file"
									accept="image/*"
									multiple={true}
									name="_picture"
									required
								/>

								<button onClick={cleanup}>Clear</button>

								{(!newPost || !!imagePreview.length) && (
									<Carousel
										pictures={imagePreview.map(
											(img) => `data:image/png;base64,${img}`
										)}
									/>
								)}
							</>
						)}

						<br />
						{(!newPost || !!imagePreview.length) && (
							<>
								<label>Caption</label>
								<InputField
									type="text"
									name="caption"
									placeholder="Caption"
									ref={captionInputRef}
									initialValue={newPost ? '' : props.caption}
									required
									minLength={5}
								/>

								<label>Location Name</label>
								<InputField
									type="text"
									name="location"
									placeholder="Location"
									ref={locationInputRef}
									initialValue={newPost ? '' : props.location_name}
									required
									minLength={5}
								/>

								<SubmitButton
									text="Submit"
									onClick={onSubmit}
									loading={createMutation.isLoading}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default CreatePostModal
