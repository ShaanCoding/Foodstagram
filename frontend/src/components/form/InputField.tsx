import { useState } from 'react'
import styles from '../../styles/Form.module.css'

interface Props {
	name: string
	placeholder: string
	type?: string
	initialValue?: string
}

const InputField = (props: Props) => {
	const { placeholder, type, name, initialValue } = props

	const [value, setValue] = useState(initialValue)

	return (
		<input
			className={`p-2 w-full rounded-sm mb-2 border hover:border-gray-500 focus-visible:border text-xs bg-white ${styles.greyBackground}`}
			placeholder={placeholder}
			value={value}
			type={type}
			name={name}
			onChange={(event)=>{
				setValue(event.target.value)
			}}
		/>
	)
}

InputField.defaultProps = {
	type: 'text',
	initialValue: '',
}

export default InputField
