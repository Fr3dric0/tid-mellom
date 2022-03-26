import React, { useEffect, useState } from 'react';
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

const ListenInput: React.FC<{
  onResults: (results: { transcript: string; confidence: number }) => void
}> = ({ onResults }) => {
  const [hasTriggered, setHasTriggered] = useState(false);
  useEffect(() => {
    if (!hasTriggered) {
      return;
    }
    // @ts-ignore
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'nb-NO';

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
      console.log("We are listening. Try speaking into the microphone.");
    };

    recognition.onspeechend = function() {
      // when user is done speaking
      recognition.stop();
      setHasTriggered(false);
    }

    // This runs when the speech recognition service returns result
    recognition.onresult = function(event: any) {
      var transcript = event.results[0][0].transcript;
      var confidence = event.results[0][0].confidence;

      console.log(transcript)
      console.log(confidence);

      onResults({ transcript, confidence });
    };
    recognition.start();
  }, [hasTriggered]);

  return <>
    {hasTriggered && <p>👂</p>}
    <button onClick={() => setHasTriggered(true)} disabled={hasTriggered}>🎤</button>
  </>;
};

function App() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  return (
    <div className="flex items-center justify-center flex-col h-[100vh]">
      <header>
        <h1 className="m-5 text-4xl mx-auto block text-center font-bold">Tid mellom</h1>
      </header>
      <main className="p-4 px-5 mx-auto max-w-xl">
        <div className="flex justify-center items-center">
          <div>
            <div className="p-2 text-xl">
              <ListenInput onResults={({ transcript, confidence }) => {
                console.log({ transcript, confidence });
                setStart(transcript)
              }}/>
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
              <ListenInput onResults={({ transcript, confidence }) => {
                console.log({ transcript, confidence });
                setEnd(transcript)
              }}/>
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
