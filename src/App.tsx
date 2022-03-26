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
    recognition.interimResults = false;

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
      console.log("We are listening. Try speaking into the microphone.");
    };
    // On any that may have occurred
    recognition.onerror = function(event: any) {
      console.error('Failed to capture speech');
      console.log(event);
    };

    // Start of any speech the parser recognized as voice
    recognition.onspeechstart = (event: any) => {
      console.log('Started recognizing speech');
      console.log(event);
    }

    // End of any speech the parser recognized as voice
    recognition.onspeechend = function() {
      console.log('Stopped recognizing speech');
      // when user is done speaking
      recognition.stop();
      setHasTriggered(false);
    };

    // End of any sound discovered
    recognition.onsoundend = (event: any) => {
      console.log('End of sound');
      console.log(event);
    };

    // This runs when the speech recognition service returns result
    recognition.onresult = function(event: any) {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;

      console.log(transcript)
      console.log(confidence);

      onResults({ transcript, confidence });
    };
    // Called if no match are found
    recognition.onnomatch = (event: any) => {
      console.log('Failed to match on any word');
      console.log(event);
    }

    recognition.start();
  }, [hasTriggered]);


  return <>
    {hasTriggered && <p>👂</p>}
    <button onClick={() => setHasTriggered(true)} disabled={hasTriggered}>🎤</button>
  </>;
};

const parseRecognizedSpeechToTime = (transcript: string) => {
  if (transcript.includes(':') && transcript.length === 5) {
    return transcript;
  }

  if (transcript.length === 4) {
    return `${transcript.substring(0, 2)}:${transcript.substring(2, 4)}`;
  }

  return '';
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
                setStart(parseRecognizedSpeechToTime(transcript))
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
              <small className="block text-[10px]">{start}</small>
            </div>
            <div className="p-2 text-xl">
              <ListenInput onResults={({ transcript, confidence }) => {
                console.log({ transcript, confidence });
                setEnd(parseRecognizedSpeechToTime(transcript))
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
              <small className="block text-[10px]">{end}</small>
            </div>
          </div>

          <TimeDifference start={start} end={end}/>
        </div>
      </main>
    </div>
  );
}

export default App;
