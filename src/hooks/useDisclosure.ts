import { useState, useCallback } from "react";
import useMemoObject from "./useMemoObject";

export default function useDisclosure(initial?: boolean) {
  const [isOpen, setIsOpen] = useState(initial ?? false);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);
  const toggle = useCallback(() => setIsOpen((o) => !o), []);
  return useMemoObject({ isOpen, close, open, toggle });
}
