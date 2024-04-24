"use client";
import { FaRegCopy } from "react-icons/fa";
import { VscCheck } from "react-icons/vsc";
import converter from "@/utils/Convert";
import { useEffect, useRef, useState } from "react";
import FinalList from "@/components/FinalList";

export default function Home() {
  const [loading, setloading] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy");
  const imageInputRef = useRef(null);
  const [sum, setSum] = useState(0);
  const [amount, setamount] = useState([]);
  
  console.log(typeof amount);
  const copytoclipboard = (txt) => {
    setCopyStatus("Copied");
    navigator.clipboard.writeText(txt);
    setTimeout(() => {
      setCopyStatus("Copy");
    }, 2000);
  };
  const convert = async (url) => {
    if (url) {
      setloading(true);
      await converter(url).then((txt) => {
        if (txt) {
          setamount(txt);
          const total = txt.reduce((acc, curr) => acc + curr, 0);
          setSum(total);
        }
      });
      setloading(false);
    }
  };
  const openBrowseImage = async () => {
    await imageInputRef.current?.click();
  };
  useEffect(() => {
    // Update sum whenever amount changes
    const total = amount.reduce((acc, curr) => acc + curr, 0);
    setSum(total);
  }, [amount]);
  // a note from tenzin, if you are reading this, i guess u want to know more about the
  //projects. read the below comment and hope you enjoy it
  //didnt made specific component for each. every code are in one page except for the
  //loop of the amount. hope many get inspire to make such projects
  return (
    <div className="mt-5">
      <p className=" leading-8  text-[#999999] text-sm">
        <span className=" text-white bg-[#393939] font-bold text-2xl  p-2 rounded-md">
          SumIT
        </span>{" "}
        : An OCR based tool for Tibetan Winter Business Sellers
      </p>
      <p className=" text-lg mt-4 font-bold">Inspiration:</p>
      <p className="mt-4 font-medium md:text-base  md:leading-7 leading-7 text-sm">
        This tool is designed specifically for
        <span className=" mx-2 text-xs font-semibold bg-[#393939] transition hover:bg-[#292929] p-2 rounded-md">
          Tibetan
        </span>
        Winter Business Sellers, aiming to alleviate the cumbersome process of
        manual calculations from their books. The inspiration for this tool
        struck me when I witnessed my father spending countless hours grappling
        with the complexities of calculating{" "}
        <span className=" mr-2 text-xs font-semibold bg-[#393939] transition hover:bg-[#292929] p-2 rounded-md">
          {" "}
          Bhulon and Mar Tsa
        </span>
        , often under considerable stress. Seeing his struggle sparked the idea
        to develop a solution that streamlines these calculations, saving time
        and reducing the burden for business owners like him with just one
        simple click.
      </p>
      <div className=" mt-3">
        <p className=" text-lg font-bold">Steps:</p>
        <p className=" text-sm">
          1. Click a Photo from your noteBook (make sure the Amounts are clear)
        </p>
        <p className=" text-sm">2. import the photo by either drag or click</p>
        <p className=" text-sm">3. the amount will show at down</p>
      </div>

      {/* kept it hidden */}
      <input
        type="file"
        ref={imageInputRef}
        onChange={(e) => {
          if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0]);
            // console.log(url)
            convert(url);
          }
        }}
        hidden
        required
      />
      {/* Inputters */}
      <div
        //to prevent from opening new tab
        onDragOver={(e) => {
          e.preventDefault();
        }}
        //the ondrop is for enabling the dragin function for photo
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) {
            const url = URL.createObjectURL(e.dataTransfer.files[0]);
            convert(url);
          }
          // console.log(url)
        }}
        //triggers the input that i have hide so that we can select image
        onClick={() => {
          openBrowseImage();
        }}
        className=" hover:bg-[#2d2f2f] transition  mt-4 cursor-pointer rounded-lg flex items-center justify-center w-full bg-[#303134] h-72"
      >
        {loading ? (
          <p className=" animate-pulse">Fetching your Mar tsa.....</p>
        ) : (
          <div>
            Click or Drag to import the image Here{" "}
            <p className=" text-center uppercase text-sm text-green-500">
              same image wont be fetch
            </p>
          </div>
        )}
      </div>
      {/* buttons */}
      <div className=" space-x-4 mt-4">
        <button
          className=" bg-[#303134]  hover:bg-[#25ff3899] transition-all ease-in-out p-4 rounded-lg"
          onClick={() => copytoclipboard(sum)}
        >
          {copyStatus === "Copied" ? <VscCheck /> : <FaRegCopy />}
        </button>
        <button
          className=" bg-[#303134] hover:bg-[#ff3e3ecf] transition py-2 px-4 rounded-lg"
          onClick={() => setamount([])}
        >
          Reset
        </button>
      </div>

      <div className=" p-2 bg-[#2D2F2F] rounded-lg mb-4 mt-2">
        <div>
          <p className=" text-xl p-2 mt-4 font-bold ">
            {" "}
            Final Amount:{" "}
            <span className="bg-[#25ff3899] p-2 text-sm rounded-lg">
              {sum} Rupee
            </span>
          </p>
          <p className=" text-sm px-2">
            The Accuracy of this Right now is not 100% kindly dont trust it all
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {amount.length === 0  ? (
            <div className=" px-2">
            <p  className=" text-sm ">The Picture scanned has no Number or the number is less than 100</p>
            <p className=" text-md font-bold">Reason for less than 100</p>
            <p className=" text-sm ">the less than 100 condition is applied as winter business atleast 
              make more than this. one glove is 150 so it cant be true.
            </p>
            </div>
          ) : (
            amount.map((item, index) => (
              <div key={index}>
                {" "}
                <FinalList item={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
