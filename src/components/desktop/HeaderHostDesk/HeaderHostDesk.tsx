import LoginModal from '../../common/LoginModal/LoginModal';
import { FunctionComponent, useCallback, useState } from 'react';
import styles from './HeaderHostDesk.module.scss';
import { Col, Popover, Row, Space } from 'antd';
import ButtonNav from '../ButtonNav/ButtonNav';
import MyAvatar from '../../common/MyAvatar/MyAvatar';
import PhoneIc from '../../../assest/icons/phone-mob-16.png';
import DownA from '../../../assest/icons/down-arrow-16.png';
import UserIc from '../../../assest/icons/user-24.png';
import BtnAccount from '../BtnAccount/BtnAccount';
import { useSelector } from 'react-redux';
import { userState } from '@src/store/reducer/userReducer';

interface HeaderHostDeskProps {}

const HeaderHostDesk: FunctionComponent<HeaderHostDeskProps> = () => {
  //////////////////////////////state
  const isMobile = false;
  const userInfor = useSelector(
    (state: { user: userState }) => state.user?.userInfor
  );
  const [isVisPopOver, setIsVisPopOver] = useState<boolean>(false);

  //////////////////////////////event
  const handleVisibleChange = useCallback(
    (vis: boolean) => {
      setIsVisPopOver(vis);
    },
    [setIsVisPopOver]
  );
  return (
    <Row className={styles['header-host-desk']}>
      <Space size={'large'}>
        <ButtonNav icon={PhoneIc} text={'1900 000'} />
        <Popover
          overlayStyle={{ position: 'fixed' }}
          trigger='click'
          visible={isVisPopOver}
          onVisibleChange={handleVisibleChange}
          content={<BtnAccount userInfor={userInfor} isMobile={isMobile} />}
          placement='bottomRight'
        >
          <Row style={{ cursor: 'pointer', alignItems: 'center' }}>
            {userInfor ? (
              <MyAvatar
                userName={userInfor?.FullName}
                width={isMobile ? 30 : ''}
                height={isMobile ? 30 : ''}
                fontSize={isMobile ? 14 : 16}
              />
            ) : (
              <Col>
                <ButtonNav icon={UserIc} text={''} />
              </Col>
            )}
            <Col>
              <ButtonNav icon={DownA} text={''} />
            </Col>
          </Row>
        </Popover>
      </Space>
    </Row>
  );
};

export default HeaderHostDesk;
