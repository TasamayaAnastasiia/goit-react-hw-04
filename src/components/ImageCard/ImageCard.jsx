const ImageCard = ({image, onOpen}) => {
    return (
        <div>
            <img onClick={() => onOpen(image.urls.regular, image.created_at)} width="350" height="267" src={image.urls.small} alt=""/>
        </div>
    );
}
export default ImageCard;