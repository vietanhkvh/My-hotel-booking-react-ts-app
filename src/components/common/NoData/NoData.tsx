import { Row, Typography, Image } from 'antd';
import { FunctionComponent } from 'react';
import styles from './NoData.module.scss';

const { Title } = Typography;
interface NoDataProps {
  tilte?: string;
  img?: any;
}

const NoData: FunctionComponent<NoDataProps> = (props) => {
  const { tilte, img } = props;
  return (
    <Row className={styles['no-data']}>
      <Image src={img} preview={false} width={150} height={150} />
      <Title level={4}> {tilte}</Title>
    </Row>
  );
};

export default NoData;
