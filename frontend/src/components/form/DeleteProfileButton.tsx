import Spinner from '../common/Spinner'

interface Props {
	text: string
	loading?: boolean
}

const DeleteProfileButton = (props: Props) => {
	const { text, loading } = props

	return (
		<button
			className="px-5 py-2 font-semibold text-sm border rounded bg-red-600 hover:bg-red-700 text-white"
			type="submit"
			disabled={loading}
		>
			{loading ? <Spinner /> : text}
		</button>
	)
}

DeleteProfileButton.defaultProps = {
	loading: false,
}

export default DeleteProfileButton
