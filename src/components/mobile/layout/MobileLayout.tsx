import { some } from "src/const/keyString";
import React from "react";
import styles from "./MobileLayout.module.scss";
import LayoutCus from "../../Layout";
import { Layout, Row } from "antd";
import { Outlet } from "react-router-dom";
import Headermob from "../Headermob/Headermob";
const { Content, Footer } = Layout;
// import MobileHeader from './MobileHeader';
// import { ShareInfor } from '@src/const/shareInfor';

const LayoutMobile = () => {
  return (
    <Layout className={styles["layout"]}>
      <Headermob />
      <Content className={styles["content"]}>
        <Row className={styles["site-layout-content"]}>
          <Outlet />
        </Row>
      </Content>
    </Layout>
  );
};
interface Props {
  dataProfileDomain?: some;
  children?: any;
  route?: string;
}

const MobileLayout = (props: Props) => {
  const { dataProfileDomain } = props;

  // const showHeader = [routesPath.HOME].indexOf(route) > -1;
  // if (!showHeader) {
  //   return children;
  // }
  // const router = useRouter();
  // console.log(router);

  return (
    <LayoutCus
      contents={{
        title: dataProfileDomain?.brandName,
        url: "",
        description: "react-app",
        icon: dataProfileDomain?.logo,
      }}
      children={<LayoutMobile />}
    />
  );
};

export default MobileLayout;
