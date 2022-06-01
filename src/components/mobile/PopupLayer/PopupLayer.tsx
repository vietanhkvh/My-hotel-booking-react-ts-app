import clsx from 'clsx';
import { FunctionComponent, ReactNode } from 'react';
import styles from './PopupLayer.module.scss';
interface PopupLayerProps {
  /**
   * content
   */
  children: ReactNode;
  /**
   * is active
   */
  isActive: boolean;
  /**
   * set searching
   */
  setIsActive?: (par: boolean) => void;
  /**
   * class name for the container
   */
  classContainer?: string;
}

const PopupLayer: FunctionComponent<PopupLayerProps> = (props) => {
  const { children, isActive, setIsActive, classContainer } = props;
  return isActive ? (
    <div
      className={clsx(classContainer, styles['popup-layer'])}
      onClick={() => {
        setIsActive && setIsActive(false);
      }}
    >
      {children}
    </div>
  ) : null;
};

export default PopupLayer;
