"use client"
import { useEffect, useState } from "react";

enum Result {
  NONE = 0,
  LEFT_WIN = 1,
  RIGHT_WIN = 2
}

export default function Screen() {
  const [leftPersonCount, setLeftPersonCount] = useState(0);
  const [rightPersonCount, setRightPersonCount] = useState(0);
  const [result, setResult] = useState(Result.NONE);
  const [moveX, setMoveX] = useState(0);
  const [start, setStart] = useState(false);

  const moveLeft = () => {
    setMoveX(prevX => prevX - 10);
  }

  const moveRight = () => {
    setMoveX(prevX => prevX + 10);
  }

  const doStart = () => {
    if (leftPersonCount < 1 || rightPersonCount < 1) {
      alert(" Please add at least one person");
    } else {
      setStart(true);
    }
  }

  useEffect(() => {
    if (moveX < -300) {
      setResult(Result.LEFT_WIN);
    } else if (moveX > 300) {
      setResult(Result.RIGHT_WIN);
    }
  }, [moveX])

  useEffect(() => {
    switch (result) {
      case Result.LEFT_WIN:
        alert("Left Win");
        break;
      case Result.RIGHT_WIN:
        alert("Right Win");
        break;
    }
    if (result !== Result.NONE) {
      setStart(false);
      setLeftPersonCount(0);
      setRightPersonCount(0);
      setMoveX(0);
    }
  }, [result]);

  return (
    <div className="h-screen w-screen bg-yellow-300 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
           <div className="relative flex items-center justify-center h-[200px]">
              <div className="flex items-center justify-center h-full" style={
                {
                  transform: `translateX(${moveX}px)`
                }
              }>
                <div className="left-side flex w-[300px] justify-end">
                  {!start &&<div className="w-10 h-10 bg-white cursor-pointer flex items-center justify-center" onClick={() => setLeftPersonCount(leftPersonCount + 1)}> +</div>}
                  <div className="flex items-center justify-center">
                  {
                    Array.from({ length: leftPersonCount }, (_, index) => (
                      <div className="w-10 h-10 bg-black mx-1" key={index}></div>
                    ))
                  }
                  </div>
                </div>
                <div className="line h-1 w-[600px] bg-white mx-4"></div>
                <div className="right-side flex w-[300px] justify-start">
                  <div className="flex items-center justify-center">
                    {
                      Array.from({ length: rightPersonCount }, (_, index) => (
                        <div className="w-10 h-10 bg-black mx-1" key={index}></div>
                      ))
                    }
                    </div>
                    {!start && <div className="w-10 h-10 bg-white cursor-pointer flex items-center justify-center" onClick={() => setRightPersonCount(rightPersonCount + 1)}>+</div>}
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[200px] w-2 bg-black"></div>
           </div>
        </div>

        {!start && <div className="text-[20px] text-white bg-blue-500 mt-[50px] rounded px-5 py-2 cursor-pointer" onClick={() => doStart()}>Start Play</div>}
                  
        {start && 
          <div className="flex w-[500px] mt-[50px] justify-between">
              <div className="text-[20px] text-white bg-fuchsia-700 rounded px-5 py-2 cursor-pointer" onClick={moveLeft}>Move Left</div>    
              <div className="text-[20px] text-white bg-fuchsia-700 rounded px-5 py-2 cursor-pointer" onClick={moveRight}>Move Right</div>    
          </div>
        }
    </div>
  );
}
