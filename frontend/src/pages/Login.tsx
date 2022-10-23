import styles from '../styles/Login.module.css'
import Foostaram from '../images/Foostaram.svg'
import InputField from '../components/form/InputField'
import SubmitButton from '../components/form/SubmitButton'
import Form from '../components/form/Form'
import UseLoginMutation from '../api/UseLoginMutation'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import UseTwoFAEnabledMutation from '../api/UseTwoFAEnabledMutation'
import { AxiosError } from 'axios'

const Login = () => {
	const navigate = useNavigate()
	const loginMutation = UseLoginMutation()
	const has2FAMutation = UseTwoFAEnabledMutation()

	if (loginMutation.isSuccess) {
		const token = loginMutation?.data?.data?.accessToken
		const hasTwoFactor = loginMutation?.data?.data?.hasTwoFactor

		if (token) {
			Cookies.set('access_token', token)
			if (hasTwoFactor === false) {
				navigate('/2fa')
			} else {
				navigate('/')
			}
		}
	}

	const awaitingEmailVerification =
		loginMutation?.data?.data?.awaitingEmailVerification

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
				<div className={`pt-12 pb-6 px-8 bg-white border ${styles.greyBorder}`}>
					<img
						alt="Foodstaram Logo"
						className="h-10 ml-auto mr-auto mb-8"
						src={Foostaram}
					/>
					{loginMutation.isError && (
						<div className="my-8 bg-red-300 rounded-lg p-4 text-center">
							{loginMutation.error instanceof AxiosError &&
							loginMutation.error?.response?.status === 401
								? loginMutation.error.response.data.message
								: 'Invalid credentials, please try again'}
						</div>
					)}

					{loginMutation.isSuccess && (
						<div className="my-8 bg-green-300 rounded-lg p-4 text-center">
							{awaitingEmailVerification
								? 'Your account is not verified. Please check your email!'
								: `Welcome ${loginMutation?.data?.data?.data?.name}! You've logged in succesfully!`}
						</div>
					)}
					<Form
						onSubmit={(data) => {
							loginMutation.mutate({
								email: data['email'],
								password: data['password'],
								otp: data['otp'],
							})
						}}
					>
						<InputField
							placeholder="Email address"
							type="email"
							name="email"
							autoComplete="foostagram-email"
							onChange={(val: string) => {
								has2FAMutation.mutate({ email: val })
							}}
							required
						/>
						<InputField
							placeholder="Password"
							type="password"
							name="password"
							autoComplete="foostagram-password"
							required
						/>

						<InputField
							placeholder="2FA Token"
							type={
								has2FAMutation.isSuccess
									? has2FAMutation.data?.data.enabled
										? 'number'
										: 'hidden'
									: 'hidden'
							}
							name="otp"
							autoComplete="foostagram-otp"
						/>
						<div className="mb-6" />
						{/*<p className="text-xs text-center text-gray-400 mt-2 mb-6">
							<a className="font-medium text-gray-500" href="/">
								Forgotten your password?
							</a>
					</p>*/}
						<SubmitButton text="Log In" loading={loginMutation.isLoading} />
					</Form>
					<p className="text-sm text-center pt-3">
						<a className="text-insta-green" href="/passwordreset">
							Forgot password?
						</a>
					</p>
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
