import React, { useState } from 'react';
import { differenceInMinutes } from 'date-fns';

const timeAsDate = (time: string): Date => {
  const [hour, minute] = time.split(':');

  console.log(`${hour}:${minute}`);
  const date = new Date();

  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(minute, 10));
  return date;
};

const TimeDifference: React.FC<{ start: string, end: string }> = ({ start, end }) => {
  const startAsDate = timeAsDate(start);
  const endAsDate = timeAsDate(end);


  const minutes = differenceInMinutes(endAsDate, startAsDate);

  return <div className="p-1 text-3xl max-w-xl">
    {(!start || !end)
      ? <p>Velg tid</p>
      : <p><strong className="font-black font-normal">{minutes}</strong> Minutt</p>}
  </div>;
};

function App() {

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  return (
    <div>
      <header>
        <h1 className="m-5 text-4xl mx-auto block text-center font-bold">Tid mellom</h1>
      </header>
      <main>
        <div className="flex justify-center items-center">
          <div>
            <div className="p-2 text-xl">
              <label htmlFor="id-start" className="font-bold">Start</label>
              <input
                id="id-start"
                type="time"
                name="start"
                min="00:00"
                max="23:59"
                className="p-1"
                onChange={(event) => setStart(event.target.value)}
                value={start}
              />
            </div>
            <div className="p-2 text-xl">
              <label htmlFor="id-end" className="font-bold">Slutt</label>
              <input
                id="id-end"
                type="time"
                name="end"
                min="00:00"
                max="23:59"
                className="p-1"
                onChange={(event) => setEnd(event.target.value)}
                value={end}
              />
            </div>
          </div>

          <TimeDifference start={start} end={end}/>
        </div>
      </main>
    </div>
  );
}

export default App;
