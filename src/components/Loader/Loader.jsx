import css from '../Loader/Loader.module.css'

const Loader = ({ children }) => {
  return (
    <div className={css.loaderContainer}>
      <div className={css.loader}>{children}</div>
    </div>
  );
};

export default Loader;
