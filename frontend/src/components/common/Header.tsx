import React from 'react'
import { Link } from 'react-router-dom'
import Foostaram from '../../images/Foostaram.svg'
import userAvatar from '../../images/icons/avatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import SearchBar from './SearchBar'
import CreatePostModal from './CreatePostModal'
import useAuth from '../../api/util/useAuth'

type headerStates = 'None' | 'Home' | 'CreatePost' | 'Explore' | 'Heart'

interface iHeaderState {
	headerFocused?: headerStates
}

const Header = ({ headerFocused = 'None' }: iHeaderState) => {
	const [account, isLoading] = useAuth()
	const newPostButtonRef = React.useRef(null)

	if (account === null || account.account_id === undefined) return <></>

	return (
		<div className="bg-white flex items-center justify-between w-full py-4 px-32 border-b-[1px] border-light-gray mb-16">
			<Link to="/">
				<div className="">
					<img className="h-8 touch:" src={Foostaram} alt="Foostaram" />
				</div>
			</Link>

			<SearchBar />

			<div className="flex items-center justify-center">
				{/* Create post */}
				<div className="px-4">
					<button type="button" ref={newPostButtonRef}>
						<FontAwesomeIcon
							className="w-6 h-6"
							icon={
								headerFocused == 'CreatePost'
									? solid('square-plus')
									: regular('square-plus')
							}
						/>
					</button>
				</div>

				<CreatePostModal openButton={newPostButtonRef} />

				{/* Manage Posts */}
				<div className="px-4">
					<Link to="/manageposts">
						<FontAwesomeIcon className="w-6 h-6" icon={solid('list-check')} />
					</Link>
				</div>

				{/* Profile icon */}
				<div className="px-4">
					{/* Load up avatar */}
					<Link to={`/profile/${account.username}`}>
						<img
							alt="avatar"
							className="w-8 h-8 rounded-full border-2 border-gray-700 object-cover "
							src={`${account.profile_picture_url}`}
						/>
					</Link>
				</div>

				{/* Logout modal */}
				<div className="px-4">
					<Link to="/logout">
						<FontAwesomeIcon
							className="w-6 h-6"
							icon={solid('right-from-bracket')}
						/>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Header
