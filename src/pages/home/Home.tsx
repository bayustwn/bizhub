import { useNavigate } from "react-router";

function Home() {

    const navigate = useNavigate()



    return (
        
      <div className="h-screen w-screen flex justify-center gap-2 flex-col items-center">
        <p className="font-placard font-normal text-3xl">SISTEM MONITORING TUGAS</p>
        <p className="text-6xl font-placard font-bold">BIZHUB DIGITAL INDONESIA</p>
        <button onClick={()=>navigate('/login')} className="border-3 rounded-md py-2 px-10 font-bold mt-2 transition-all cursor-pointer transition-ease text-black bg-white hover:bg-black hover:text-white ">Masuk</button>
      </div>
    )
  }
  
  export default Home;
  