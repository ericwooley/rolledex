import React from 'react';

import styled from 'styled-components/native';

/* eslint-disable-next-line */
export interface UiProps {}

const StyledUi = styled.View``;
const StyledText = styled.Text`
  color: pink;
`;

export function Ui(props: UiProps) {
  return (
    <StyledUi>
      <StyledText> Welcome to ui!</StyledText>
    </StyledUi>
  );
}

export default Ui;
