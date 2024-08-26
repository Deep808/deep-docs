import { useFetchDocs } from "@/hooks/useFetchDocs";
import { useStore } from "@/hooks/useStore";
import React, { useEffect, useState } from "react";
import SearchedDocs from "./SearchedDocs";

const SearchInput = ({ searchInput }) => {
  useFetchDocs();
  const { searchDocs } = useStore();

  const [query, setQuery] = useState([]);

  useEffect(() => {
    if (searchInput === "") {
      setQuery(searchDocs);
    } else {
      const data = searchInput.toLowerCase();
      const filteredData = searchDocs.filter((doc) =>
        doc.fileName.toLowerCase().includes(data)
      );

      setQuery(filteredData);
    }
  }, [searchInput, searchDocs]);

  return (
    <div className="absolute z-30 dark:bg-gray-800 rounded-lg top-14 bg-[#f3f3f3] w-full h-auto overflow-y-auto shadow-lg">
      {query.length > 0 ? (
        query.map((doc) => (
          <SearchedDocs id={doc.id} fileName={doc.fileName} key={doc.id} />
        ))
      ) : (
        <p className="flex w-[70%] mx-auto text-center justify-center items-center h-[50vh]">
          Umm! That Doc is not here :(
        </p>
      )}
    </div>
  );
};

export default SearchInput;
