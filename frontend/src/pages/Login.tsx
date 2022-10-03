import styles from '../styles/Login.module.css'
import Foostaram from '../images/Foostaram.svg'
import InputField from '../components/form/InputField'
import SubmitButton from '../components/form/SubmitButton'
import Form from '../components/form/Form'
import UseLoginMutation from '../api/UseLoginMutation'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate()
	const loginMutation = UseLoginMutation()

	if (loginMutation.isSuccess) {
		const token = loginMutation?.data?.data?.accessToken
		if (token) {
			Cookies.set('access_token', token)
			navigate('/')
		}
	}
	return (
		<div className="m-12 w-4/5 h-full ml-auto mr-auto flex max-w-[750px]">
			<div className="hidden md:block flex-auto w-32 mr-8">
				<img
					alt="Promotional screenshots of the website"
					src="/images/login/login-screenshot.png"
					width={380}
					height={581}
				/>
			</div>
			<div className={`flex flex-col justify-center flex-auto w-14`}>
				<div className={`py-12 px-8 bg-white border ${styles.greyBorder}`}>
					<img
						alt="Foodstaram Logo"
						className="h-10 ml-auto mr-auto mb-8"
						src={Foostaram}
					/>
					{loginMutation.isError && (
						<div className="my-8 bg-red-300 rounded-lg p-4 text-center">
							Invalid credentials, please try again
						</div>
					)}

					{loginMutation.isSuccess && (
						<div className="my-8 bg-green-300 rounded-lg p-4 text-center">
							{`Welcome ${loginMutation?.data?.data?.data?.name}! You've logged in succesfully!`}
						</div>
					)}
					<Form
						onSubmit={(data) => {
							loginMutation.mutate({
								email: data['email'],
								password: data['password'],
							})
						}}
					>
						<InputField placeholder="Email address" type="email" name="email" />
						<InputField
							placeholder="Password"
							type="password"
							name="password"
						/>
						<p className="text-xs text-center text-gray-400 mt-2 mb-6">
							<a className="font-medium text-gray-500" href="/">
								Forgotten your password?
							</a>
						</p>
						<SubmitButton text="Log In" loading={loginMutation.isLoading} />
					</Form>
				</div>
				<div className={`mt-2 py-4 px-8 bg-white border ${styles.greyBorder}`}>
					<p className="text-sm text-center">
						Don't have an account?{' '}
						<a className="text-insta-green" href="/register">
							Sign Up
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Login
