const ImageCard = ({image}) => {
    return (
        <div>
            <img width="350" height="267" src={image.urls.small} alt=""/>
        </div>
    );
}
export default ImageCard;