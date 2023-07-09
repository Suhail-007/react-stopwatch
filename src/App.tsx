import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

import './App.css';


function App() {
  const [time, setTime] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [laps, setLaps] = useState<Array<string>>([]);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const intervalRef = useRef<number>()

  useEffect(() => {

    if (!isTimerOn) return clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10);

    return () => clearInterval(intervalRef.current);
  }, [isTimerOn])


  const miliseconds = Math.floor((time / 10) % 100);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 60000) % 60);

  function twoDigits(time: number) {
    return (
      <>{time < 10 ? `0${time}` : time}</>
    )
  }

  function resetHandler() {
    setIsTimerOn(false);
    setTime(0);
    setLaps([])
  }

  function lapHandler() {
    setLaps(prevLaps => [...prevLaps, paraRef.current!.innerText]);
  }

  return (
    <>
      <main>
        <p ref={paraRef} style={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem' }}>

          {/* Minutes*/}
          {twoDigits(minutes)}:{twoDigits(seconds)}:{twoDigits(miliseconds)}
        </p>

        <div style={{ display: 'flex', gap: '.4em', justifyContent: 'center' }}>
          {!isTimerOn && time === 0 && <button onClick={setIsTimerOn.bind(null, true)}>Start</button>}
          {isTimerOn && <button onClick={setIsTimerOn.bind(null, false)}>Stop</button>}
          {!isTimerOn && time > 0 && <button onClick={setIsTimerOn.bind(null, true)}>Resume</button>}
          {!isTimerOn && time > 0 && <button onClick={resetHandler}>Reset</button>}
          {time > 0 && <button onClick={lapHandler}>Lap</button>}
        </div>

        {
          laps?.length > 0 &&
          <div>
            <h3>Laps</h3>

            {laps.map(lap => <span key={uuidv4()}>{lap} | </span>)}
          </div>
        }
      </main>
    </>
  )
}

export default App
