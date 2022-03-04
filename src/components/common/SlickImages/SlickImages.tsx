import { some } from '@const/keyString';
import { Image, Row } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { hotel, room } from './dataRaw';
import styles from './SlickImages.module.scss';
interface SlickImagesProps {
  /**
   * image array
   */
  images: any[];
  /**
   * type display
   */
  type: string;
}

const SlickImages: FunctionComponent<SlickImagesProps> = (props) => {
  const { images, type } = props;
  const [imgs, setImgs]=useState<any[]>([]);
  const imgDefault = useCallback((type: string) => {
    if(images && images?.length > 0){
      setImgs(imgs)
    }
    else{
    switch (type) {
      case 'hotel':
        setImgs(hotel);
        break;
      case 'room':
        setImgs(room);
        break;
      default:
        setImgs(hotel);
        break;
    }
  }
  },[images, imgs]);
  useEffect(()=>{
    imgDefault(type)
  },[imgDefault, type])
  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    customPaging: (i) => (
      <a key={i}>
        <Image
          preview={false}
          src={
            images && images?.length > 0
              ? images[i]
              : imgs?.[i]?.image
          }
          width={60}
          height={45}
        />
      </a>
    ),
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1000,
    cssEase: 'linear',
  };
  return (
    <Row className={styles['slick-images']}>
      <Slider {...settings} className={styles['slider']}>
        { imgs.map((d: some) => (
          <Image key={d?.id} src={d?.image} width={380} height={195} />
        ))}
      </Slider>
    </Row>
  );
};

export default SlickImages;
