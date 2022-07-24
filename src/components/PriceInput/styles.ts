import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 56px;
  border: 1px solid ${({ theme }) => theme.colors.shape};
  border-radius: 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const Size = styled.View`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.shape};
  margin-right: 18px;
`;

export const Label = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.text};
    color: ${theme.colors.secondary[900]};
  `}
`;

export const Input = styled(TextInput)`
  flex: 1;
  margin-left: 7px;
`;
