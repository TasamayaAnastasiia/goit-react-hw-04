import { useEffect, useState } from 'react';
import './App.css';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import SearchBar from './components/SearchBar/SearchBar';
import { Audio } from 'react-loader-spinner';
import { fetchImage } from './image-api';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

function App() {

  const [inputValue, setInputValue] = useState(''); 
  const [listImages, setListImages] = useState([]);
  const [loader, setLoader] = useState(false); 
  const [totalImages, setTotalImages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenError, setIsOpenError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageDate, setSelectedImageDate] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        setIsOpenError(false);

        const images = await fetchImage(inputValue, currentPage);

        if (currentPage === 1) {
          setListImages([]);
        }

        if (images.results.length === 0) {
          setListImages([]);
          setTotalImages(0);
          toast.error(`Nothing found for your search: ${inputValue}`, { position: "bottom-center" });  
        } else {
          setListImages(prevList => [...prevList, ...images.results]);
          setTotalImages(images.total);
          setTotalPages(images.total_pages);
          toast.success(`Succes! Your data have been recorded`, { position: "bottom-center" })
        }
      } catch (error) {
        toast.error(`Error fetching images: ${error.message}`, { position: "bottom-center" });
        setIsOpenError(true);
        setListImages([]);
        setTotalImages(0);
        setCurrentPage(1);
      } finally {
        setLoader(false);
      }
    }

    if(inputValue) {
      fetchData();
    }

  }, [inputValue, currentPage]);

  const handleLoadMoreClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const openModal = (image, date) => {
    setSelectedImage(image);
    setModalIsOpen(true);
    setSelectedImageDate(date);
  }

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
    setSelectedImageDate('');
  }
  
  return (
    <>
      <SearchBar onSearch={(value) => setInputValue(value)} onReset={(valueOne, valueTwo) => {setTotalImages(valueOne), setListImages(valueTwo)}} onPage={(value) => setCurrentPage(value)}/>
      {listImages.length > 0 && <ImageGallery list={listImages} onOpen={openModal} />}
      {loader && <Loader><Audio height="50" width="30" radius="3" color="#201985" ariaLabel="three-dots-loading" wrapperStyle wrapperClass /></Loader>}
      <Toaster />
      {totalImages > 12 && !loader && currentPage !== totalPages && <LoadMoreBtn onClick={handleLoadMoreClick}/>}
      {isOpenError && <ErrorMessage />}
      <ImageModal onClose={closeModal} isOpen={modalIsOpen} imageUrl={selectedImage} date={selectedImageDate} />
    </>
  )
}

export default App;
