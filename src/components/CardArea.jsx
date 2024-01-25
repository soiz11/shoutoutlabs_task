import { useEffect } from "react";
import { results } from "./Slider";

const CardArea = () => {
  console.log("hello", results);

  useEffect(() => {
    console.log("page", results);
  }, [results]);

  return (
    <div className="mx-[10%] mt-[50px]">
      {results ? (
        <div className="h-[400px] myspe:h-[600px] w-[100%] bg-transparent grid grid-cols-4 gap-4 mt-2 relative l">
          {results.map((card, index) => (
            <div
              key={index}
              className="relative group shadow-lg hover:shadow-2xl rounded-lg overflow-hidden"
            >
              <img
                src={card.Images}
                className="w-[100%] h-[100%] object-cover"
              />

              {/*card name */}
              <div className="absolute bottom-0 right-10 left-10 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 text-center font-semibold my2:text-[20px] px-4 py-2 rounded shadow-lg">
                {card.Title}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[40px] text-black text-center mt-[100px]">
          Search results
        </div>
      )}
    </div>
  );
};

export default CardArea;
