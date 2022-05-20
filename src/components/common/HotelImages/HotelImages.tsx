import { some } from "../../../const/keyString";
import { Row } from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import SlickImages from "../SlickImages/SlickImages";
import styles from "./HotelImages.module.scss";
import { hotelSearching } from "../../../const/interface";
import { useSelector } from "react-redux";
import { constState } from "@src/store/reducer/constReducer";
interface HotelImagesProps {
  /**
   * id hotel
   */
  hotelInfors?: hotelSearching[];
}
const HotelImages: FunctionComponent<HotelImagesProps> = (props) => {
  const { hotelInfors } = props;
  const isMobileVer = useSelector(
    (state: { const: constState }) => state?.const?.isMobileVer
  );
  ////////////////////state
  // const [hotelImg, setHotelImg] = useState<any[]>([]);
  const imgs: some[] = [];
  hotelInfors?.forEach((hs) => {
    imgs.push({
      ID_IMG: hs.ID_IMG,
      Image: hs.Image,
    });
  });
  ///////////////////////event
  // const getImages = useCallback(async (idHotel?: string) => {
  //   const payload: some = {
  //     idHotel: idHotel,
  //   };
  //   const respond = await getImgHotel(payload);
  //   try {
  //     const res = respond;
  //     if (res?.data?.code === SUCCESS_CODE) {
  //       setHotelImg(res?.data?.data);
  //     }
  //   } catch (err) {}
  // }, []);
  // useEffect(() => {
  //   getImages(idHotel);
  // }, [getImages, idHotel]);
  return (
    <Row className={styles["hotel-images"]}>
      <SlickImages images={imgs} type="hotel" isMobile={isMobileVer!} />
    </Row>
  );
};

export default HotelImages;
