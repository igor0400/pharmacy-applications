import Spinner from 'react-bootstrap/Spinner';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <Spinner
        animation="border"
        variant="success"
      />
    </div>
  );
};

export default Loading;
