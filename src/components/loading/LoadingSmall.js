import Spinner from 'react-bootstrap/Spinner';
import './Loading.css';

const LoadingSmall = () => {
  return (
    <div className="loading-small">
      <Spinner animation="border" size="sm"/>
    </div>
  );
};

export default LoadingSmall;
