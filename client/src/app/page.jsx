import Image from "next/image";

const Home = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentDateTime = new Date();

  const calculateTimeDifference = (dateTime) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - dateTime) / (1000 * 60));
    return `${diffInMinutes} mins ago`;
  };

  const cardData = [
    {
      title: "HP Card 1",
      content: "Content for HP Card 1",
    },
    {
      title: "HP Card 2",
      content: "Content for HP Card 2",
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        {" "}
        <section className="w-5/6">
          {" "}
          <h2 className="text-4xl font-bold">Ongoing</h2>{" "}
          <div className="flex justify-center flex-wrap">
            {" "}
            {cardData.map((card, index) => (
              <div
                key={index}
                className="m-4 flex flex-col border border-gray-300 bg-gray-800 rounded-lg p-4 w-full sm:w-screen h-48"
              >
                <h3 className="text-3xl font-bold capitalize">{card.title}</h3>{" "}
                <p className="text-right text-green-500">
                  {calculateTimeDifference(currentDateTime)}
                </p>{" "}
                <p className="text-right text-gray-400 mt-2">{currentDate}</p>{" "}
                <p>{card.content}</p>
              </div>
            ))}
          </div>
        </section>
        <hr className="my-8" />
        <section className="w-5/6">
          {" "}
          <h2 className="text-4xl font-bold">Upcoming</h2>{" "}
          <div className="flex justify-center flex-wrap">
            {" "}
            {cardData.map((card, index) => (
              <div
                key={index}
                className="m-4 flex flex-col border border-gray-300 bg-gray-800 rounded-lg p-4 w-full sm:w-screen h-48"
              >
                <h3 className="text-3xl font-bold capitalize">{card.title}</h3>{" "}
                <p className="text-right text-green-500">
                  {calculateTimeDifference(currentDateTime)}
                </p>{" "}
                <p className="text-right text-gray-400 mt-2">{currentDate}</p>{" "}
                <p>{card.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
