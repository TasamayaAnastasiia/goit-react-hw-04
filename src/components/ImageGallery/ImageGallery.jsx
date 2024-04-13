import ImageCard from "../ImageCard/ImageCard";
import css from '../ImageGallery/ImageGallery.module.css';

const ImageGallery = ({list, onOpen}) => {
    return (
        <ul className={css.list}>
            {list.map(image => (
                <li className={css.image} key={image.id} onClick={() => onOpen(image.urls.regular, image.created_at)}>
                    <ImageCard image={image}></ImageCard>
	            </li>
            ))}
        </ul>
    );
}
export default ImageGallery;