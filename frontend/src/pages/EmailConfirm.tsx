import styles from '../styles/Login.module.css'
import Foostaram from '../images/Foostaram.svg'
import InputField from '../components/form/InputField'
import SubmitButton from '../components/form/SubmitButton'
import Form from '../components/form/Form'
import { useNavigate } from 'react-router-dom'
import useTwoFAQuery from '../api/UseTwoFAQuery'
import useAuth from '../api/util/useAuth'
import Spinner from '../components/common/Spinner'
import UseTwoFactorMutation from '../api/UseTwoFactorMutation'
import UseConfirmEmailMutation from '../api/UseConfirmEmailMutation'

const EmailConfirm = () => {
	const navigate = useNavigate()
	const emailConfirmMutation = UseConfirmEmailMutation()

	if (
		emailConfirmMutation.isLoading === false &&
		emailConfirmMutation.isSuccess
	) {
		navigate('/')
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

				<p className="text-xs text-center text-gray-700 mt-2 mb-6 text-md">
					You must confirm your email address after creating an account. Check
					your emails for the code.
				</p>
			</div>
			<div className={`flex flex-col justify-center flex-auto w-14`}>
				<div className={`pt-12 pb-6 px-8 bg-white border ${styles.greyBorder}`}>
					<img
						alt="Foodstaram Logo"
						className="h-10 ml-auto mr-auto mb-8"
						src={Foostaram}
					/>
					{emailConfirmMutation.isError && (
						<div className="my-8 bg-red-300 rounded-lg p-4 text-center">
							Invalid Code, please try again.
						</div>
					)}
					<Form
						onSubmit={(data) => {
							emailConfirmMutation.mutate({
								code: data['code'],
							})
						}}
					>
						<p className="text-xs text-center text-gray-700 mt-2 mb-6">
							Enter the code email to you below!
						</p>

						<InputField
							placeholder="Confirmation Code"
							type="text"
							name="code"
							autoComplete="foostagram-code"
							required
						/>
						<div className="mb-4" />
						<SubmitButton text="Confirm Email" loading={false} />
					</Form>
				</div>
				<div className={`mt-2 py-4 px-8 bg-white border ${styles.greyBorder}`}>
					<p className="text-sm text-center">
						Already have a valid account?{' '}
						<a className="text-insta-green" href="/login">
							Log In
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default EmailConfirm
