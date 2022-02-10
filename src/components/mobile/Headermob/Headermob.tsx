import { FunctionComponent, useState } from 'react';
import styles from './Headermob.module.scss';
import { Col, Image, Layout, Menu, Modal, Row, Typography } from 'antd';
import { routes, routesMenu } from '../../../routes/routes';
import { Link } from 'react-router-dom';
import LogoDes from '../../../assest/images/logo-desk.png';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { iconSizeM } from '../../../const/styles.const';
import MenuLink from '../MenuLink/MenuLink';
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
}
const ItemNav: FunctionComponent<ItemNavProps> = (props) => {
  const { path, icon, title } = props;
  return (
    <Link to={path} className={styles['nav-item']}>
      <Col className={styles['nav-item-container']}>
        <Image preview={false} src={icon} className={styles['icon']} />
        <Text className={styles['title']}>{title}</Text>
      </Col>
    </Link>
  );
};
interface HeadermobProps {}
const Headermob: FunctionComponent<HeadermobProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <nav className={styles['headermob']}>
      <Header className={styles['header']}>
        <Row className={styles['header-container']}>
          <Col className={styles['header-item']}>
            <Row onClick={showModal}>
              <MenuOutlined style={{ fontSize: iconSizeM }} />
            </Row>
          </Col>
          <Link to={'/'}>
            <Col className={styles['logo']}>
              <Image preview={false} src={LogoDes} />
            </Col>
          </Link>
          <Col className={styles['header-item']}>
            <SearchOutlined style={{ fontSize: iconSizeM }} />
          </Col>
        </Row>
      </Header>

      <Modal
        title=''
        bodyStyle={{width:'100vw',height:'100vh'}}
        wrapClassName={styles['menu-modal']}
        style={{top:0}}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <MenuLink handleCancel={handleCancel}/>
      </Modal>

      <Row className={styles['nav-container']}>
        {routes.map((r, index) => {
          const key = index + 1;
          return (
            <ItemNav key={key} path={r.path} icon={r.icon} title={r.title} />
          );
        })}
      </Row>
    </nav>
  );
};

export default Headermob;
