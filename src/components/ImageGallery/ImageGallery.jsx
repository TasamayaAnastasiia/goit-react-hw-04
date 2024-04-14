import ImageCard from "../ImageCard/ImageCard";
import css from '../ImageGallery/ImageGallery.module.css';

const ImageGallery = ({list, onOpen}) => {
    return (
        <ul className={css.list}>
            {list.map(image => (
                <li className={css.image} key={image.id}>
                    <ImageCard image={image} onOpen={onOpen}></ImageCard>
	            </li>
            ))}
        </ul>
    );
}
export default ImageGallery;