import { useMemo } from "react";

export default function useMemoObject<T>(value: T) {
  const obj = useMemo(() => value, []);
  Object.assign(obj, value);
  return obj;
}
