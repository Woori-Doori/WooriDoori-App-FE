import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultButton from '@/components/button/DefaultButton';
import SecureKeypad from '@/components/input/SecureKeypad';
import InputBox from '@/components/input/InputBox';
import SubText from '@/components/text/SubText';
import { validateCard, CardValidationErrors } from '@/utils/card/cardValidation';
import DefaultDiv from '@/components/default/DefaultDiv';
import { CardNumInput } from '@/components/input/CardNumInput';
import { CardBirthNumInput } from '@/components/input/CardBirthNumInput';
import BottomButtonWrapper from '@/components/button/BottomButtonWrapper';

const AddCard: React.FC = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nickname, setNickname] = useState('');

  const [activeField, setActiveField] = useState<string | null>(null);
  const [keypadVisible, setKeypadVisible] = useState(false);
  const [errors, setErrors] = useState<CardValidationErrors>({});

  const handleKeyPress = (key: string) => {
    if (activeField === 'cardNumber') {
      const currentIndex = cardNumber.findIndex(part => part.length < 4);
      if (currentIndex !== -1) {
        const newCardNumber = [...cardNumber];
        newCardNumber[currentIndex] += key;
        setCardNumber(newCardNumber);
      }
    } else if (activeField === 'expiryDate') {
      if (expiryDate.length < 4) {
        setExpiryDate(expiryDate + key);
      }
    } else if (activeField === 'cvc') {
      if (cvc.length < 3) {
        setCvc(cvc + key);
      }
    } else if (activeField === 'password') {
      if (password.length < 2) {
        setPassword(password + key);
      }
    }
  };

  const handleBackspace = () => {
    if (activeField === 'cardNumber') {
      const currentIndex = cardNumber.findIndex(part => part.length > 0);
      if (currentIndex !== -1) {
        const newCardNumber = [...cardNumber];
        newCardNumber[currentIndex] = newCardNumber[currentIndex].slice(0, -1);
        setCardNumber(newCardNumber);
      }
    } else if (activeField === 'expiryDate') {
      setExpiryDate(expiryDate.slice(0, -1));
    } else if (activeField === 'cvc') {
      setCvc(cvc.slice(0, -1));
    } else if (activeField === 'password') {
      setPassword(password.slice(0, -1));
    }
  };

  const handleKeypadClose = () => {
    setKeypadVisible(false);
    setActiveField(null);
  };

  const handleFieldClick = (field: string) => {
    // 생년월일은 보안키패드를 사용하지 않음
    if (field === 'birthDate') return;

    setActiveField(field);
    setKeypadVisible(true);
  };


  const handleComplete = () => {
    const cardData = {
      cardNumber,
      expiryDate,
      cvc,
      password,
      birthDate
    };

    const validation = validateCard(cardData);
    setErrors(validation.errors);

    if (validation.isValid) {
      // 카드 추가 완료 페이지로 이동 (카드 데이터 전달)
      navigate('/card/cards/complete', {
        state: {
          cardNumber,
          expiryDate,
          birthDate,
          nickname: nickname || '새 카드'
        }
      });
    }
  };

  return (
    <DefaultDiv
      isHeader={true}
      title='카드추가' onClose={() => { window.history.back(); }}
    >

      {/* 카드 번호 */}
      <div className="py-5">
        <SubText text="카드번호" className='mb-4' />
        <CardNumInput
          cardNumList={cardNumber}
          errors={errors}
          onClick={() => handleFieldClick('cardNumber')}
        />
      </div>


      {/* 카드 유효기간과 CVC번호 */}
      <div className="flex gap-6 py-5">
        {/* 유효기간 */}
        <div className="flex-1">
          <SubText text="카드 유효기간(MMYY)" className='mb-4' />
          <InputBox
            type="text"
            value={expiryDate}
            placeholder="MMYY"
            isReadOnly={true}
            onClick={() => handleFieldClick('expiryDate')}
            className={`
              cursor-pointer focus:outline-none 
              ${errors.cvc ? 'border-red-500' : 'border-gray-200'}
            `}
          />
          {errors.expiryDate && (
            <p className="mt-2 text-red-500">{errors.expiryDate}</p>
          )}
        </div>

        {/* cvc */}
        <div className="flex-1">
          <SubText text="CVC번호" className='mb-4' />
          <InputBox
            type="text"
            value={cvc}
            placeholder="카드 뒤 3자리"
            isReadOnly={true}
            onClick={() => handleFieldClick('cvc')}
            className={`
              cursor-pointer focus:outline-none 
              ${errors.cvc ? 'border-red-500' : 'border-gray-200'}
            `}
          />
          {errors.cvc && (
            <p className="mt-2 text-red-500">{errors.cvc}</p>
          )}
        </div>
      </div>


      {/* 카드 비밀번호 */}
      <div className="py-5">
        <SubText text="카드 비밀번호" className='mb-4' />
        <InputBox
          type="text"
          value={password}
          placeholder="앞 2자리"
          isReadOnly={true}
          onClick={() => handleFieldClick('password')}
          className={`
              cursor-pointer focus:outline-none 
              ${errors.cvc ? 'border-red-500' : 'border-gray-200'}
            `}
        />
        {errors.password && (
          <p className="mt-2 text-red-500">{errors.password}</p>
        )}
      </div>

      {/* 주민등록번호 */}
      <div className="py-5">
        <SubText text="주민등록번호" className='mb-4' />
        <CardBirthNumInput
          setBirthDate={(e) => { setBirthDate(e) }}
          birthDate={birthDate}
          errors={errors}
        />
      </div>

      {/* 카드 별명 */}
      <div className="py-5">
        <SubText text="카드 별명 (선택)" className='mb-4' />
        <InputBox
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="등록할 카드의 별명을 입력해주세요"
          borderColor="border-gray-200"
          textColor="text-gray-800"
          bgColor="bg-white"
          focusColor="focus:ring-blue-300"
        />
      </div>



      {/* 보안키패드 */}
      <SecureKeypad
        isVisible={keypadVisible}
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onClose={handleKeypadClose}
      />



{/* 등록 버튼 */}
        <BottomButtonWrapper>
          <DefaultButton text='등록' onClick={handleComplete} />
        </BottomButtonWrapper>


    </DefaultDiv>
  );
};

export default AddCard;