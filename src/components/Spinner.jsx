import { BeatLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
};

const Spinner = ({ color = '#000000', size = '15px' }) => {
  return (
    <BeatLoader
      color={color}
      size={size}
      cssOverride={override}
      aria-label='Loading...'
    />
  );
};

export default Spinner;
