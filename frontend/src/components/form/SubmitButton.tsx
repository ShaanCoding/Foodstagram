interface Props {
	text: string
}

const SubmitButton = (props: Props) => {
	const { text } = props

	return (
		<button
			className="w-full bg-insta-green text-white text-sm p-[5px] rounded-md font-medium"
			type="submit"
		>
			{text}
		</button>
	)
}

export default SubmitButton