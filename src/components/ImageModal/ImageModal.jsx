import Modal from 'react-modal';
import css from '../ImageModal/ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, imageUrl, date}) => {

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        content: {
            display: 'flex',
            flexDirection: 'row',
            padding: '0',
            gap: '40px',
            width: '1200px',
            inset: '40px 100px' ,
            margin: 'auto',
        },
      };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Image Modal" style={customStyles}>
        <img style={{ width: '900px', height: '100%', borderRadius: '10px' }} src={imageUrl}></img>
        <div>
            <p><b>Date created: {date}</b></p>
        </div>
    </Modal>
  );
};

export default ImageModal;