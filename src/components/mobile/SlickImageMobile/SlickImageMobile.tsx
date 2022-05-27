import { FunctionComponent } from "react";
import styles from "./SlickImageMobile.module.scss";
import { Image } from "antd";
import Slider from "react-slick";

interface SlickImageMobileProps {
  /**
   * image array
   */
  images: any[];
}

const SlickImageMobile: FunctionComponent<SlickImageMobileProps> = (props) => {
  const { images } = props;
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // customPaging: (i) => (
    //   <a key={i}>
    //     <Image
    //       // key={imgs[i].ID_IMG}
    //       preview={false}
    //       src={images[i]?.src}
    //       width={60}
    //       height={45}
    //     />
    //   </a>
    // ),
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };
  return (
    <div className={styles["slick-image-mobile"]}>
      <Slider {...settings} className={styles["slider"]}>
        {images.map((d: any) => (
          <Image key={d?.ID_IMG} src={d?.Image} width={"45vw"} height={120} />
        ))}
      </Slider>
    </div>
  );
};

export default SlickImageMobile;
