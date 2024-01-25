import { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import CardArea from "./CardArea";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState([]);
  const [results, setResults] = useState([]);

  const [filterButtonClicked, setFilterButtonClicked] = useState(false);

  //slicing input
  const phrase = search;
  const wordsArray = phrase ? phrase.split(" ") : [];
  const algorithm = [];

  for (let i = 0; i < wordsArray.length; i++) {
    algorithm.push(wordsArray[i]); // Push individual words

    const oneword = wordsArray[i]; //get the pushed values for further spliting

    for (let j = 0; j < oneword.length - 2; j++) {
      const found = oneword.slice(j, j + 3); //selected word slicing further

      algorithm.push(found); // splitted word push to the array
      console.log(algorithm);
    }
  }

  //final filtering
  const filterDataByAlgorithm = (collection, algorithm) => {
    const results = [];
    const filteredData = collection.filter((item) => {
      const includes = algorithm.some((part) =>
        item.Title.toLowerCase().includes(part.toLowerCase())
      );

      if (includes && algorithm.length > 0) {
        results.push({
          Title: item.Title,
          Images: item.Images,
        });
        console.log(results);
        console.log("Results length:", results.length);
        //console.log(algorithm);
      }

      return includes;
    });

    // console.log("results", results);
    return filteredData;
  };

  // data fetching
  const getData = async () => {
    try {
      const response = await fetch("./data.json");
      const data = await response.json();
      setCollection(data);
      // setTitle(collection.Title);
      console.log(collection);
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

  // Reset the flag after filtering
  useEffect(() => {
    if (filterButtonClicked) {
      const filteredResults = filterDataByAlgorithm(collection, algorithm);
      setResults(filteredResults);
      setFilterButtonClicked(false);
    }
  }, [filterButtonClicked, search]);

  //automatic movement after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [current]);

  //running fetch
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-fit">
      {/*animated slider area*/}
      <div className="group relative w-full h-[50vh] flex items-center overflow-y-hidden overflow-x-auto scrollbar-hide scroll-smooth mb-[30px] ">
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
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
              <p className="text-center font-bold text-[40px]">
                {collection.Title}
              </p>
              <p className="text-center my1:text-[20px] text-[14px] pt-3">
                {collection.Plot}
              </p>
            </div>
          </div>
        ))}

        {/*slider nav buttons*/}
        <div className="fixed top-1/4 -translate-y-1/2 hidden group-hover:flex justify-between px-[30px] w-[100vw]">
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
        <div className="bg-white bg-opacity-50 absolute bottom-[3%] h-[70px] left-[10%] right-[10%] ] flex justify-between items-center px-2">
          <div className="bg-white  h-[70%] flex-1 flex mx-1 items-center px-2">
            <CiSearch className="text-[20px] my3:text-[24px]  mr-2" />
            <input
              type="text"
              className=" text-[14px] my3:text-[16px] outline-none w-[100%] text-balck flex-1"
              placeholder="Search Your Favourite search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div
            style={{
              backgroundColor: filterButtonClicked ? "#3b3b3b" : "#77328b",
            }}
            className="mx-2 px-5 h-[70%] flex justify-center items-center cursor-pointer"
            onClick={() => {
              filterDataByAlgorithm(collection, algorithm);
              setFilterButtonClicked(true);
            }}
          >
            <div className="flex text-white font-medium text-[15px] ">
              Search
            </div>
          </div>
        </div>
      </div>

      <CardArea results={results} />
    </div>
  );
};

export default Slider;
