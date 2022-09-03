import styles from '../styles/Register.module.css'
import Foostaram from '../images/Foostaram.svg'
import InputField from '../components/form/InputField'
import SubmitButton from '../components/form/SubmitButton'

const Register = () => {
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
					<form>
						<InputField placeholder="Email address" type="email" />
						<InputField placeholder="Full Name" />
						<InputField placeholder="Username" />
						<InputField placeholder="Password" type="password" />
						<p className="text-xs text-center text-gray-400 mt-2 mb-6">
							People who use our service may have uploaded your contact
							information to Instagram.
							{' '}
							<a className="font-medium text-gray-500" href="/">
								Learn more
							</a>
							<br />
							<br />
							By signing up, you agree to our
							{' '}
							<a className="font-medium text-gray-500" href="/">
								Terms
							</a>
							,
							{' '}
							<a className="font-medium text-gray-500" href="/">
								Privacy Policy
							</a>
							{' '}
							and
							{' '}
							<a className="font-medium text-gray-500" href="/">
								Cookies Policy
							</a>
							.
						</p>
						<SubmitButton text="Sign Up" />
					</form>
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
