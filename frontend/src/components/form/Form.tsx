interface Props {
	onSubmit: (formData: { [key: string]: string }) => void
	children: any
}

const Form = (props: Props) => {
	const { onSubmit, children } = props

	const FormSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log(e.currentTarget)
		if (e.target !== null) {
			const formData = new FormData(e.target as HTMLFormElement)

			let jsonData: { [key: string]: string } = {}

			for (let [key, value] of formData.entries()) {
				jsonData[key] = value.toString()
			}

			onSubmit(jsonData)
		}
	}
	return <form onSubmit={FormSubmit}>{children}</form>
}

export default Form
