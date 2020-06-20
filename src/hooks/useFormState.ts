import React, { useState, useCallback, useEffect } from "react";
import useMemoObject from "./useMemoObject";

interface UseFormStateOpts<S> {
  transform?: (val: string) => S;
}

export default function useFormState<S extends string | number>(
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

  return useMemoObject({ value: String(value), onChange });
}

export function useCheckboxState(initialState: boolean | (() => boolean)) {
  const [checked, setChecked] = useState(initialState);
  const onChange = useCallback((e) => setChecked(e.target.checked), []);
  useEffect(() => {
    if (typeof initialState !== "function" && initialState !== checked) {
      setChecked(initialState);
    }
  }, [initialState]);

  return useMemoObject({ checked, onChange });
}
