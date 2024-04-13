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
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpenError, setIsOpenError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageDate, setSelectedImageDate] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      setIsOpenError(false);
      if (!inputValue) {
        toast.error("Please enter a search value", { position: "bottom-center" });      //field is empty
        return;
      }

      const images = await fetchImage(inputValue, currentPage);
      if (images.results.length === 0) {
        setListImages([]);
        setTotalImages(0);
        toast.error(`Nothing found for your search: ${inputValue}`, { position: "bottom-center" });   //don't has images
      } else {
        setListImages(images.results);
        setTotalImages(images.total);
        setCurrentPage(currentPage + 1);
        setTotalPages(images.total_pages);
      }
    } catch (error) {
      toast.error(`Error fetching images: ${error.message}`, { position: "bottom-center" });      //error request
      setIsOpenError(true);
      setListImages([]);
      setTotalImages(0);
      setCurrentPage(0);
    } finally {
      setLoader(false);
    }
  };

  const loadMoreImages = async () => {
    try {
      setLoader(true);
      setIsOpenError(false);
      const nextPage = currentPage + 1;                                                               //next page
      const images = await fetchImage(inputValue, nextPage);
      setListImages([...listImages, ...images.results]);
      setCurrentPage(nextPage);
    } catch (error) {
      toast.error(`Error loading more images: ${error.message}`, { position: "bottom-center" });    
      setIsOpenError(true);
      setListImages([]);
      setTotalImages(0);
      setCurrentPage(0);
    } finally {
      setLoader(false);
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
      <SearchBar onSubmit={handleSubmit} onChange={handleChange} />
      {listImages.length > 0 && <ImageGallery list={listImages} onOpen={openModal} />}
      {loader && <Loader><Audio height="50" width="30" radius="3" color="#201985" ariaLabel="three-dots-loading" wrapperStyle wrapperClass /></Loader>}
      <Toaster />
      {totalImages > 12 && !loader && currentPage !== totalPages && <LoadMoreBtn onClick={loadMoreImages} />}
      {isOpenError && <ErrorMessage />}
      <ImageModal onClose={closeModal} isOpen={modalIsOpen} imageUrl={selectedImage} date={selectedImageDate} />
    </>
  )
}

export default App;
