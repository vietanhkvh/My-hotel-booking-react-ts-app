import { addArticle, removeArticle } from '../../store/actions/actionCreators';
import { Dispatch, FunctionComponent, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.scss';
import AddArticle from '../../components/common/AddArticle/AddArticle';
import Article from '../../components/common/Article/Article';

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

const Home: FunctionComponent<HomeProps> = (props) => {
  const { isMobile } = props;
  return (
    <div className={styles['home']}>
      Home
      <div>
        <MyApp />
      </div>
    </div>
  );
};

export default Home;
