import { Heading , Stack, Image} from "@chakra-ui/react";
import logo from "../../images/blockdaologo.png";
interface FooterProps{

home:string,
swap: string,
crowdsourcing: string,
dao:string,
wallet: string 

}

const Footer: React.FC<FooterProps> = ({
   
  }) => {


    return (
     <>
     <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <Image src="../../images/blockdaologo.png" alt="logo" className="w-32" > </Image> 
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-white text-base text-center mx-2 cursor-pointer">Home</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">Swap</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">Transfer</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">Crowdsource</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">DaO</p>

      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">Join us make your web3 dream come true</p>
      <p className="text-white text-sm text-center font-medium mt-2">peeman34@gmail.com</p>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">peeman34@gmail.com</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
     </>
    )
}

export default Footer;