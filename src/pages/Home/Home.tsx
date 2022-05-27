import { addArticle, removeArticle } from "../../store/actions/actionCreators";
import { Dispatch, FunctionComponent, useCallback, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.scss";
import AddArticle from "../../components/common/AddArticle/AddArticle";
import Article from "../../components/common/Article/Article";
import { Button, Row, Typography } from "antd";
// import { bannerArray } from "../../const/data.const";
// import { some } from "../../const/keyString";
import SlickImages from "../../components/common/SlickImages/SlickImages";
import clsx from "clsx";
import HotelCardMobile from "../../components/mobile/HotelCardMobile/HotelCardMobile";

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
      <Row className={clsx(styles["home-item"], styles["home-item-hotel"])}>
        <Title
          className={clsx(
            styles["item-container"],
            styles["text"],
            styles["title-item"],
            styles["text-mobile"]
          )}
          level={isMobile ? 5 : undefined}
        >
          Hotel
        </Title>
        {/* <SlickImages images={[]} type="banner" isMobile={isMobile} /> */}
        <div className={styles["hotel-card-list"]}>
          <div className={styles["hotel-inner-card"]}>
            {[...Array(6)].map((i) => (
              <HotelCardMobile
                key={i}
                images={[]}
                nameHotel={"World Luxury Hotel Awards"}
                hotelAddress={"Asssss, Bbbbbbbbbb"}
                price={120}
                ratingP={5}
              />
            ))}
          </div>
        </div>
      </Row>
      <Row
        className={clsx(
          styles["function"],
          styles["function-1"],
          isMobile && styles["function-mobile-img-1"],
          isMobile && styles["function-mobile"],
          styles["home-item"],
          isMobile && styles["home-item-mobile"]
        )}
      >
        <Title
          className={clsx(
            styles["item-container"],
            styles["text"],
            styles["text-mobile"]
          )}
          level={isMobile ? 4 : undefined}
        >
          Let your curiosity do the booking
        </Title>
        <Button
          className={clsx(
            styles["item-container"],
            styles["button-75"],
            isMobile && styles["button-75-mobile"]
          )}
        >
          <Text className={styles["txt-btn"]}>I'm flexible</Text>
        </Button>
      </Row>
      <Row
        className={clsx(
          styles["function"],
          styles["function-2"],
          isMobile && styles["function-mobile"],
          isMobile && styles["function-mobile-img-2"],
          styles["home-item"],
          isMobile && styles["home-item-mobile"]
        )}
      >
        <Title
          className={clsx(
            styles["item-container"],
            styles["text"],
            styles["text-mobile"]
          )}
          level={isMobile ? 4 : undefined}
        >
          About your host
        </Title>
        <Button
          className={clsx(
            styles["item-container"],
            styles["button-75"],
            isMobile && styles["button-75-mobile"]
          )}
        >
          <Text className={styles["txt-btn"]}>Ask a supper host</Text>
        </Button>
      </Row>
    </div>
  );
};

export default Home;
