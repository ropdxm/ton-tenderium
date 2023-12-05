import { useState, useRef, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';

import { TenderiumContext } from '../utils/Context';
import TenderButton from '../components/TenderButton';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import { checkIfImage } from '../utils';

const CreateTender = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createTender, uploadPhoto } = TenderiumContext();

  const InameRef = useRef<HTMLInputElement>();
  const ItitleRef = useRef<HTMLInputElement>();
  const IdescriptionRef = useRef<HTMLTextAreaElement>();
  const ItargetRef = useRef<HTMLInputElement>();
  const IdeadlineRef = useRef<HTMLInputElement>();
  const IimageRef = useRef<HTMLInputElement>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !InameRef.current ||
      !ItitleRef.current ||
      !IdescriptionRef.current ||
      !ItargetRef.current ||
      !IdeadlineRef.current ||
      !IimageRef.current ||
      !InameRef.current?.value ||
      !ItitleRef.current?.value ||
      !IdescriptionRef.current?.value ||
      !ItargetRef.current?.value ||
      !IdeadlineRef.current?.value ||
      !IimageRef.current?.files
    ) {
      alert("Fill out all fields!")
      return;
    }

    const name = InameRef.current.value;
    const title = ItitleRef.current.value;
    const description = IdescriptionRef.current.value;
    const target = ItargetRef.current.value;
    const deadline = IdeadlineRef.current.value;
    const image = IimageRef.current.files[0];
    

    if(checkIfHasDotComma(target)){
      return alert('Whole numbers only!');
    }
    let targetTemp = AddThreeDots(target);

    if(!checkIfImage(image)){
      return;
    };

    setIsLoading(true)
    const imgUrl = await uploadPhoto(image);
    await createTender({ to: name, title, description, imgUrl: imgUrl, deadline , amount: targetTemp})
  setIsLoading(false);
    navigate('/');
  }
  
  const checkIfHasDotComma = (str: string) => {
    for(const _ch of str){
      if(_ch==='.' || _ch===','){
        return true;
      }
    }
    return false;
  }

  const AddThreeDots = (_amount: string) => {

    var res: string = "";
    let count=0;
    for(let i = _amount.length-1; i>=0; i--){
      if(count===3){
        res += '.';
        count=0;
      }

      res += _amount[i];

      count++;
    }

    res = reverseString(res);
    return res;
  }

  function reverseString(str: string) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
      reversed += str[i];
    }
    return reversed;
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create a Tender</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            ref={InameRef}
            labelName="Supplier *"
            placeholder="0x {address}"
            inputType="text"
          />
          <FormField 
            ref={ItitleRef}
            labelName="Tender Title *"
            placeholder="Write a title"
            inputType="text"
          />
        </div>

        <FormField 
            ref={IdescriptionRef}
            labelName="Description *"
            placeholder="Write your description (what this tender is about, etc.)"
            isTextArea
            inputType='text'
          />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            ref={ItargetRef}
            labelName="Amount (whole numbers only) *"
            placeholder="KZT 10.000.000"
            inputType="number"
          />
          <FormField
            ref={IdeadlineRef}
            labelName="Deadline *"
            placeholder="Deadline"
            inputType="date"
          />
        </div>

        <FormField
            ref={IimageRef}
            labelName="Tender image *"
            placeholder="Place image URL of your tender"
            inputType="file"
          />

          <div className="flex justify-center items-center mt-[40px]">
            <TenderButton 
              btnType="submit"
              title="Create"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateTender;