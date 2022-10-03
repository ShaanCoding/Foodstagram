import Spinner from '../common/Spinner'

interface Props {
	text: string
	loading?: boolean
}

const SubmitButtonProfilePic = (props: Props) => {
	const { text, loading } = props

	return (
		<button
			className="mt-1 px-3 py-2 font-semibold text-xs border rounded bg-insta-green hover:bg-green-500 text-white"
			type="submit"
			disabled={loading}
		>
			{loading ? <Spinner /> : text}
		</button>
	)
}

SubmitButtonProfilePic.defaultProps = {
	loading: false,
}

export default SubmitButtonProfilePic
