import Drive from "@/components/drive_file";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col bg-#222222 h-screen">
        {/* Added h-screen to make the container take full height */}
        <section className="w-11/12">
          {/* Increased width to 91.67% */}
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Ongoing</h2>
          <Drive></Drive>
        </section>
        {/* Add a line between the two sections */}
        <hr className="my-4" />
        <section className="w-11/12">
          {/* Increased width to 91.67% */}
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Upcoming</h2>
          <Drive></Drive>
          {/* Add your ongoing section content here */}
        </section>
      </div>
    </>
  );
};

export default Home;
