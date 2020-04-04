import { useEffect } from 'react';

const useRefEffect = ({ effect, ref = {} }) => {
  useEffect(() => {
    effect( ref.current );
  }, [ref]);
};

export default useRefEffect;
