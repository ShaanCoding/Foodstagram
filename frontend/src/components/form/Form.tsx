import React from "react";

interface Props {
	onSubmit: <T>(formData: Record<string, string> & T) => void
	children: React.ReactNode
}

const Form = (props: Props) => {
	const { onSubmit, children } = props

	const FormSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log(e.currentTarget)
		if (e.target !== null) {
			const formData = new FormData(e.target as HTMLFormElement)
			const jsonData = Object.fromEntries([...formData.entries()].map(([key, value]) => [key, value.toString()]));
			onSubmit(jsonData)
		}
	}
	return <form onSubmit={FormSubmit}>{children}</form>
}

export default Form
