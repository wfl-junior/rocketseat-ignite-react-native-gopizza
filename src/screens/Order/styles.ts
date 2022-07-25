import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => {
  return {
    colors: theme.colors.gradient,
  };
})`
  width: 100%;
  padding: ${getStatusBarHeight() + 33}px 24px 108px;
`;

export const Photo = styled.Image`
  width: 240px;
  height: 240px;
  border-radius: 120px;
  align-self: center;
  margin-top: -120px;
`;

export const Form = styled.View`
  width: 100%;
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 46px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.fonts.title};
    color: ${theme.colors.secondary[900]};
  `}
`;

export const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 16px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.text};
    color: ${theme.colors.secondary[900]};
  `}
`;

export const Sizes = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const FormRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const InputGroup = styled.View`
  width: 48%;
`;

export const Price = styled.Text`
  font-size: 14px;
  margin: 24px 0;
  align-self: flex-end;

  ${({ theme }) => css`
    font-family: ${theme.fonts.text};
    color: ${theme.colors.secondary[900]};
  `}
`;
