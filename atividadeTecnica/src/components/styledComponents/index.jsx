import React from 'react';
import styled from "styled-components"

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: ${props=>props.actionButton ? "8%" : "25%" };
  align-items: center;
  margin-top:2px;
  padding: 10px;
  margin-right:${props=>props.actionButton ? "5px" : "0px"}
  
`;