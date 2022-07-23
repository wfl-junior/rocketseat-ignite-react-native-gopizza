import styled from "styled-components/native";

export const Container = styled.View`
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
