import React, { createContext, useContext, useState } from "react";
import {
  Directory,
  Memo,
  onCreateArgs,
  onDeleteArgs,
  onMoveArgs,
  onRenameArgs,
} from "../types/Memo.types";
import { useAuthContext } from "./AuthContext";
import useAllActions from "../hooks/useAllActions";

type Props = {
  children: React.ReactElement;
  memoStore?: Directory;
  onClickMemo: (memo: Memo | null) => void;
  onClose: (
    event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => void;
  onOpen: (
    event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => void;
  open: boolean;
};

type TreeViewContextProps = {
  onCreate: (args: onCreateArgs) => null;
  onDelete: (args: onDeleteArgs) => void;
  onRename: (args: onRenameArgs) => void;
  onMove: (args: onMoveArgs) => void;
  onClickDirectory: (id: string | null) => void;

  memoStore?: Directory;
  onClickMemo: (memo: Memo | null) => void;
  onClose: (
    event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => void;
  onOpen: (
    event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => void;
  open: boolean;
};

const TreeViewContext = createContext<TreeViewContextProps>({
  onCreate: () => null,
  onDelete: () => {},
  onRename: () => {},
  onMove: () => {},
  onClickDirectory: () => {},
  onClickMemo: () => {},
  onClose: () => {},
  onOpen: () => {},
  open: false,
  memoStore: undefined,
});

export default function TreeViewContextProvider({
  children,
  memoStore,
  onClickMemo,
  onClose,
  onOpen,
  open,
}: Props) {
  // 바깥에서부터 받아야하는 거 빼고 전부 이 안에서...
  const [directory, setDirectory] = useState<string | null>(null);
  const { user } = useAuthContext();

  const { handleCreate, handleDelete, handleMove, handleRename } =
    useAllActions(directory, user);

  return (
    <TreeViewContext.Provider
      value={{
        onCreate: handleCreate,
        onDelete: handleDelete,
        onMove: handleMove,
        onRename: handleRename,
        onClickDirectory: (id: string | null) => {
          setDirectory(id);
        },
        onClickMemo,
        onClose,
        onOpen,
        open,
        memoStore,
      }}
    >
      {children}
    </TreeViewContext.Provider>
  );
}

export function useTreeViewContext() {
  return useContext(TreeViewContext);
}
