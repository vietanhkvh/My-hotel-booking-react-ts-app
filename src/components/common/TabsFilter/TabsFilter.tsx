import { Tabs } from 'antd';
import { FunctionComponent, ReactNode } from 'react';
import styles from './TabsFilter.module.scss';
const { TabPane } = Tabs;
interface TabsFilterProps {
  /**
   * array tab
   */
  arrayTab?: any[];
  /**
   * data
   */
  dataComponent?: () => ReactNode;
  /**
   * hanlde change tab
   */
  handleChangeTab?: (val: string) => void;
}

const TabsFilter: FunctionComponent<TabsFilterProps> = (props) => {
  const { arrayTab, dataComponent, handleChangeTab } = props;
  return (
    <div className={styles['tabs-filter']}>
      <Tabs defaultActiveKey='best-match' size='large' onChange={handleChangeTab} centered>
        {arrayTab?.length! > 0 &&
          arrayTab?.map((a: any) => (
            <TabPane tab={a?.title} key={a?.key}>
              {dataComponent && dataComponent()}
            </TabPane>
          ))}
      </Tabs>
    </div>
  );
};

export default TabsFilter;
