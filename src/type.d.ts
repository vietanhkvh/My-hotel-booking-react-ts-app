interface IArticle {
  id: number;
  title: string;
  body: string;
}
interface ITest {
  test: string;
}

type ArticleState = {
  articles: IArticle[];
  tes: ITest[];
};
type TestState = {
  tests: ITest[];
};

type ArticleAction = {
  type: string;
  article: IArticle;
};
type TestAction = {
  type: string;
  test: ITest;
};

// type action={
//   ArticleAction:ArticleAction,
// }
type state={
  articleState:{ArticleState, TestState},
  test:ArticleState1,
}
type DispatchType = (args: ArticleAction) => ArticleAction;
// type DispatchType1 = (args: ArticleAction) => ArticleAction
