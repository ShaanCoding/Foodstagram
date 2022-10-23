import styles from '../styles/Register.module.css'
import Foostaram from '../images/Foostaram.svg'
import InputField from '../components/form/InputField'
import SubmitButton from '../components/form/SubmitButton'
import UseRegisterMutation from '../api/UseRegisterMutation'
import Form from '../components/form/Form'
import { AxiosError } from 'axios'

const Register = () => {
	const registerMutation = UseRegisterMutation()

	if (registerMutation.isError) {
		console.log(registerMutation.error)
	}

	return (
		<div className="m-12 w-4/5 h-full ml-auto mr-auto flex max-w-[750px]">
			<div className="hidden md:block flex-auto w-32 mr-8 mt-6">
				<img
					alt="Promotional screenshots of the website"
					src="/images/login/login-screenshot.png"
					width={380}
					height={581}
				/>
			</div>
			<div className={`flex-auto w-14`}>
				<div className={`py-12 px-8 bg-white border ${styles.greyBorder}`}>
					<img
						alt="Foodstaram Logo"
						className="h-10 ml-auto mr-auto"
						src={Foostaram}
					/>
					<p className="font-medium text-lg text-gray-500 text-center mt-4 mb-8">
						Sign up to see food photos from your friends.
					</p>
					{registerMutation.isError && (
						<div className="my-8 bg-red-300 rounded-lg p-4 text-center">
							{`Failed to create account. ${
								registerMutation.error instanceof AxiosError &&
								registerMutation.error?.response?.status === 400
									? registerMutation.error.response.data.message
									: ''
							}`}
						</div>
					)}

					{registerMutation.isSuccess && (
						<div className="my-8 bg-green-300 rounded-lg p-4 text-center">
							{`Welcome, you've succesfully created an account. Please check your email for a verification code!`}
						</div>
					)}
					<Form
						onSubmit={(data) => {
							registerMutation.mutate({
								fullName: data['fullName'],
								username: data['username'],
								email: data['email'],
								password: data['password'],
							})
						}}
					>
						<InputField
							placeholder="Email address"
							type="email"
							name="email"
							autoComplete="foostagram-email"
							required
						/>
						<InputField
							placeholder="Full Name"
							name="fullName"
							autoComplete="false"
							required
						/>
						<InputField
							placeholder="Username"
							name="username"
							autoComplete="false"
							required
						/>
						<InputField
							placeholder="Password"
							type="password"
							name="password"
							autoComplete="foostagram-password"
							required
						/>
						<p className="text-xs text-center text-gray-400 mt-2 mb-6">
							By signing up, you agree to our{' '}
							<a className="font-medium text-gray-500" href="/">
								Terms
							</a>
							,{' '}
							<a className="font-medium text-gray-500" href="/">
								Privacy Policy
							</a>{' '}
							and{' '}
							<a className="font-medium text-gray-500" href="/">
								Cookies Policy
							</a>
							.
						</p>
						<SubmitButton text="Sign Up" loading={registerMutation.isLoading} />
					</Form>
				</div>
				<div className={`mt-2 py-4 px-8 bg-white border ${styles.greyBorder}`}>
					<p className="text-sm text-center">
						Have an account?{' '}
						<a className="text-insta-green" href="/login">
							Log In
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Register
