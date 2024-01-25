const resultArea = ({ results }) => {
  const numColumns = results.length > 3 ? 4 : results.length > 2 ? 3 : 2;
  console.log("num", numColumns);
  console.log("initial result count", results.length);

  return (
    <div className="mx-auto my-[80px] w-[80%]">
      {!results.length == 0 ? (
        <div
          className={`bg-transparent grid  gap-5 mt-2`}
          style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}
        >
          {results.map((result, index) => (
            <div
              key={index}
              className="relative group shadow-lg hover:shadow-2xl rounded-lg overflow-hidden"
              style={{ height: numColumns === 2 ? "400px" : "300px" }}
            >
              <img src={result.Images} className="w-full h-full object-cover" />

              {/*result name */}
              <div className="absolute bottom-0 right-10 left-10 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 text-center font-semibold my2:text-[20px] px-4 py-2 rounded shadow-lg">
                {result.Title}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[40px] text-[#77328b] text-center mt-[150px] py-2 px-1 shadow-lg border-[1px] border-[#77328b] rounded-md">
          Insert Your Favourite Movie And Click The Search Button
        </div>
      )}
      {/*instruction area */}
    </div>
  );
};

export default resultArea;
