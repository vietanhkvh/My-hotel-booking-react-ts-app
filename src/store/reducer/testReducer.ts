import * as actionTypes from "../actions/actionTypes"

const initialState: TestState = {
  tests: [
    {
     test:'1234'
    },
    {
      test:'1234566'
    },
  ],
}
const TestReducer = (
    state: TestState = initialState,
    action: ArticleAction
  ): TestState => {
    switch (action.type) {
      case actionTypes.ADD_ARTICLE:
        return {
          ...state,
         
        }
      case actionTypes.REMOVE_ARTICLE:
       
        return {
          ...state,
          
        }
    }
    return state
  }
  
export default TestReducer