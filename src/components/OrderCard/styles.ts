import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { OrderStatus } from ".";

interface ContainerProps {
  index: number;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 50%;
  align-items: center;
  padding: 24px;

  ${({ theme, index }) => {
    if (index % 2 === 0) {
      return css`
        border-right-width: 1px;
        border-right-color: ${theme.colors.shape};
      `;
    }

    return "";
  }}
`;

export const Image = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
`;

export const Name = styled.Text`
  font-size: 20px;
  margin-top: 21px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.title};
    color: ${theme.colors.secondary[900]};
  `}
`;

export const Description = styled.Text`
  font-size: 14px;
  margin-top: 11px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.text};
    color: ${theme.colors.secondary[400]};
  `}
`;

interface StatusProps {
  status: OrderStatus;
}

export const StatusContainer = styled.View<StatusProps>`
  padding: 4px 16px;
  border-radius: 12px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;

  ${({ theme, status }) => {
    if (status === "Preparando") {
      return css`
        background-color: ${theme.colors.alert[50]};
        border: 1px solid ${theme.colors.alert[900]};
      `;
    }

    if (status === "Pronto") {
      return css`
        background-color: ${theme.colors.success[900]};
        border: 1px solid ${theme.colors.success[900]};
      `;
    }

    if (status === "Entregue") {
      return css`
        background-color: ${theme.colors.secondary[900]};
        border: 1px solid ${theme.colors.secondary[900]};
      `;
    }

    return "";
  }}
`;

export const StatusLabel = styled.Text<StatusProps>`
  font-size: 12px;
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.text};

  ${({ theme, status }) => css`
    color: ${status === "Preparando"
      ? theme.colors.alert[900]
      : theme.colors.title};
  `}
`;
