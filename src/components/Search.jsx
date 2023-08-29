import { useRef } from "react";
import useKey from "../useKey";

const Search = ({ query, setQuery }) => {
  const inputElement = useRef();

  useKey("Enter", () => {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });

  return (
    <input
      ref={inputElement}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
export default Search;
