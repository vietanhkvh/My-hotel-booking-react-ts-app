import { FunctionComponent, useState } from "react";
import styles from "./Headermob.module.scss";
import { Col, Image, Layout, Modal, Row, Typography } from "antd";
import { routes } from "../../../routes/routes";
import { Link } from "react-router-dom";
import LogoDes from "../../../assest/images/logo-desk.png";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import SearchingComponent from "../SearchingComponent/SearchingComponent";

import MenuLink from "../MenuLink/MenuLink";
import clsx from "clsx";
import PopupLayer from "../PopupLayer/PopupLayer";
const { Header } = Layout;
const { Text } = Typography;
interface ItemNavProps {
  /**
   * path
   */
  path: string;
  /**
   * icon
   */
  icon: any;
  /**
   * name
   */
  title: string;
  /**
   * id active
   */
  idActive: string;
  /**
   * set id active
   */
  setIdActive: (val: string) => void;
}
const ItemNav: FunctionComponent<ItemNavProps> = (props) => {
  const { path, icon, title, idActive, setIdActive } = props;
  return (
    <Link
      to={path}
      className={clsx(
        styles["nav-item"],
        idActive === title ? styles["nav-item-active"] : ""
      )}
      onClick={() => setIdActive(title)}
    >
      <Col className={styles["nav-item-container"]}>
        <Image preview={false} src={icon} className={styles["icon"]} />
        <Text className={styles["title"]}>{title}</Text>
      </Col>
    </Link>
  );
};
interface HeadermobProps {}
const Headermob: FunctionComponent<HeadermobProps> = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [idActive, setIdActive] = useState<string>("");
  const [isSearching, setIsSeaching] = useState<boolean>(false);
  const showModal = () => {
    setIsShowMenu(true);
  };

  // const handleOk = () => {
  //   setIsShowMenu(false);
  // };

  const handleCancel = () => {
    setIsShowMenu(false);
    console.log("handleCancel");
  };
  return (
    <nav className={styles["headermob"]}>
      <Header className={styles["header"]}>
        <Row className={styles["header-container"]}>
          <Col className={styles["header-item"]} onClick={showModal}>
            <MenuOutlined className={styles["icon"]} />
          </Col>
          <Link to={"/"} onClick={() => setIdActive("")}>
            <Col className={styles["logo"]}>
              <Image preview={false} src={LogoDes} />
            </Col>
          </Link>
          <Col
            className={styles["header-item"]}
            onClick={() => setIsSeaching(true)}
          >
            <SearchOutlined className={styles["icon"]} />
          </Col>
        </Row>
      </Header>

      <Row className={styles["nav-container"]}>
        {routes.map((r) => {
          return (
            <ItemNav
              idActive={idActive}
              setIdActive={setIdActive}
              key={r.title}
              path={r.path}
              icon={r.icon}
              title={r.title}
            />
          );
        })}
      </Row>
      <PopupLayer
        isActive={isSearching}
        children={<SearchingComponent setSearching={setIsSeaching} />}
      />
      <PopupLayer
        isActive={isShowMenu}
        children={<MenuLink handleCancel={handleCancel} />}
        classContainer={styles["menu-container"]}
      />
    </nav>
  );
};

export default Headermob;
