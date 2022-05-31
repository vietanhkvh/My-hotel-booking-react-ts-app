import { FunctionComponent } from 'react';
import styles from './HorizontalBoxes.module.scss';
interface HotelBoxesProps {
}

const HotelBoxes: FunctionComponent<HotelBoxesProps> = (props) => {
  const {children} =props;
  return (
    <div className={styles['hotel-boxes']}>
      <div className={styles['hotel-inner-card']}>
        {children}
      </div>
    </div>
  );
};

export default HotelBoxes;
