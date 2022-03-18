import { userInfoInterface } from '../../../const/interface';
import { Badge, Button, Form, Input, InputNumber, Popconfirm, Space, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './HostUser.module.scss';
import { useSelector } from 'react-redux';
import { userState } from '@src/store/reducer/userReducer';
import { getAccount } from '../../../services/common.service';
import { SUCCESS_CODE } from '../../../components/constants';
import {
  EditFilled,
  MinusOutlined,
  CloseOutlined,
  CheckOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import MyEditTable from '../../../components/common/MyEditTable/MyEditTable';
const { Text } = Typography;

//editable for account table
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text' | 'select';
  record: any;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {

  const switchInputNode = (inputType: string) => {
    switch (inputType) {
      case 'number':
        return <InputNumber min={1} max={9999} />;
      default:
        return <Input />;
    }
  };

  const inputNode = switchInputNode(inputType);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
          {/* {console.log('inputNode', inputNode)} */}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface UserProps {
  type?:string;
}

const Accounts: FunctionComponent<UserProps> = (props) => {
  const{type}=props;
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );
  //////////////////////states
  const [form] = Form.useForm();
  const [user, setUser] = useState<userInfoInterface[]>([]);
  const [editingKey, setEditingKey] = useState<number>();
  const isEditing = (record: userInfoInterface) =>
    record?.ID_Account === editingKey;

  //////////////////////event
  const getHost = useCallback(async (type:string) => {
    const payload = {
      idRole: type,
    };
    const respond = await getAccount(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setUser(res?.data?.data);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    getHost(type||"");
  }, [getHost, type]);
  //////////////////////components child
  const edit = (record: Partial<userInfoInterface>) => {
    form.setFieldsValue({
      ID_Account: null,
      ID_Role: '',
      UserName: '',
      FullName: '',
      Email: '',
      Phone: '',
      Status: '',
      ...record,
    });
    setEditingKey(record?.ID_Account);
  };
  const cancel = () => {
    setEditingKey(undefined);
  };
  const save = async (ID_Account: any) => {
    try {
      const row = (await form.validateFields()) as userInfoInterface;

      const newData = [...user];
      const index = newData.findIndex((item) => ID_Account === item.ID_Account);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setUser(newData);
        console.log('user', row);
        // updateRoom(ID_Room, row);
        setEditingKey(undefined);
      } else {
        newData.push(row);
        setUser(newData);
        setEditingKey(undefined);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columnsHost = [
    {
      title: 'ID Account',
      dataIndex: 'ID_Account',
      key: 'ID_Account',
      render: (text) => <Text>{text}</Text>,
      editable: false,
    },
    {
      title: 'ID Role',
      dataIndex: 'ID_Role',
      key: 'ID_Role',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'User name',
      dataIndex: 'UserName',
      key: 'UserName',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Full name',
      dataIndex: 'FullName',
      key: 'FullName',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'Phone',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (val: number) => (
        <Text>
          {val === 1 ? (
            <>
              <Badge status='success' />
              Active
            </>
          ) : (
            <>
              <Badge status='error' />
              Nonactive
            </>
          )}
        </Text>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: userInfoInterface) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record?.ID_Account)}
              style={{ marginRight: 8 }}
              icon={<CheckOutlined />}
            />
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <Button icon={<CloseOutlined />} />
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Button
              icon={<EditFilled />}
              disabled={editingKey !== undefined}
              onClick={() => edit(record)}
            />
            {record?.Status === 1 ? (
              <Button icon={<MinusOutlined />} />
            ) : (
              <Button icon={<PlusOutlined />} />
            )}
          </Space>
        );
      },
    },
  ];
  const switchInputType = (dataIndex: string) => {
    switch (dataIndex) {
      case 'Room_Name':
        return 'text';
      case 'ID_Type_Room':
        return 'select';
      default:
        return 'number';
    }
  };
  const mergedColumns = columnsHost.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: userInfoInterface) => ({
        record,
        inputType: switchInputType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className={styles['user']}>
      <MyEditTable
        mergedColumns={mergedColumns}
        data={user}
        cancel={cancel}
        form={form}
        EditableCell={EditableCell}
      />
    </div>
  );
};

export default Accounts;
