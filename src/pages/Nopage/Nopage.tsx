import { Button, Result } from 'antd';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Nopage.module.scss';
interface NopageProps {}

const Nopage: FunctionComponent<NopageProps> = () => {
  const navigate = useNavigate();

  const handlerBackHome = () => {
    navigate('home');
  };
  return (
    <div className={styles['nopage']}>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='primary' onClick={handlerBackHome}>
            Back Home
          </Button>
        }
      />
      ,
    </div>
  );
};

export default Nopage;
