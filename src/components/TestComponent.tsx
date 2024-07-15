import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import { RootState } from "../store/store";
import { increment, decrement } from "../features/TestSlice";

function TestComponent() {
  const count = useSelector((state: RootState) => state.test.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>{count}</h2>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
    </div>
  );
}

export default TestComponent;
