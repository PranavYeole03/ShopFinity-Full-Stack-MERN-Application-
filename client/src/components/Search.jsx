import React, { useEffect, useState } from "react";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();

  const isSearchPage = location.pathname === "/search";

  const searchText =
    new URLSearchParams(location.search).get("q") || "";

  const [query, setQuery] = useState(searchText);

  // 🔹 Debounced navigation (KEY FIX)
  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      if (location.search !== `?q=${query}`) {
        navigate(`/search?q=${query}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, navigate, location.search]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border flex items-center text-neutral-500 bg-white focus-within:border-blue-300">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to="/"
            className="flex items-center h-full p-2 m-1 bg-white rounded-full shadow"
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <div className="flex items-center h-full p-3">
            <FaSearch size={22} />
          </div>
        )}
      </div>

      <div className="w-full h-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center cursor-pointer"
          >
            <TypeAnimation
              sequence={[
                'Search "Milk"', 1000,
                'Search "Bread"', 1000,
                'Search "Sugar"', 1000,
                'Search "Mobile"', 1000,
              ]}
              repeat={Infinity}
            />
          </div>
        ) : (
          <input
            type="text"
            value={query}
            placeholder="Search for atta, dal and more"
            className="w-full h-full outline-none bg-transparent"
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        )}
      </div>
    </div>
  );
};

export default Search;
