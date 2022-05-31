import { FunctionComponent } from "react";
import styles from "./MySlick.module.scss";
interface MySlickProps {
   /**
   * image array
   */
    content: any;
    /**
     * class style
     */
    classes?: {
      container?: string;
    };
}
 
const MySlick: FunctionComponent<MySlickProps> = () => {
  const settings = {
    dots: false,
    infinite: true,
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // autoplay: true,
    speed: 1500,
    // autoplaySpeed: 1500,
    cssEase: "linear",
  };
  return <div className={styles['my-slick']}>MySlick</div>;
}
 
export default MySlick;