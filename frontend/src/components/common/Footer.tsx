import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<>
			<div className="h-[0.5px] bg-gray-300 w-full mt-12 " />
			<div className="text-sm text-gray-600 mt-8 mb-8">
				<div className="flex items-center justify-center m-4">
					<Link to="/" className="px-4 hover:underline">
						Home
					</Link>
					<Link to="About" className="px-4 hover:underline">
						About
					</Link>
					<Link to="About" className="px-4 hover:underline">
						Locations
					</Link>
				</div>
				<div className="flex items-center justify-center">
					&copy; 2022-{new Date().getFullYear()}
				</div>
			</div>
		</>
	)
}

export default Footer
