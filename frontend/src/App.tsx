import React from 'react'
import './api/middleware/auth'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Test from './pages/Test'
import Register from './pages/Register'
import Login from './pages/Login'
import HeaderLayout from './components/header/HeaderLayout'
import Search from './pages/Search'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import ManagePosts from './pages/Business/ManagePosts'
import SchedulePosts from './pages/Business/SchedulePosts'
import Links from './pages/Links'
import { QueryClient, QueryClientProvider } from 'react-query'
import Logout from './pages/Logout'

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
						<Route path="/search/:searchStr" element={<Search />} />
						<Route path="/feed" element={<Feed />} />
						<Route path="/profile/:username" element={<Profile />} />
						<Route path="/editprofile" element={<EditProfile />} />
						<Route path="/manageposts" element={<ManagePosts />} />
						<Route path="/links" element={<Links />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/scheduleposts" element={<SchedulePosts />} />
						<Route index element={<Feed />} />
					</Routes>

					<Footer />
				</Router>
			</QueryClientProvider>
		</>
	)
}

export default App
