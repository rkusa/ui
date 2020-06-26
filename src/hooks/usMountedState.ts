import { useState, Dispatch, SetStateAction, useCallback } from "react";
import useMounted from "./useMounted";

export default function useMountedSate<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
  const isMounted = useMounted();
  const setMountedState = useCallback(
    (value: S | ((prevState: S) => S)) => {
      if (isMounted.current) {
        setState(value);
      }
    },
    [setState]
  );
  return [state, setMountedState];
}
