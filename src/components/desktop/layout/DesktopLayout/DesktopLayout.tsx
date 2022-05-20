// import { Col } from 'ant';
import React from 'react';
import LayoutCus from '../../../Layout';
// import useTrans from '../../../../hooks/useTrans';
import { useSelector } from 'react-redux';
import { userState } from '@src/store/reducer/userReducer';
import DesktopGuestLayout from '../../DesktopGuestLayout/DesktopGuestLayout';
import DeskHostLayout from '../../DeskHostLayout/DeskHostLayout';
import DesktopAdminLayout from '../../DesktopAdminLayout/DesktopAdminLayout';

const DesktopLayout = (props) => {
  const { route, children, dataProfileDomain } = props;
  // const { t } = useTrans();
  const userInfor = useSelector(
    (state: { user: userState }) => state.user?.userInfor
  );
  return (
    <LayoutCus
      contents={{
        title: 'Los Cocos',
        url: '',
        description: 'Book a room with lots of hot deals',
        icon: dataProfileDomain?.logo,
      }}
      children={
        userInfor ? (
          userInfor?.ID_Role === 'GUE' ? (
            <DesktopGuestLayout />
          ) : userInfor?.ID_Role === 'HOS' ? (
            <DeskHostLayout />
          ) : (
            <DesktopAdminLayout />
          )
        ) : (
          <DesktopGuestLayout />
        )
      }
    />
  );
};

export default DesktopLayout;
