import React, { useState, useCallback, useEffect, useRef } from "react";

interface UseFormStateOpts<S> {
  transform?: (val: string) => S;
}

export default function useFormState<S extends string>(
  initialState: S | (() => S),
  opts?: UseFormStateOpts<S>
) {
  const [value, setValue] = useState(initialState);

  const onChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const transform = opts?.transform ?? ((v) => v as S);
      setValue(transform(e.target.value));
    },
    [opts?.transform]
  );

  useEffect(() => {
    if (typeof initialState !== "function" && initialState !== value) {
      setValue(initialState);
    }
  }, [initialState]);

  const result = useRef({ value, onChange });
  result.current.value = value;
  result.current.onChange = onChange;

  return result.current;
}

export function useCheckboxState(initialState: boolean | (() => boolean)) {
  const [checked, setChecked] = useState(initialState);
  const onChange = useCallback((e) => setChecked(e.target.checked), []);
  useEffect(() => {
    if (typeof initialState !== "function" && initialState !== checked) {
      setChecked(initialState);
    }
  }, [initialState]);

  const result = useRef({ checked, onChange });
  result.current.checked = checked;
  result.current.onChange = onChange;

  return result.current;
}
