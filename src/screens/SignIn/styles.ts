import { LinearGradient } from "expo-linear-gradient";
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled, { css } from "styled-components/native";

export const Container = styled(LinearGradient).attrs(({ theme }) => {
  return {
    colors: theme.colors.gradient,
    start: {
      x: 0,
      y: 1,
    },
    end: {
      x: 0.5,
      y: 0.5,
    },
  };
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary[900]};
  justify-content: center;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  width: 100%;
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 24px;
  align-self: flex-start;

  ${({ theme }) => css`
    font-family: ${theme.fonts.title};
    color: ${theme.colors.title};
  `}
`;

export const Brand = styled.Image.attrs({ resizeMode: "contain" })`
  height: 340px;
  margin-top: 64px;
  margin-bottom: 32px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 20px;
`;

export const ForgotPasswordLabel = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.text};
    color: ${theme.colors.title};
  `}
`;
