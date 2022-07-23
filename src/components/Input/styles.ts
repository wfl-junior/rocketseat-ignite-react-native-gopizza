import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";
import { InputType } from ".";

interface ContainerProps {
  type: InputType;
}

export const Container = styled(TextInput).attrs<ContainerProps>(
  ({ theme, type }) => ({
    placeholderTextColor:
      type === "primary"
        ? theme.colors.secondary[900]
        : theme.colors.primary[50],
  }),
)<ContainerProps>`
  width: 100%;
  height: 56px;
  background-color: transparent;
  border-radius: 12px;
  font-size: 14px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 16px;

  ${({ theme, type }) => css`
    font-family: ${theme.fonts.text};
    border: 1px solid ${theme.colors.shape};
    color: ${type === "primary"
      ? theme.colors.secondary[900]
      : theme.colors.title};
  `}
`;
