/* eslint-disable jsx-a11y/anchor-is-valid */
import { some } from "@const/keyString";
import { Image, Row } from "antd";
import clsx from "clsx";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { banner, hotel, room } from "./dataRaw";
import styles from "./SlickImages.module.scss";
interface SlickImagesProps {
  /**
   * image array
   */
  images: some[];
  /**
   * type display
   */
  type: string;
  /**
   * is mobile ver
   */
  isMobile: boolean;
}

const SlickImages: FunctionComponent<SlickImagesProps> = (props) => {
  const { images, type, isMobile } = props;
  const [imgs, setImgs] = useState<any[]>([]);
  const imgDefault = useCallback(
    (type: string) => {
      if (images && images?.length > 3) {
        setImgs(images);
      } else {
        switch (type) {
          case "hotel":
            setImgs(hotel);
            break;
          case "room":
            setImgs(room);
            break;
          case "banner":
            setImgs(banner);
            break;
          default:
            setImgs(hotel);
            break;
        }
      }
    },
    [images]
  );
  useEffect(() => {
    imgDefault(type);
  }, [imgDefault, type]);
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    customPaging: (i) => (
      <a key={i}>
        <Image
          // key={imgs[i].ID_IMG}
          preview={false}
          src={
            images && images?.length > 3 ? images?.[i]?.Image : imgs?.[i]?.Image
          }
          width={isMobile ? 50 : 60}
          height={isMobile ? 20 : 45}
        />
      </a>
    ),
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };
  return (
    <Row className={clsx(styles["slick-images"], isMobile && styles["mobile"])}>
      {console.log("images", images)}
      <Slider {...settings} className={styles["slider"]}>
        {imgs.map((d: some) => (
          <Image
            key={d?.ID_IMG}
            src={d?.Image}
            width={isMobile ? 100 : 380}
            height={isMobile ? 90 : 195}
          />
        ))}
      </Slider>
    </Row>
  );
};

export default SlickImages;
