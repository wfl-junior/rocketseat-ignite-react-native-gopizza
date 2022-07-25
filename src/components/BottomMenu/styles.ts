import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface TitleProps {
  color: string;
}

export const Title = styled.Text<TitleProps>`
  font-size: 18px;

  ${({ theme, color }) => css`
    font-family: ${theme.fonts.title};
    color: ${color};
  `}
`;

interface NotificationProps {
  noNotifications: boolean;
}

export const Notification = styled.View<NotificationProps>`
  height: 20px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  margin-left: 8px;

  ${({ theme, noNotifications }) => {
    if (noNotifications) {
      return css`
        background-color: transparent;
        border: 1px solid ${theme.colors.shape};
      `;
    }

    return css`
      background-color: ${theme.colors.success[900]};
    `;
  }}
`;

export const Quantity = styled.Text<NotificationProps>`
  font-size: 12px;

  ${({ theme, noNotifications }) => css`
    font-family: ${theme.fonts.text};
    color: ${noNotifications
      ? theme.colors.secondary[500]
      : theme.colors.title};
  `}
`;
