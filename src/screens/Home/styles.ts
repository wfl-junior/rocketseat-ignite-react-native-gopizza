import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import styled, { css } from "styled-components/native";
import { Button } from "~/components/Button";

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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${getStatusBarHeight() + 33}px 24px 58px;
`;

export const Greeting = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreetingEmoji = styled.Image`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

export const GreetingText = styled.Text`
  font-size: 20px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.title};
    color: ${theme.colors.title};
  `}
`;

export const SignOutButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 25px 24px 0;
  padding-bottom: 22px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.shape};
`;

export const MenuItemsNumber = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.text};
    color: ${theme.colors.secondary[900]};
  `}
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 20px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.title};
    color: ${theme.colors.secondary[900]};
  `}
`;

export const NewProductButton = styled(Button)`
  margin: 0 24px;
  margin-bottom: ${getBottomSpace() + 12}px;
`;
