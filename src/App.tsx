import { useState } from 'react';
import { TimepickerUI } from 'timepicker-ui';

function App() {

  return (
    <div>
      <header>
        <h1 className="m-5 text-4xl mx-auto block text-center font-bold">Tid mellom</h1>
      </header>
      <main>
        <div className="p-1">
          <label htmlFor="">Start</label>
          <input type="time" name="start"/>
        </div>
        <div className="p-1">
          <label htmlFor="">Slutt</label>
          <input type="time" name="end"/>
        </div>
      </main>
    </div>
  );
}

export default App;
