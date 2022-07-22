import { css } from '@emotion/css';
import { LoadingContainer, LoadingSpinner } from './Loading.styles';

interface Props {
  isDarkMode: boolean;
}

export function Loading({ isDarkMode }: Props) {
  return (
    <LoadingContainer>
      <LoadingSpinner isDarkMode={isDarkMode} />
    </LoadingContainer>
  );
}
