import { renderHook, act } from "@testing-library/react-hooks";
import useFormState, { useCheckboxState } from "./useFormState";
import { render, fireEvent } from "@testing-library/react";

describe("useFormState", () => {
  test("values updates after change", () => {
    const { result } = renderHook(() => useFormState(""));
    expect(result.current.value).toBe("");

    act(() => {
      result.current.onChange({ target: { value: "foo" } } as React.ChangeEvent<
        HTMLInputElement
      >);
    });
    expect(result.current.value).toBe("foo");

    act(() => {
      result.current.onChange({ target: { value: "bar" } } as React.ChangeEvent<
        HTMLInputElement
      >);
    });
    expect(result.current.value).toBe("bar");
  });

  test("always return the same object reference", () => {
    const { result, rerender } = renderHook(() => useFormState(""));
    const first = result.current;
    rerender();
    const second = result.current;
    expect(first === second).toBe(true);
  });

  test("input element field deconstruction", () => {
    function Test() {
      const field = useFormState("");
      return <input type="text" placeholder="test" {...field} />;
    }

    const { getByPlaceholderText } = render(<Test />);
    const input = getByPlaceholderText("test");
    expect(input.getAttributeNames()).toEqual(["type", "placeholder", "value"]);
  });

  test("number input", () => {
    function Test() {
      const field = useFormState(10);
      return <input type="number" placeholder="test" {...field} />;
    }

    const { getByPlaceholderText } = render(<Test />);
    const input = getByPlaceholderText("test") as HTMLInputElement;
    expect(input.valueAsNumber).toBe(10);
    fireEvent.change(input, { target: { valueAsNumber: 42 } });
    expect(input.valueAsNumber).toBe(42);
  });

  // TODO
  // test('date input', () => {
  //   function Test() {
  //     const field = useFormState(new Date('2020-06-20'));
  //     console.log(field)
  //     return <input type="text" placeholder="test" {...field} />;
  //   }

  //   const { getByPlaceholderText } = render(<Test />);
  //   const input = getByPlaceholderText("test") as HTMLInputElement;
  //   expect(input.valueAsDate).toEqual(new Date('2020-06-20'))
  //   fireEvent.change(input, {target:{valueAsDate: new Date('2020-06-19')}})
  //   expect(input.valueAsDate).toEqual(new Date('2020-06-19'))
  // })

  test("text input with enum type", () => {
    type Enum = "first" | "second" | "third";
    const { result } = renderHook(() => useFormState<Enum>("first")); // this is mostly a Typescript test
    const test: Enum = result.current.value;
    expect(test).toBe("first");
  });
});

describe("useCheckboxState", () => {
  test("values updates after change", () => {
    const { result } = renderHook(() => useCheckboxState(false));
    expect(result.current.checked).toBe(false);

    act(() => {
      result.current.onChange({
        target: { checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.checked).toBe(true);

    act(() => {
      result.current.onChange({
        target: { checked: false },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.checked).toBe(false);
  });

  test("always return the same object reference", () => {
    const { result, rerender } = renderHook(() => useCheckboxState(false));
    const first = result.current;
    rerender();
    const second = result.current;
    expect(first === second).toBe(true);
  });

  test("input element field deconstruction", () => {
    function Test() {
      const field = useCheckboxState(true);
      return <input type="checkbox" placeholder="test" {...field} />;
    }

    const { getByPlaceholderText } = render(<Test />);
    const input = getByPlaceholderText("test");
    expect(input.getAttributeNames()).toEqual([
      "type",
      "placeholder",
      "checked",
    ]);
  });
});
