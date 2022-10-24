import './api/middleware/auth'

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Footer from './components/common/Footer'
import Header from './components/common/Header'
import HeaderLayout from './components/header/HeaderLayout'
import ManagePosts from './pages/Business/ManagePosts'
import SchedulePosts from './pages/Business/SchedulePosts'
import UpdatePosts from './pages/Business/UpdatePosts'
import EditProfile from './pages/EditProfile'
import Feed from './pages/Feed'
import Home from './pages/Home'
import Links from './pages/Links'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SearchPost from './pages/SearchPost'
import SearchUser from './pages/SearchUser'
import SearchFollowing from './pages/SearchFollowing'
import Test from './pages/Test'
import PasswordReset from './pages/PasswordReset'
import TwoFA from './pages/TwoFA'
import SinglePost from './pages/SinglePost'
import EmailConfirm from './pages/EmailConfirm'

const queryClient = new QueryClient()

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Router>
					<HeaderLayout>
						<Header headerFocused="CreatePost" />
					</HeaderLayout>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/test" element={<Test />} />
						<Route path="/search/user/:searchStr" element={<SearchUser />} />
						<Route path="/search/post/:searchStr" element={<SearchPost />} />
						<Route path="/search/following/:searchStr" element={<SearchFollowing />} />
						<Route path="/feed/:postID" element={<SinglePost />} />
						<Route path="/feed" element={<Feed />} />
						<Route path="/email/confirm" element={<EmailConfirm />} />
						<Route path="/profile/:username" element={<Profile />} />
						<Route path="/editprofile" element={<EditProfile />} />
						<Route path="/manageposts" element={<ManagePosts />} />
						<Route path="/links" element={<Links />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/scheduleposts" element={<SchedulePosts />} />
						<Route path="/updateposts/:post_id" element={<UpdatePosts />} />
						<Route path="/passwordreset" element={<PasswordReset />} />
						<Route path="/2fa" element={<TwoFA />} />
						<Route index element={<Feed />} />
						{/* */}
					</Routes>

					<Footer />
				</Router>
			</QueryClientProvider>
		</>
	)
}

export default App
