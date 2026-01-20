import { useStore } from '@/stores/DBStore';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const Detected = () => {
  const { addFaces } = useStore();
  const { state } = useLocation();

  useEffect(() => {
    try {
      addFaces(state);
    } catch (error) {
      console.error('Error adding faces:', error);
    }
  }, []);

  return <div>Detected</div>;
};

export default Detected;
