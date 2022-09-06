import React, { useState, useEffect, MutableRefObject } from 'react'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	light,
	regular,
	solid,
} from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from '../../styles/CreatePostModal.module.css'

interface Props {
	openButton: MutableRefObject<any>
}

const CreatePostModal = (props: Props) => {
	const { openButton } = props
	const [open, setOpen] = useState(false)

	const onOpenModal = () => setOpen(true)
	const onCloseModal = () => setOpen(false)
	useEffect(() => {
		if (openButton && openButton.current) {
			openButton.current.onclick = () => onOpenModal()
		}
	}, [openButton])

	return (
		<div>
			<Modal
				classNames={{
					modal: `rounded-md w-4/5 h-4/5 forwards ${styles.forwards}`,
					overlay: styles.forwards,
				}}
				open={open}
				showCloseIcon={false}
				onClose={onCloseModal}
				center
			>
				<div className="flex flex-col justify center items-center h-full">
					<h1 className="mb-3">Create a Post</h1>
					<div className="w-full bg-gray-200 h-[0.5px]" />
					<div className="w-full h-full flex justify-center items-center flex-col">
						<FontAwesomeIcon className="w-24 h-24" icon={regular('images')} />
						<p className="text-xl font-extralight mt-4 mb-4">
							Drag photos and videos here
						</p>

						<div>
							<button
								type="button"
								className="bg-insta-green px-3 py-1 text-white rounded mt-3"
							>
								Select from computer
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default CreatePostModal
