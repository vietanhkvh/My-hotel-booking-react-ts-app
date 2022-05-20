import { FunctionComponent,useCallback,useEffect,useState } from "react";
import styles from "./Requestion.module.scss";
import { Badge, Button, Form, Space, Table, Typography } from 'antd';
import { userInfoInterface } from '../../../const/interface';
import {
  MinusOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import MyEditTable from '../../../components/common/MyEditTable/MyEditTable';
import { getAccount, getAccountRoleSts, updateAccountRole, updateAccountSts } from "../../../services/common.service";
import { SUCCESS_CODE } from "../../../components/constants";
import { openNotificationWithIcon } from "../../../utils/helpers";

const { Text } = Typography;
interface RequestionProps {
  
}
 
const Requestion: FunctionComponent<RequestionProps> = () => {
    ///////////////////////state
    const [form] = Form.useForm();
    const dataUser=[
      {
        ID_Account:1,
        UserName:'wherelegendreborn@gmail.com',
        FullName:'guest',
        Email:'wherelegendreborn@gmail.com',
        Phone:'1234567890',
      },
      {
        ID_Account:3,
        UserName:'wherelegendbegin@gmail.com',
        FullName:'guest',
        Email:'wherelegendbegin@gmail.com',
        Phone:'1234567890',
      }  
    ]
    const [user, setUser] = useState<any[]>();
    ///////////////////////component
    const columnsHost = [
      {
        title: 'ID Account',
        dataIndex: 'ID_Account',
        key: 'ID_Account',
        render: (text) => <Text>{text}</Text>,
      },
      {
        title: 'Full name',
        dataIndex: 'FullName',
        key: 'FullName',
        render: (text) => <Text>{text}</Text>,
      },
      {
        title: 'Email',
        dataIndex: 'Email',
        key: 'Email',
        render: (text) => <Text>{text}</Text>,
      },
      {
        title: 'Phone',
        dataIndex: 'Phone',
        key: 'Phone',
        render: (text) => <Text>{text}</Text>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: userInfoInterface) => {
          return (
            <Space size={'middle'}>
              <Button icon={<CheckOutlined />} onClick={()=>handlerAcceptReq(record?.ID_Account,'HOS')}/>
              <Button icon={<MinusOutlined />} onClick={()=>handlerDenyReq(record?.ID_Account)}/>
            </Space>
          );
        },
      },
    ];
    ////////////////////api
    const getAccountRole = useCallback(
      async (idStatus?:number) => {
        const payload = {
          idStatus: idStatus,
        };
        const respond = await getAccountRoleSts(payload);
        try {
          const res = await respond;
          if (res?.data?.code === SUCCESS_CODE) {
            setUser(res?.data?.data);
          }
        } catch (error) {}
      },
      []
    );
    const updateAccountStatus = useCallback(
      async (idAccount?: number, sts?: number, type?:String) => {
        const payload = {
          idAccount: idAccount,
          status: sts,
        };
        const respond = await updateAccountSts(payload);
        try {
          const res = await respond;
          const message= type==='accept'? 'Accept' : 'Deny'
          if (res?.data?.code === SUCCESS_CODE) {
            openNotificationWithIcon(
              'success',
              '',
               message+' request successfull!'
            );
            getAccountRole(3);
          } else {
            openNotificationWithIcon(
              'error',
              '',
              message+' request failed!'
            );
          }
        } catch (error) {}
      },
      [getAccountRole]
    );
    const updateAccRole = useCallback(
      async (idAccount?:number,idRole?:string ) => {
        const payload = {
          idAccount: idAccount,
          idRole: idRole
        };
        const respond = await updateAccountRole(payload);
        try {
          const res = await respond;
          if (res?.data?.code === SUCCESS_CODE) {
            updateAccountStatus(idAccount, 1, 'accept')
            
          }
        } catch (error) {}
      },
      [updateAccountStatus]
    );
    ////////////////////event
    const handlerAcceptReq=(idAccount?:number,idRole?:string)=>{
      updateAccRole(idAccount, idRole)
    }
    const handlerDenyReq=(idAccount?:number)=>{
      updateAccountStatus(idAccount, 1, 'deny')
    }
    useEffect(()=>{
      getAccountRole(3)

    },[getAccountRole]);

  return <div className={styles['requestion']}>
     <Table columns={columnsHost} dataSource={user} />
  </div>;
}
 
export default Requestion;