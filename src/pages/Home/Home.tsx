import { addArticle, removeArticle } from "../../store/actions/actionCreators";
import { Dispatch, FunctionComponent, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.scss";
import AddArticle from "../../components/common/AddArticle/AddArticle";
import Article from "../../components/common/Article/Article";
import { Button, Carousel, Image, Row, Typography } from "antd";
import { bannerArray } from "../../const/data.const";
import { some } from "../../const/keyString";
import SlickImages from "../../components/common/SlickImages/SlickImages";
import clsx from "clsx";
const { Title, Text } = Typography;
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
  isMobile: boolean;
}

const Home: FunctionComponent<HomeProps> = (props) => {
  const { isMobile } = props;
  // const onChange = (a, b, c) => {
  //   console.log(a, b, c);
  // };
  return (
    <div className={styles["home"]}>
      <Row className={styles["home-item"]}>
        <SlickImages images={[]} type="banner" isMobile={isMobile} />
      </Row>
      <Row className={clsx(styles["function-1"], styles["home-item"])}>
        <Title className={styles["text"]}>
          Let your curiosity do the booking
        </Title>
        <Button className={styles["button-75"]}>I'm flexible</Button>
      </Row>
      <Row className={clsx(styles["function-2"], styles["home-item"])}>
        <Title className={styles["text"]}>About your host</Title>
        <Button className={styles["button-75"]}>Ask a supper host</Button>
      </Row>
    </div>
  );
};

export default Home;
