import React, { useState } from 'react'

import styles from '../../styles/Form.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	initialValue?: string;
	ref: React.Ref<HTMLInputElement>;
}

const InputField = ({ initialValue = "", ...props }: Props, ref: any) => {
	const [value, setValue] = useState(initialValue)
	return (
		<input
			{...props}
			className={`p-2 w-full rounded-sm mb-2 border hover:border-gray-500 focus-visible:border text-xs bg-white ${styles.greyBackground}`}
			ref={ref}
			value={value}
			onChange={(event) => setValue(event.target.value)}
		/>
	)
}

export default React.forwardRef(InputField);
