import clsx from "clsx";
import { FunctionComponent } from "react";
import styles from "./SearchingComponent.module.scss";
interface SearchingComponentProps {}

const SearchingComponent: FunctionComponent<SearchingComponentProps> = (
  props
) => {
  return (
    <div className={clsx(styles["searching-component"])}>
      SearchingComponent
    </div>
  );
};

export default SearchingComponent;
