import Spinner from '../common/Spinner'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	loading?: boolean;
}

const SubmitButton = ({ loading, text, ...props }: Props) => {
	return (
		<button
			{ ...props }
			className="w-full bg-insta-green text-white text-sm p-[5px] rounded-md font-medium"
			type="submit"
			disabled={loading}
		>
			{loading ? <Spinner /> : text}
		</button>
	)
}

SubmitButton.defaultProps = {
	loading: false,
}

export default SubmitButton
