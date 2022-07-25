import { Container, Notification, Quantity, Title } from "./styles";

interface BottomMenuProps {
  title: string;
  color: string;
  notifications?: string;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({
  title,
  color,
  notifications,
}) => {
  const noNotifications = notifications === "0";

  return (
    <Container>
      <Title color={color}>{title}</Title>
      {notifications ? (
        <Notification noNotifications={noNotifications}>
          <Quantity noNotifications={noNotifications}>{notifications}</Quantity>
        </Notification>
      ) : null}
    </Container>
  );
};
