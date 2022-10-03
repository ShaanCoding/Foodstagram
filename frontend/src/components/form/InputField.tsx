import { useState } from 'react'

import styles from '../../styles/Form.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	initialValue?: string
}

const InputField = (props: Props) => {
	const [value, setValue] = useState(props.initialValue)
	return (
		<input
			{...props}
			className={`p-2 w-full rounded-sm mb-2 border hover:border-gray-500 focus-visible:border text-xs bg-white ${styles.greyBackground}`}
			value={value}
			onChange={(event) => {
				setValue(event.target.value)
			}}
		/>
	)
}

InputField.defaultProps = {
	initialValue: '',
}

export default InputField
