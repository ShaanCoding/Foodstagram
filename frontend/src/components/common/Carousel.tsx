import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import NextIcon from '../../images/next.png'
import PreviousIcon from '../../images/previous.png'

interface CarouselProps {
	pictures: string[]
}

const Carousel = ({ pictures }: CarouselProps) => {
	const [index, setIndex] = useState(0)

	const previousPicture = () => setIndex((index) => Math.max(0, index - 1))
	const nextPicture = () =>
		setIndex((index) => Math.min(pictures.length - 1, index + 1))

	const container = useRef<HTMLDivElement>(null)

	useEffect(() => {
		container.current?.scrollTo({
			left: container.current?.clientWidth * index,
			behavior: 'smooth',
		})
	}, [index])

	const buttonCSS =
		'absolute bottom-2/4 w-5 h-5 hidden opacity-75 cursor-pointer group-hover:block'

	return (
		<div className="flex flex-row relative w-full group">
			{pictures.length > 1 && (
				<img
					src={PreviousIcon}
					onClick={previousPicture}
					alt="Previous"
					className={classnames(buttonCSS, 'left-2')}
				/>
			)}
			<div className="flex snap-x snap-mandatory h-80 w-full" ref={container}>
				{pictures.map((picture, i) => (
					<img
						src={picture}
						key={i}
						alt={`Picture # ${i}`}
						width={i === index ? '100%' : '0px'}
						className="h-full object-cover"
						loading="lazy"
					/>
				))}
			</div>
			{pictures.length > 1 && (
				<img
					src={NextIcon}
					onClick={nextPicture}
					alt="Next"
					className={classnames(buttonCSS, 'right-2')}
				/>
			)}
			<span className="absolute right-0 bottom-0 text-white bg-black/50 p-1 text-xs">
				{index + 1} / {pictures.length}
			</span>
		</div>
	)
}

export default Carousel
