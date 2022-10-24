import { PlayCircleOutline, RestartAlt } from '@mui/icons-material';
import { FormControlLabel, IconButton, Switch } from '@mui/material';
import React, { useState } from 'react';
import Field from '../field/Field';

function BubbleSort() {
  const sideLength = 20;
  const startArray = createRandomNumberArray();
  const [currentArray, setCurrentArray] = useState<number[]>(startArray);
  const [isRunnning, setIsRunnning] = useState<boolean>(false);
  const [showNumbers, setShowNumber] = useState<boolean>(false);

  function createRandomNumberArray() {
    return Array.from(
      {
        length: sideLength * sideLength
      },
      () => Math.floor(Math.random() * 100)
    );
  }

  const handlePlay = () => {
    bubble(currentArray);
  };

  const handleReset = () => {
    setCurrentArray(createRandomNumberArray());
  };

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function bubble(arr: number[]) {
    setIsRunnning(true);
    for (let j = 0; j < arr.length - 1; j++) {
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i + 1];
          arr[i + 1] = arr[i];
          arr[i] = temp;
        }
      }
      await timeout(0.1);
      setCurrentArray([...arr]);
    }
    setIsRunnning(false);
  }

  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <h5 style={{ marginTop: '0' }}>Bubble Sort</h5>
      {currentArray && (
        <div>
          <Field numbers={currentArray} showNumbers={showNumbers}></Field>
        </div>
      )}
      <div>
        <IconButton aria-label="delete" onClick={handlePlay} disabled={isRunnning}>
          <PlayCircleOutline fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="reset" onClick={handleReset} disabled={isRunnning}>
          <RestartAlt fontSize="inherit"></RestartAlt>
        </IconButton>
        <FormControlLabel
          control={<Switch value={showNumbers} onChange={() => setShowNumber(!showNumbers)} />}
          label="Nummern anzeigen"
        />
      </div>
    </div>
  );
}
export default BubbleSort;
