import { useState, useCallback, useEffect } from "react";

interface UseFormStateOpts<S> {
  transform?: (val: S) => S;
}

export default function useFormState<S>(
  initialState: S | (() => S),
  opts?: UseFormStateOpts<S>
) {
  const [value, setValue] = useState(initialState);

  const onChange = useCallback(
    (e) => {
      const transform = opts?.transform ?? ((v) => v);
      if (e && typeof e === "object" && e.target instanceof HTMLElement) {
        setValue(transform(e.target.value));
      } else {
        setValue(transform(e));
      }
    },
    [opts?.transform]
  );

  useEffect(() => {
    if (typeof initialState !== "function" && initialState !== value) {
      setValue(initialState);
    }
  }, [initialState]);

  return { value, onChange };
}

export function useCheckboxState(initialState: boolean | (() => boolean)) {
  const [value, setValue] = useState(initialState);
  const onChange = useCallback((e) => setValue(e.target.checked), []);
  useEffect(() => {
    if (typeof initialState !== "function" && initialState !== value) {
      setValue(initialState);
    }
  }, [initialState]);
  return { checked: value, onChange };
}
