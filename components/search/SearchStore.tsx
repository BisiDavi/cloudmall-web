import SearchIcon from "@/components/icons/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateSearch } from "@/redux/search-slice";
import Image from "next/image";

export default function SearchStore() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.search);

  function inputHandler(e: any) {
    dispatch(updateSearch(e.target.value));
  }

  function resetHandler() {
    dispatch(updateSearch(""));
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
