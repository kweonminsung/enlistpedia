import { Specialty } from '../../../typings/typings';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext, useState } from 'react';
import { SearchStepContainer } from '../SearchStepOne/SearchStepOne.styles';
import { Accordion } from './Accordion';

interface Props {
  result: Specialty[];
}

export function SearchResult({ result }: Props) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <SearchStepContainer isDarkMode={isDarkMode}>
      <p>
        지원 가능한 특기 목록입니다. 자세한 정보를 보려면 해당 특기를
        클릭하십시오
      </p>
      {result.map((specialty: Specialty, index: number) => (
        <Accordion isDarkMode={isDarkMode} specialty={specialty}></Accordion>
      ))}
    </SearchStepContainer>
  );
}
