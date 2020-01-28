import { useState, useCallback, useEffect } from "react";

export default function useFormState<S>(initialState: S | (() => S)) {
  const [value, setValue] = useState(initialState);
  const onChange = useCallback(e => {
    if (e && typeof e === "object" && e.target instanceof HTMLElement) {
      setValue(e.target.value);
    } else {
      setValue(e);
    }
  }, []);
  useEffect(() => {
    if (typeof initialState !== "function" && initialState !== value) {
      setValue(initialState);
    }
  }, [initialState]);
  return { value, onChange };
}

export function useCheckboxState(initialState: boolean | (() => boolean)) {
  const [value, setValue] = useState(initialState);
  const onChange = useCallback(e => setValue(e.target.checked), []);
  useEffect(() => {
    if (typeof initialState !== "function" && initialState !== value) {
      setValue(initialState);
    }
  }, [initialState]);
  return { checked: value, onChange };
}
