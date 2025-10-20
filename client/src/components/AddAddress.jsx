import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";
import { useGlobalContext } from "../provider/GlobalProvider.jsx";

const AddAddress = ({ close }) => {
    const { register, handleSubmit,reset } = useForm()
    const {fetchAddress} = useGlobalContext()

    const onSubmit = async(data)=>{
        console.log("data",data)
    
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data : {
                    address_line :data.addressline,
                    city : data.city,
                    state : data.state,
                    country : data.country,
                    pincode : data.pincode,
                    mobile : data.mobile
                }
            })

            const { data : responseData } = response
            
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

  return (
    <section className="bg-neutral-900/60 fixed top-0 left-0 right-0 bottom-0 z-50 lg:h-screen lg:overflow-auto">
      <div className="bg-white p-4 w-full max-w-lg mt-8 lg:mt-1 mx-auto rounded">
        <div className="flex justify-between items-center gap-4">
          <h2 className="font-semibold">Add Address</h2>
          <button onClick={close} className="hover:text-red-500 cursor-pointer">
            <IoClose size={25} />
          </button>
        </div>
        <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <label htmlFor="addressline">Address Line :</label>
            <input
              type="text"
              id="addressline"
              className="border bg-white p-2 lg:p-1 rounded"
              {...register("addressline", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="city">City :</label>
            <input
              type="text"
              id="city"
              className="border bg-white p-2 lg:p-1 rounded"
              {...register("city", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="state">State :</label>
            <input
              type="text"
              id="state"
              className="border bg-white p-2 lg:p-1 rounded"
              {...register("state", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="pincode">Pincode :</label>
            <input
              type="text"
              id="pincode"
              className="border bg-white p-2 lg:p-1 rounded"
              {...register("pincode", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="country">Country :</label>
            <input
              type="text"
              id="country"
              className="border bg-white p-2 lg:p-1 rounded"
              {...register("country", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="mobile">Mobile No. :</label>
            <input
              type="text"
              id="mobile"
              className="border bg-white p-2 lg:p-1 rounded"
              {...register("mobile", { required: true })}
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              type="submit"
              className="bg-sky-400 w-full lg:w-20 py-2 font-semibold mt-4 hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default AddAddress;
