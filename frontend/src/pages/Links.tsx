import { Link } from 'react-router-dom'

const Links = () => {
	return (
		<div className="w-3/5 ml-auto mr-auto">
			<h1 className="text-center text-xl">Feature Links</h1>
			<ul className="list-disc">
				<li>
					<Link to="/login">Login (Jack)</Link>
				</li>
				<li>
					<Link to="/register">Registration (Jack)</Link>
				</li>
				<li>
					<Link to="/profile">Profile (Jabriel)</Link>
				</li>
				<li>
					<Link to="/editprofile">Edit Profile (Jabriel)</Link>
				</li>
				<li>
					<Link to="/links">Create Post (Alwin)</Link>
				</li>
				<li>
					<Link to="/feed">Feed (Brandon)</Link>
				</li>
				<li>
					<Link to="/manageposts">Managing Posts (Shaan)</Link>
				</li>
				<li>
					<Link to="/scheduleposts">Schedule Posts (Shaan)</Link>
				</li>
				<li>
					<Link to="/search">Search (Trong)</Link>
				</li>
			</ul>
		</div>
	)
}

export default Links
