import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import dots from '../../images/dots.png'

export function ContextMenu({ children }: ContextMenuProps) {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen((isOpen) => !isOpen)
	const openButton = useRef<HTMLButtonElement>(null)
	const menu = useRef<HTMLUListElement>(null)

	// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				isOpen &&
				!menu.current!.contains(event.target as Node | null) &&
				!openButton.current!.contains(event.target as Node | null)
			)
				setIsOpen(false)
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [menu, isOpen])

	return (
		<div className="relative inline-block">
			<button ref={openButton} onClick={toggle}>
				<img src={dots} alt="Menu" className="h-5 inline-block" />
			</button>
			<ul
				ref={menu}
				className={classnames(
					{ hidden: !isOpen },
					'flex flex-col list-none absolute z-10 rounded-md shadow-lg bg-white w-max left-5 top-0'
				)}
			>
				{children}
			</ul>
		</div>
	)
}

interface ContextMenuProps {
	children: React.ReactNode
}
