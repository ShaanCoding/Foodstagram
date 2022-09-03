import styles from '../styles/Login.module.css'
import Foostaram from '../images/Foostaram.svg'
import InputField from '../components/form/InputField'
import SubmitButton from '../components/form/SubmitButton'

const Login = () => {
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
						className="h-10 ml-auto mr-auto"
						src={Foostaram}
					/>
					<form className="mt-8">
						<InputField placeholder="Email address" type="email" />
						<InputField placeholder="Password" type="password" />
						<p className="text-xs text-center text-gray-400 mt-2 mb-6">
							<a className="font-medium text-gray-500" href="/">
								Forgotten your password?
							</a>
						</p>
						<SubmitButton text="Log In" />
					</form>
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
