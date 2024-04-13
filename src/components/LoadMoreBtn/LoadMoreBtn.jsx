import css from '../LoadMoreBtn/LoadMoreBtn.module.css';

const LoadMoreBtn = ({onClick}) => {
    return (
        <div className={css.boxBtn}>
            <button onClick={onClick} className={css.btnLoad} type="button">Load More</button>
        </div>
    )
}
export default LoadMoreBtn;