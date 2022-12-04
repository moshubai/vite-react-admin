import { useEffect, useRef, useState } from "react";

const useCallBackState = (initState) => {
  const [state, setState] = useState(initState);
  const isUpdate = useRef();
  const setCallBackState = (state, cb) => {
    setState((preValue) => {
      isUpdate.current = cb;
      return typeof state === "function" ? state(preValue) : state;
    });
  };
  useEffect(() => {
    if (isUpdate.current) {
      // 不设置回调函数的话 isUpdate.current 是undefined,所以不会执行
      isUpdate.current(state);
    }
  }, [state]);

  return [state, setCallBackState];
};

export default useCallBackState;
