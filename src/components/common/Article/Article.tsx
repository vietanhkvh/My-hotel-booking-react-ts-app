import { Dispatch, FunctionComponent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Article.module.scss';
interface ArticleProps {
  article: IArticle;
  removeArticle: (article: IArticle) => void;
}

const Article: FunctionComponent<ArticleProps> = (props) => {
  const { article, removeArticle } = props;
  const dispatch: Dispatch<any> = useDispatch();
  const deleteArticle = useCallback(
    (article: IArticle) => dispatch(removeArticle(article)),
    [dispatch, removeArticle]
  );
  return (
    <div className={styles['article']}>
      <div className='Article'>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
      </div>
      <button onClick={() => deleteArticle(article)}>Delete</button>
    </div>
  );
};

export default Article;
