import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

interface ContainerProps {
  selected: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 104px;
  height: 82px;
  border-radius: 8px;
  padding: 14px 16px;

  ${({ theme, selected }) => css`
    border: 1px solid
      ${selected ? theme.colors.success[900] : theme.colors.shape};
    background-color: ${selected
      ? theme.colors.success[50]
      : theme.colors.title};
  `}
`;

export const Title = styled.Text`
  font-size: 16px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.title};
    color: ${theme.colors.secondary[900]};
  `}
`;

export const Radio = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.secondary[900]};
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

export const Selected = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.success[900]};
`;
