import Image from "next/image"

interface Props {
	title: string;
	imgUrl : string;
}
const Thumbnail : React.FC<Props> =   (props) => {
	
	return (
		<Image
		alt={props.title + '이미지'}
		src={props.imgUrl}
		fill={true}
		loading="lazy"
		placeholder="blur"
		blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
		className='object-cover'
	  />
	)
}



export default Thumbnail