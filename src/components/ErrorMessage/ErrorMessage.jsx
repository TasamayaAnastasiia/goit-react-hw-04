import css from '../ErrorMessage/ErrorMessage.module.css';

const ErrorMessage = (props) => {
    return (
        <div className={css.contentError}><p className={css.error}>Request error, please enter the correct search term</p></div>
    )
}
export default ErrorMessage;