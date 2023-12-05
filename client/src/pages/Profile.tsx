import { useState, useEffect } from 'react'

import DisplayTenders, { ITender } from '../components/DisplayTenders';
import { TenderiumContext } from '../utils/Context'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tenders, setTenders] = useState<ITender[]>([]);
  const navigate = useNavigate();

  const { address, contract, getUserTenders, connect } = TenderiumContext();

  const fetchTenders = async () => {
    setIsLoading(true);
    const data = await getUserTenders();
    setTenders(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchTenders();
  }, [address, contract]);

  if(!address){
    navigate('/');
    connect();
  }

  return (
    <DisplayTenders 
      title="All Tenders"
      isLoading={isLoading}
      tenders={tenders}
    />
  )
}

export default Profile