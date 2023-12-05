import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { TenderiumContext } from '../utils/Context';
import TenderButton from '../components/TenderButton';
import Loader from '../components/Loader';
import CountBox from '../components/CountBox';
import { thirdweb } from '../assets';
import { MediaRenderer } from '@thirdweb-dev/react';

const TenderDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { contract, connect, address, completeTender } = TenderiumContext();

  const [finished, setFinished] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setFinished(() => state.state);
  }, []);

  if(!state || !contract || !address){
    navigate('/');
  }

  const handleCompleteTender = async (_id: number) => {
    if(!address){
      await connect();
      return;
    }
    setIsLoading(() => true);
    const _data = await completeTender(_id);
    setIsLoading(() => false);
    setFinished(() => true)
    console.log(_data);
  }

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <MediaRenderer src={state.image} alt="tender" className="!w-full h-[410px] object-cover rounded-xl"/>
        </div>

        <div className="flex md:w-[250px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Deadline" value={state.deadline} />
          <CountBox title="Tender ID" value={state.id} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5 mb-10">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Sides of the Contract</h4>

            <div className="mt-[20px] flex flex-col items-center flex-wrap gap-[14px]">

              <div className='w-full flex gap-[14px]'>
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">Client (or Buyer):</h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">{state.buyer}</p>
                </div>
              </div>
              
              <div className='w-full flex gap-[14px]'>
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">Supplier (or Contractor):</h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">{state.to}</p>
                </div>
              </div>

            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Description</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
              </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Finished earlier?</h4>   

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#d0d2ee]">
              Tender Status: {finished ? "Complete" : "Not Complete"}
            </p>
            <div className={!finished ? "mt-[30px]" : ""}>
              <TenderButton
                btnType="button"
                title={address ? "Complete" : "Connect"}
                styles={`w-full bg-[#8c6dfd] ${finished ? "hidden" : ""}`}
                handleClick={() => address ? handleCompleteTender(state.id) : connect()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TenderDetails