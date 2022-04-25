import error from './404.svg';
import './ErrorMessage.css';

const ErrorMessage = () => {
  return (
    <div className="error">
      <img src={error} alt="error" />
      <p>
        Что то пошло не так. Проверьте подключение к интернету и попробуйте
        снова{' '}
      </p>
    </div>
  );
};

export default ErrorMessage;
