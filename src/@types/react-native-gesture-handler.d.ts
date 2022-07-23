import { ReactNode } from "react";
import {
  BorderlessButtonProps as OriginalBorderlessButtonProps,
  RectButtonProps as OriginalRectButtonProps,
} from "react-native-gesture-handler";

declare module "react-native-gesture-handler" {
  export interface RectButtonProps extends OriginalRectButtonProps {
    children?: ReactNode;
  }

  export interface BorderlessButtonProps extends OriginalBorderlessButtonProps {
    children?: ReactNode;
  }
}
