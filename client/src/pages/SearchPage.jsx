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
  const [loading, setLoading] = useState(true);
  const loadingArrayCard = new Array(15).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();
  const searchText = params?.search?.slice(3);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((preve) => {
            return [...preve, ...responseData.data];
          });
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((preve) => preve + 1);
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
          hasMore={true}
          next={handleFetchMore}
        >
          <div
            className="
            grid
            grid-cols-2
            sm:grid-cols-[repeat(2,_minmax(0,_1fr))]
            md:grid-cols-[repeat(3,_minmax(0,_1fr))]
            lg:grid-cols-[repeat(5,_minmax(0,_1fr))]
            py-4
            gap-4
          "
          >
            {data.map((p, index) => {
              return (
                <CardProduct data={p} key={p?._id + "searchProduct" + index} />
              );
            })}
          
            {/* Loading Skeletons */}
            {loading &&
              loadingArrayCard.map((_, index) => (
                <CardLoading key={"loadingsearchpage" + index} />
              ))}

            {/* Data (when loaded) */}
            {!loading && data.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No results found.
              </p>
            )}
          </div>
        </InfiniteScroll>
         
                       {
                         //no data 
                         !data[0] && !loading && (
                           <div className='flex flex-col justify-center items-center w-full mx-auto '>
                             <img
                               src={noDataImg} 
                               className='w-full h-full max-w-xs max-h-xs block'
                             />
                             <p className='font-semibold my-2'>No Data found</p>
                           </div>
                         )
                       }
      </div>
    </section>
  );
};

export default SearchPage;
