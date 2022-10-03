import { Fragment, useRef, useState } from 'react'

// import { UseDeletePostMutation } from '../../api/UsePostMutation'
import useAuth from '../../api/util/useAuth'
import edit from '../../images/edit-button.png'
import like from '../../images/like.png' // use this for like button (or find a new icon, then find the same icon filled in, so when you click like it becomes solid)
import save from '../../images/save.png'
import trash from '../../images/trash.png'
import styles from '../../styles/Feed.module.css'
import { ContextMenu } from '../common/ContextMenu'
import CreatePostModal from '../common/CreatePostModal'

interface Props {
	post: Post
}
export const Post = (props: Props) => {
	const [account, _] = useAuth()
	const { post } = props
	const [modalVisible, setModalVisible] = useState(false)

	const editButtonRef = useRef(null)

	// const deletePostMutation = UseDeletePostMutation()
	// const deletePost = () => deletePostMutation.mutate({ post_id: post.post_id })

	const editPost = () => {
		setModalVisible(true)

	}
	// UseUpdatePostMutation

	return (
		<></>
	)
}
