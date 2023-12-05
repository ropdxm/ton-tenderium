import { useNavigate } from 'react-router-dom';
import TenderCard from './TenderCard';
import { loader } from '../assets';

export interface ITender {
  id?: number;
  buyer: string;
  to: string;
  title: string;
  description: string;
  image: string;
  amount: string;
  deadline: string;
}

interface IDisplayTenders {
  title: string;
  isLoading: boolean;
  tenders: ITender[];
}

const DisplayTenders = ({ title, isLoading, tenders }: IDisplayTenders) => {
  const navigate = useNavigate();

  const handleNavigate = (tenderrr: ITender, id: number) => {
    navigate(`/tender-details/${id}`, { state: {...tenderrr, id} })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({tenders.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && tenders.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any tenders yet
          </p>
        )}

        {!isLoading && tenders.length > 0 && tenders.map((tender: ITender, index: number) => <TenderCard 
          key={index}
          {...tender}
          handleClick={() => handleNavigate(tender, index)}
        />)}
      </div>
    </div>
  )
}

export default DisplayTenders