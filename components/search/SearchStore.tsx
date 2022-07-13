import { useRouter } from "next/router";
import Image from "next/image";

import SearchIcon from "@/components/icons/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  updateProductSearch,
  updateCategorySearch,
} from "@/redux/search-slice";

export default function SearchStore() {
  const dispatch = useAppDispatch();
  const { categorySearch, productSearch } = useAppSelector(
    (state) => state.search
  );
  const router = useRouter();

  const search = router?.route.includes("store") ? productSearch : categorySearch 

  function inputHandler(e: any) {
    if (router?.route.includes("store")) {
      dispatch(updateProductSearch(e.target.value));
    } else {
      dispatch(updateCategorySearch(e.target.value));
    }
  }

  function resetHandler() {
    dispatch(updateCategorySearch(""));
  }

  return (
    <>
      <div className="search-store">
        <span className="search">
          <SearchIcon />
        </span>
        <input
          value={search}
          className="search-input"
          onChange={inputHandler}
        />
        {search && (
          <button className="cancel" type="button" onClick={resetHandler}>
            <Image src="/cancelIcon.png" height={15} width={15} alt="cancel" />
          </button>
        )}
      </div>
      <style jsx>
        {`
          .search-store {
            display: flex;
            position: relative;
          }
          .search-store span.search {
            position: absolute;
            top: 20px;
            left: 15px;
          }
          .search-store button.cancel {
            position: absolute;
            top: 18px;
            right: 15px;
            border: none;
            background-color: transparent;
          }
          .search-input {
            width: 100%;
            border-radius: 8px;
            border: 1px solid var(--sky-blue);
            height: 34px;
            margin-top: 10px;
            background-color: var(--sky-blue);
            padding-left: 40px;
          }
        `}
      </style>
    </>
  );
}
