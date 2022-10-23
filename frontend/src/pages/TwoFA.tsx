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

const TwoFA = () => {
	const navigate = useNavigate()
	const qrQuery = useTwoFAQuery()
	const enableTwoFactorMutation = UseTwoFactorMutation()
	const [account, isLoading] = useAuth()

	if (
		(qrQuery.isLoading === false && qrQuery.data?.data.redirect) ||
		(enableTwoFactorMutation.isSuccess &&
			enableTwoFactorMutation.data?.data.valid)
	) {
		navigate('/')
	}

	return (
		<div className="m-12 w-4/5 h-full ml-auto mr-auto flex max-w-[750px]">
			<div className="hidden md:block flex-auto w-32 mr-8">
				{qrQuery.isLoading ? (
					<Spinner />
				) : (
					<img
						alt="Promotional screenshots of the website"
						src={qrQuery.data?.data.qr}
						width={380}
						height={581}
					/>
				)}
				<p className="text-xs text-center text-gray-700 mt-2 mb-6 text-md">
					Simply download your preferred authenticator app & scan the QR code on
					the left. Then enter the one time code provided to the right!
				</p>
			</div>
			<div className={`flex flex-col justify-center flex-auto w-14`}>
				<div className={`pt-12 pb-6 px-8 bg-white border ${styles.greyBorder}`}>
					<img
						alt="Foodstaram Logo"
						className="h-10 ml-auto mr-auto mb-8"
						src={Foostaram}
					/>
					{(enableTwoFactorMutation.isError ||
						(enableTwoFactorMutation.isSuccess &&
							enableTwoFactorMutation.data?.data.valid === false)) && (
						<div className="my-8 bg-red-300 rounded-lg p-4 text-center">
							Invalid One Time Password, please try again.
						</div>
					)}
					<Form
						onSubmit={(data) => {
							enableTwoFactorMutation.mutate({
								otp: data['otp'],
							})
						}}
					>
						<p className="text-xs text-center text-gray-700 mt-2 mb-6">
							Secure your account by enabling Two Factor Authentication!
						</p>

						<InputField
							placeholder="Authenticator Code"
							type="number"
							name="otp"
							autoComplete="foostagram-otp"
							required
						/>
						<div className="mb-4" />
						<SubmitButton text="Enable 2FA" loading={false} />
					</Form>
				</div>
				<div className={`mt-2 py-4 px-8 bg-white border ${styles.greyBorder}`}>
					<p className="text-sm text-center">
						<a className="text-insta-green font-medium" href="/">
							Skip Two Factor Authentication
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default TwoFA
