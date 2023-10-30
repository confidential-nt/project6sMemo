import { SwipeableDrawer } from "@mui/material";
import "./Drawer.css";

type Props = {
  children: React.ReactElement;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
  onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void;
  open: boolean;
};

export default function Drawer({ children, onClose, onOpen, open }: Props) {
  return (
    <SwipeableDrawer
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      anchor="right"
    >
      {children}
    </SwipeableDrawer>
  );
}
