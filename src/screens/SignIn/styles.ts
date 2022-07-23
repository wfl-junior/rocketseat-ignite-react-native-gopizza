import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

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
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.title};
`;
