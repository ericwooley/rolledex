import React from 'react';

import styled from 'styled-components/native';

/* eslint-disable-next-line */
export interface UiProps {}

const StyledUi = styled.View`
  color: pink;
`;

export function Ui(props: UiProps) {
  return (
    <StyledUi>
      <h1>Welcome to ui!</h1>
    </StyledUi>
  );
}

export default Ui;
