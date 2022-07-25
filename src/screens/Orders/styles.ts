import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => {
  return {
    colors: theme.colors.gradient,
  };
})`
  width: 100%;
  padding: ${getStatusBarHeight() + 33}px 0 33px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.fonts.title};
    color: ${theme.colors.title};
  `}
`;
