import Spinner from '../common/Spinner'

interface Props {
	text: string
	loading?: boolean
}

const SubmitButtonProfile = (props: Props) => {
	const { text, loading } = props

	return (
		<button
			className="my-5 px-5 py-2 font-semibold text-sm border rounded bg-insta-green hover:bg-green-500 text-white"
			type="submit"
			disabled={loading}
		>
			{loading ? <Spinner /> : text}
		</button>
	)
}

SubmitButtonProfile.defaultProps = {
	loading: false,
}

export default SubmitButtonProfile
