import { useState } from 'react'
import styles from '../../styles/Form.module.css'

interface Props {
	name: string
	placeholder: string
	type?: string
	initialValue?: string
}

const InputFieldProfile = (props: Props) => {
	const { placeholder, type, name, initialValue } = props

	const [value, setValue] = useState(initialValue)

	return (
		<input
			className={`w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none`}
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

InputFieldProfile.defaultProps = {
	type: 'text',
	initialValue: '',
}

export default InputFieldProfile
