import { addArticle, removeArticle } from '../../store/actions/actionCreators';
import { Dispatch, FunctionComponent, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.scss';
import AddArticle from '../../components/common/AddArticle/AddArticle';
import Article from '../../components/common/Article/Article';
import { Carousel, Image } from 'antd';
import { bannerArray } from '../../const/data.const';
import { some } from '../../const/keyString';

const MyApp: React.FC = () => {
  const articles: any = useSelector(
    (state: ArticleState) => state?.articles,
    shallowEqual
  );
  const tests: any = useSelector(
    (state: TestState) => state?.tests,
    shallowEqual
  );
  const dispatch: Dispatch<any> = useDispatch();

  const saveArticle = useCallback(
    (article: IArticle) => dispatch(addArticle(article)),
    [dispatch]
  );

  return (
    <main>
      <h1>My Articles</h1>
      <AddArticle saveArticle={saveArticle} />
      {console.log('articles', articles)}
      {console.log('tests', tests)}
      {articles?.articles?.map((article: IArticle) => (
        <Article
          key={article.id}
          article={article}
          removeArticle={removeArticle}
        />
      ))}
    </main>
  );
};

interface HomeProps {
  /**
   * isMobile?
   */
  isMobile?: boolean;
}
function onChange(a: number) {
  console.log(a);
}
const A = () => (
  <>
    <div>
      <h3 className={styles['contentStyle']}>1</h3>
    </div>
    <div>
      <h3 className={styles['contentStyle']}>2</h3>
    </div>
    <div>
      <h3 className={styles['contentStyle']}>3</h3>
    </div>
    <div>
      <h3 className={styles['contentStyle']}>4</h3>
    </div>
  </>
);
const Home: FunctionComponent<HomeProps> = (props) => {
  const { isMobile } = props;
  // const onChange = (a, b, c) => {
  //   console.log(a, b, c);
  // };
  return (
    <div className={styles['home']}>
     Home
    </div>
  );
};

export default Home;
