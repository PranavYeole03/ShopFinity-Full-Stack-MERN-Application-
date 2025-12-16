import React, { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImg from "../assets/nothing here yet.webp";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const searchText =
    new URLSearchParams(location.search).get("q") || "";

  const loadingArrayCard = new Array(10).fill(null);

  // 🔹 Reset when search text changes
  useEffect(() => {
    setPage(1);
    setData([]);
  }, [searchText]);

  // 🔹 Fetch data (protected from duplicate calls)
  const fetchData = async () => {
    if (!searchText || isFetching) return;

    try {
      setIsFetching(true);
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page,
        },
      });

      const responseData = response?.data;

      if (responseData?.success) {
        if (page === 1) {
          setData(responseData.data);
        } else {
          setData((prev) => [...prev, ...responseData.data]);
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  // 🔹 Call API safely
  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchMore = () => {
    if (page < totalPage && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold text-gray-800 text-lg">
          Search Result: {data.length}
        </p>

        <InfiniteScroll
          dataLength={data.length}
          next={handleFetchMore}
          hasMore={page < totalPage}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4">
            {data.map((p, index) => (
              <CardProduct
                key={p?._id + "search" + index}
                data={p}
              />
            ))}

            {loading &&
              loadingArrayCard.map((_, index) => (
                <CardLoading key={"loading" + index} />
              ))}
          </div>
        </InfiniteScroll>

        {!loading && data.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <img src={noDataImg} className="max-w-xs" />
            <p className="font-semibold mt-2">No Data Found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
