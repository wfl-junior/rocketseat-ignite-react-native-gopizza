import styled, { css } from "styled-components/native";

export const Image = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

export const Placeholder = styled.View`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  align-items: center;
  justify-content: center;
  border: 1px dashed ${({ theme }) => theme.colors.secondary[900]};
`;

export const PlaceholderTitle = styled.Text`
  font-size: 14px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.fonts.text};
    color: ${theme.colors.secondary[900]};
  `};
`;
