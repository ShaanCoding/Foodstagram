import classnames from "classnames";
import { useEffect, useRef, useState } from "react";

interface CarouselProps {
	pictures: string[];
}

const Carousel = ({ pictures }: CarouselProps) => {

	const [index, setIndex] = useState(0);

	const previousPicture = () => setIndex(index => Math.max(0, index - 1));
	const nextPicture = () => setIndex(index => Math.min(pictures.length - 1, index + 1));

	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		container.current?.scrollTo({
			left: container.current?.clientWidth * index,
			behavior: "smooth"
		});
	}, [index]);

	const buttonCSS = "absolute bottom-2/4 bg-white rounded-full w-5 h-5 text-center align-middle leading-4 font-bold hidden group-hover:block";

	return (
		<div className="flex flex-row relative w-full group">
			{ pictures.length > 1 && <button onClick={previousPicture} className={classnames(buttonCSS, "left-2")} disabled={index === 0}>&lt;</button> }
			<div className="flex overflow-auto snap-x snap-mandatory h-80" ref={container}>
				{
					pictures.map((picture, index) => (
						<img src={picture} key={index} alt={`Picture # ${index}`} className="h-full aspect-auto" loading="lazy" />
					))
				}
			</div>
			{ pictures.length > 1 && <button onClick={nextPicture} className={classnames(buttonCSS, "right-2")} disabled={index === pictures.length - 1}>&gt;</button> }
		</div>
	);
}

export default Carousel;