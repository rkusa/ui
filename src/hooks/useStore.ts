import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from "react";

const SETTERS = Symbol("setters");

export class Store<T> {
  private state: T;
  public [SETTERS]: Set<Dispatch<SetStateAction<T>>>;

  public constructor(state: T) {
    this.state = state;
    this[SETTERS] = new Set();
  }

  public set(state: T) {
    this.state = state;
    this.notify();
  }

  public get(): T {
    return this.state;
  }

  private notify() {
    const data = this.get();
    for (const setter of this[SETTERS]) {
      setter(data);
    }
  }
}

function isCallableStateAction<T>(
  s: T | ((prevState: T) => T)
): s is (prevState: T) => T {
  return typeof s === "function";
}

export default function useStore<T>(
  store: Store<T>
): [T, Dispatch<SetStateAction<T>>] {
  const [data, setData] = useState(store.get());

  useEffect(() => {
    return () => {
      // on cleanup, remove the setter
      store[SETTERS].delete(setData);
    };
  }, []);

  const setter = useCallback((s: T | ((prevState: T) => T)) => {
    if (isCallableStateAction(s)) {
      store.set(s(store.get()));
    } else {
      store.set(s);
    }
  }, []);

  // keep track of the setData, for future data change notifications
  if (!store[SETTERS].has(setData)) {
    store[SETTERS].add(setData);
  }

  return [data, setter];
}
