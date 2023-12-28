import Image from "next/image";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        {" "}
        {/* Added flex-col */}
        <section className="w-5/6">
          {" "}
          {/* Increased width to 83.33% */}
          <h2>Ongoing</h2>
          {/* Add your ongoing section content here */}
          <div className="flex justify-center">
            <div className="m-4 flex flex-col border border-gray-300 bg-gray-800 rounded-lg p-4 w-full sm:w-screen h-48">
              {" "}
              {/* Changed width to full */}
              <h3 className="text-lg font-bold">hp Card 1</h3>
              <p>Content for hp Card 1</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="m-4 flex flex-col border border-gray-300 bg-gray-800 rounded-lg p-4 w-full sm:w-screen h-48">
              {" "}
              {/* Changed width to full */}
              <h3 className="text-lg font-bold">hp Card 1</h3>
              <p>Content for hp Card 1</p>
            </div>
          </div>
        </section>
        <section className="w-5/6">
          {" "}
          {/* Increased width to 83.33% */}
          <h2>Upcoming</h2>
          {/* Add your ongoing section content here */}
          <div className="flex justify-center">
            <div className="m-4 flex flex-col border border-gray-300 bg-gray-800 rounded-lg p-4 w-full sm:w-screen h-48">
              {" "}
              {/* Changed width to full */}
              <h3 className="text-lg font-bold">hp Card 1</h3>
              <p>Content for hp Card 1</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="m-4 flex flex-col border border-gray-300 bg-gray-800 rounded-lg p-4 w-full sm:w-screen h-48">
              {" "}
              {/* Changed width to full */}
              <h3 className="text-lg font-bold">hp Card 1</h3>
              <p>Content for hp Card 1</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;