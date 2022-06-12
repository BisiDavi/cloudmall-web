import SearchIcon from "@/components/icons/SearchIcon";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateSearch } from "@/redux/search-slice";

export default function SearchStore() {
  const dispatch = useAppDispatch();

  function inputHandler(e: any) {
    dispatch(updateSearch(e.target.value));
  }

  return (
    <>
      <div className="search-store">
        <span>
          <SearchIcon />
        </span>
        <input className="search-input" onChange={inputHandler} />
      </div>
      <style jsx>
        {`
          .search-store {
            display: flex;
            position: relative;
          }
          .search-store span {
            position: absolute;
            top: 20px;
            left: 15px;
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
