import { useState, useCallback, useEffect } from "react";
import useMemoObject from "./useMemoObject";

interface UseFormStateOpts<S> {
  transform?: (val: string | number) => S;
}

export default function useFormState<S extends string | number>(
  initialState: S | (() => S),
  opts?: UseFormStateOpts<S>
): {
  value: S;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
} {
  const [value, setValue] = useState(initialState);

  const onChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const transform = opts?.transform ?? ((v) => v as S);
      setValue(
        transform(
          e.target instanceof HTMLInputElement && e.target.type === "number"
            ? e.target.valueAsNumber
            : e.target.value
        )
      );
    },
    [opts?.transform]
  );

  useEffect(() => {
    if (typeof initialState !== "function" && initialState !== value) {
      setValue(initialState);
    }
  }, [initialState]);

  return useMemoObject({ value: value, onChange });
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
