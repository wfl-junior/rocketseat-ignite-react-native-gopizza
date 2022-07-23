import { RectButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { ButtonType } from ".";

interface ContainerProps {
  type: ButtonType;
}

export const Container = styled(RectButton)<ContainerProps>`
  flex: 1;
  max-height: 56px;
  min-height: 56px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, type }) => {
    if (type === "primary") {
      return theme.colors.success[900];
    }

    return theme.colors.primary[800];
  }};
`;

export const Title = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    color: ${theme.colors.title};
    font-family: ${theme.fonts.text};
  `}
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => {
  return {
    color: theme.colors.title,
  };
})``;
