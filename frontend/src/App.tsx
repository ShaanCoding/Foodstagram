import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Test from './pages/Test'
import Register from './pages/Register'
import Login from './pages/Login'
import HeaderLayout from './components/header/HeaderLayout'

function App() {
	return (
		<>
			<Router>
				<HeaderLayout>
					<Header headerFocused="CreatePost" />
				</HeaderLayout>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/test" element={<Test />} />
					<Route path="/home" element={<Home />} />
					<Route index element={<Register />} />
				</Routes>

				<Footer />
			</Router>
		</>
	)
}

export default App
