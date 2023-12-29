
import Drive from "@/components/drive_file";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        {/* Added flex-col */}
        <section className="w-5/6">
          {/* Increased width to 83.33% */}
          <h2>Ongoing</h2>
          <Drive></Drive>
        </section>
        <section className="w-5/6">
          {/* Increased width to 83.33% */}
          <h2>Upcoming</h2>
          <Drive></Drive>
          {/* Add your ongoing section content here */}
          
          
        </section>
      </div>
    </>
  );
};

export default Home;
