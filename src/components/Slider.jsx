import { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState([]);

  console.log(search);
  console.log(collection);

  // data fetching
  const getData = async () => {
    try {
      const response = await fetch("./data.json");
      const data = await response.json();
      setCollection(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //go to previous slide manually
  const previousSlide = () => {
    if (current === 0) {
      setCurrent(collection.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };
  //go to next slide manually
  const nextSlide = () => {
    if (current === collection.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  //automatic movement after 5 seconds
  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [current]);

  return (
    //animated slider area
    <div className="group relative w-full h-[60vh] flex items-center overflow-y-hidden overflow-x-auto scrollbar-hide scroll-smooth mb-[30px] ">
      {collection.map((collection, index) => (
        <div
          key={index}
          className="relative min-w-full h-full transition ease-in-out duration-1000"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          <img
            src={collection.Images}
            className={`w-full h-full object-cover object-center`}
            alt={`Image ${index}`}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <p className="text-center font-bold text-[40px]">
              {collection.heading}
            </p>
            <p className="text-center text-[20px]">{collection.des}</p>
          </div>
        </div>
      ))}

      {/*slider nav buttons*/}
      <div className="fixed top-3/7 -translate-y-1/2 hidden group-hover:flex justify-between px-[30px] w-[100vw]">
        <FaChevronLeft
          className="rounded-full p-[10px] bg-black bg-opacity-70 text-white text-[35px] cursor-pointer"
          onClick={previousSlide}
        />
        <FaChevronRight
          className="rounded-full p-[10px] bg-black bg-opacity-70 text-white text-[35px] cursor-pointer"
          onClick={nextSlide}
        />
      </div>

      {/*input area*/}
      <div className="bg-white bg-opacity-50 absolute bottom-[3%] h-[70px] left-[10%] right-[10%] my2:left-[20%] my2:right-[20%] flex justify-between items-center px-2">
        <div className="bg-white my1:flex-1 w-[20%] h-[70%] flex mx-1 items-center px-2">
          <CiSearch className="text-[20px] my3:text-[24px]  mr-2" />
          <input
            type="text"
            className="text-gray-400 text-[14px] my3:text-[16px] outline-none w-[100%]"
            placeholder="Search Your Favourite search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-[#77328b] mx-2 px-5 h-[70%]  flex justify-center items-center cursor-pointer ">
          <div className="flex text-white font-medium text-[15px] ">Search</div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
