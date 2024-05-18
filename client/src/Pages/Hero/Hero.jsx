import { Link } from "react-router-dom"
import { Button } from "../../Components/ui/button"
import Navbar from "../../Components/Navbar/Navbar"
import img from "../../assets/it-services.jpg"
import Services from "../Services/Services"

export default function Hero() {
  return (
    <div>
        <Navbar/> 
        <div className="d-flex justify-content-center align-items center">
        <section className="flex  flex-col md:flex-row items-center justify-between bg-white py-12 px-4 md:px-8" >
      <div className="flex-1 content-around max-w-lg mb-8 md:mb-0">
        <h1 className="text-5xl font-bold mb-6">Welcome to <span style={{color: "#22c55e", fontWeight: 800}}>Dern</span> Support</h1>
        <p className="text-lg mb-6">
        At Dern Support, our mission is to empower businesses with the technology and support they need to thrive in today’s digital landscape. We strive to deliver exceptional IT services that enhance productivity, improve security, and foster innovation.
        </p>
        <Button className="bg-[#22c55e] text-white"><Link to={localStorage.getItem("token") ? "/services": "/login"}>explore services</Link></Button>
      </div>
      <div className="flex-1 ">
        <img alt="People running uphill towards their dreams" className="max-w h-auto " style={{borderRadius: "10px"}} src={img} />
      </div>
    </section>
    </div>
    </div>
  )
}

