import React, { useState } from "react";
import UploadCategoryModal from "../components/uploadCategoryModal";
import { useEffect } from "react";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, seteditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setdeleteCategory] = useState({
    _id: "",
  });
 

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2  bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-amber-400 hover:bg-indigo-500 px-3 py-1 rounded shadow-md"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}
      <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {categoryData.map((category, index) => {
          return (
            <div
              className="w-32 h-56 group rounded shadow-md"
              key={category._id}
            >
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down"
              />
              <div className="items-center h-9 flex gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    seteditData(category);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded "
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setdeleteCategory(category);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-40000 font-medium py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModal
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default Category;
