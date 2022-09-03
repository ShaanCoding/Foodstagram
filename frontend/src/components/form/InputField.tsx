import styles from '../../styles/Form.module.css'

interface Props {
	placeholder: string
	type?: string
}

const InputField = (props: Props) => {
	const { placeholder, type } = props

	return (
		<input
			className={`p-2 w-full rounded-sm mb-2 border hover:border-gray-500 focus-visible:border text-xs bg-white ${styles.greyBackground}`}
			placeholder={placeholder}
			type={type}
		/>
	)
}

InputField.defaultProps = {
	type: 'text',
}

export default InputField
