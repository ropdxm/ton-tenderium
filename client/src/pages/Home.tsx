import { useState, useEffect } from 'react'

// import { TenderiumContext } from '../utils/Context'
import DisplayTenders, { ITender } from '../components/DisplayTenders.js';
import { useContractRead, useWalletClient, useAccount } from 'wagmi';
import { contractAddress } from '../utils/Context.js';
import { abi } from '../utils/abi.js';

const Home = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [tenders, setTenders] = useState<ITender[]>([]);

  // const { address, contract, getTenders } = TenderiumContext();

  // const fetchTenders = async () => {
  //   setIsLoading(true);
  //   let data = await getTenders();
  //   console.log("Tenders: ");
  //   console.log(data);
  //   setIsLoading(false);

  //   setTenders(data);

  // }

  
  

  // useEffect(() => {
  //   if(contract) fetchTenders();
  // }, [address, contract]);


  const { address } = useAccount();
  const [ screen , setScreen] = useState("home");
  const [candidates, setCandidates] = useState([]);

  const { data: Tenders, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: 'getTenders',
    watch: true
  })

  return (
    // <DisplayTenders
    //   title="All Tenders"
    //   isLoading={isLoading}
    //   tenders={tenders}
    // />
    <div>
      {JSON.stringify(Tenders)}
    </div>
  )
}

export default Home