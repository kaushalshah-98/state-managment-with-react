import React from 'react';
import { Reducer, useCallback, useReducer } from 'react';
import { createContainer, getUntrackedObject } from 'react-tracked';

type ComponentType = typeof React.Component | typeof React.PureComponent;

const createStore = <S extends {}, A extends {}>(reducer: Reducer<S, A>, initialState: S) => {
  const useValue = () => useReducer(reducer, initialState);
  const { Provider, useTracked, useTrackedState, useSelector, useUpdate } =
    createContainer(useValue);
  // tslint:disable-next-line: whitespace
  const untrackDeep = <T,>(obj: T) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    const untrackedObj = getUntrackedObject(obj);
    if (untrackedObj !== null) return untrackedObj;
    const newObj = {} as T;
    let modified = false;
    Object.entries(obj).forEach(([k, v]) => {
      const vv = untrackDeep(v);
      if (vv !== null) {
        newObj[k as keyof T] = vv;
        modified = true;
      } else {
        newObj[k as keyof T] = v;
      }
    });
    return modified ? newObj : obj;
  };
  /**
   * * Same as Dispatch, but it is safer
   */
  const useSafeDispatch = () => {
    const dispatch = useUpdate();
    return useCallback(
      (action) => {
        const untrackedAction = untrackDeep(action);
        // console.log(action, untrackedAction);
        dispatch(untrackedAction);
      },
      [dispatch]
    );
  };
  /**
   * * Use this as HTML Tag to access context in Class Components
   */

  // children: ({state, dispatch}: {state:S, dispatch:React.Dispatch<A>}) => JSX.Element;
  const UserContextConsumer = (props: {
    children: ([state, dispatch]: [S, React.Dispatch<A>]) => JSX.Element;
  }) => {
    const [state, dispatch] = useTracked();
    return props.children([state, dispatch]);
    // return props.children({ state, dispatch });
  };
  /**
   * * wrap this HOC to access context in Class Components
   */
  const WithTracked = (Component: ComponentType) => (props: any) => {
    const [state, dispatch] = useTracked();
    return <Component state={state} dispatch={dispatch} {...props} />;
  };
  // const UserContextConsumer1 = ({ render }: { render: any }) => {
  //   const [state, dispatch] = useTracked();
  //   return render(state, dispatch);
  // };
  return {
    Provider,
    WithTracked,
    useTracked,
    useTrackedState,
    UserContextConsumer,
    useSelector,
    useUpdate,
    useSafeDispatch
  };
};

export default createStore;
// export {};
