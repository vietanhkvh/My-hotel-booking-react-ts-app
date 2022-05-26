import { routesMenu } from "../../../routes/routes";
import { Button, Menu } from "antd";
import { FunctionComponent } from "react";
import styles from "./MenuLink.module.scss";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
interface MenuLinkProps {
  //close the modal
  handleCancel: () => void;
}

const MenuLink: FunctionComponent<MenuLinkProps> = (props) => {
  const { handleCancel } = props;
  return (
    <div className={styles["menulink"]}>
      <Button icon={<LeftOutlined />} shape="circle" />
      <Menu className={styles["menu-link"]} theme={"light"} mode="vertical">
        {routesMenu.map((i, index) => {
          const key = index + 1;
          return (
            <Menu.Item
              className={styles["item-link"]}
              key={key}
              icon={<i.icon />}
              onClick={handleCancel}
            >
              <Link to={`${i?.path}`}>
                <span style={{ textTransform: "capitalize" }}>{i?.title}</span>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default MenuLink;
