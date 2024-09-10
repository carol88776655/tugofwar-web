"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Screen() {
    const [secondsRemaining, setSecondsRemaining] = useState(10);  
    const router = useRouter();

    const startGame = () => {
        router.push('/game');
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        setSecondsRemaining(prevSeconds => {
          if (prevSeconds <= 0) {
            clearInterval(intervalId);
            startGame();
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000); 
  
      return () => clearInterval(intervalId); 
    }, []); 

  return (
    <div className="h-screen w-screen bg-yellow-300 flex items-center justify-center">
        <div className="text-[120px] text-white">
            {secondsRemaining}
        </div>
    </div>
  );
}
