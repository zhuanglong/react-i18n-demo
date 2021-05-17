import React, { useState, useEffect, useRef } from 'react';

const CounterHook = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count change');
  }, [count]);

  const mounting = useRef(true);
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false;
    } else {
      console.log('componentDidUpdate');
    }
  });

  useEffect(() => {
    console.log('componentDidMount');
    return () => {
      console.log('componentWillUnmount');
    };
  }, []);

  return (
    <div>
      <div>
        Hook 计数：
        <span>{count}</span>
      </div>
      <button type="button" onClick={() => setCount(count - 1)}>-</button>
      <button type="button" onClick={() => setCount(count + 1)}>+</button>
      <button type="button" onClick={() => setCount(0)}>reset</button>
    </div>
  );
};

export default CounterHook;
