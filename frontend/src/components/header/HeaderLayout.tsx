import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
	children: ReactNode
}

const headerlessRoutes = [
	'/login',
	'/register',
	'/passwordreset',
	'/email/confirm',
]

const HeaderLayout = (props: Props) => {
	const { children } = props
	const { pathname } = useLocation()

	return <div>{headerlessRoutes.includes(pathname) ? null : children}</div>
}

export default HeaderLayout
