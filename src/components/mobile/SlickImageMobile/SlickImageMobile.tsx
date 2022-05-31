import { FunctionComponent } from "react";
import styles from "./SlickImageMobile.module.scss";
import { Image } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import clsx from "clsx";

interface SlickImageMobileProps {
  /**
   * image array
   */
  images: any[];
  /**
   * class style
   */
  classes?: {
    container?: string;
  };
  /**
   * speed
   */
  speed?:number;
  /**
   * autospeed
   */
  autoSpeed?:number;
}

const SlickImageMobile: FunctionComponent<SlickImageMobileProps> = (props) => {
  const { images, classes } = props;
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2500,
    cssEase: "linear",
  };
  return (
    <div className={clsx(styles["slick-image-mobile"], classes?.container)}>
      <Slider {...settings} className={styles["slider"]}>
        {images.map((d: any) => (
          <Image
            wrapperClassName={styles["image"]}
            key={d?.ID_IMG}
            src={d?.Image}
            width={"100%"}
            height={300}
          />
        ))}
      </Slider>
    </div>
  );
};

export default SlickImageMobile;
