import React, { useState } from "react";

// hooks react- useState(), useEffect(), useRef,useCallback, useMemo,useContext
const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);

    console.log("increment count", count);
  };
  const handleDicrement = () => {
    setCount(count - 1);

    console.log("decrement count", count);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          fontSize: "4rem",
        }}
      >
        {count}
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <button onClick={handleIncrement}>+ Increment</button>
        <button onClick={handleDicrement}>- Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
