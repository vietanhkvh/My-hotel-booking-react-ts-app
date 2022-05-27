import clsx from "clsx";
import { FunctionComponent } from "react";
import styles from "./SearchingComponent.module.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tabs } from "antd";
import HotelSearching from "../../common//HotelSearching/HotelSearching";
const { TabPane } = Tabs;
interface SearchingComponentProps {
  /**
   * set searching disable
   */
  setSearching: (par: boolean) => void;
}

const SearchingComponent: FunctionComponent<SearchingComponentProps> = (
  props
) => {
  const { setSearching } = props;
  const tabList = [
    {
      title: "Hotel",
      children: (
        <HotelSearching
          classes={{
            container: styles["hotel-searching-container"],
            item: styles["hotel-searching-item"],
          }}
          isMobile={true}
        />
      ),
    },
    { title: "Restaurant", children: <>retaurant searching</> },
  ];
  return (
    <div className={clsx(styles["searching-component"])}>
      <Button
        icon={<CloseOutlined />}
        shape="circle"
        onClick={() => setSearching(false)}
      />
      <Tabs
        defaultActiveKey={tabList[0].title}
        centered
        className={styles["tab"]}
      >
        {tabList.map((t) => (
          <TabPane tab={t.title} key={t.title} children={t.children} />
        ))}
      </Tabs>
    </div>
  );
};

export default SearchingComponent;
