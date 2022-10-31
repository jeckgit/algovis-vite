import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import '../../style/BinarySearch.css';

function BinarySearchAlgo() {

    const [searchableNumbers] = useState<number[]>(createRandomNumberArray(20));
    const [foundIndex, setFoundIndex] = useState<number>(NaN);
    const [restArray, setRestArray] = useState<number[][]>([]);

    function createRandomNumberArray(amount: number) {
        const numbers = [];
        while (numbers.length < amount) {
            const r = Math.floor(Math.random() * 100 + 1);
            if (numbers.indexOf(r) === -1) numbers.push(r);
        }
        return numbers.sort((a, b) => a - b);
    }

    const binarySearch = (arr: number[], x: number): number => {

        let low = 0, high = arr.length - 1;
        let toset = [arr];
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);

            if (x === arr[mid]) {
                setRestArray(toset);
                return mid;
            }
            else if (arr[mid] < x) {
                // x is on the right side
                low = mid + 1;
            }
            else {
                // x is on left side
                high = mid - 1;
            }
            toset = [...toset, arr.slice(low, high + 1)];
        }
        setRestArray(toset);
        return -1;
    }

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            const val = parseInt(e.target.value);
            if (val > 0) {
                setFoundIndex(binarySearch(searchableNumbers, val));
            }

        }
    }
    useEffect(() => { }, [])

    return (
        <Box>
            <Typography>Hello From Binary Search</Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
            >
                <TextField type="number" label="Searched Number" variant="outlined" onChange={handleTextInputChange} />
            </Box>
            <div className='wrapper' style={{ width: 50 * searchableNumbers.length - 1 + 'px', margin: 'auto' }}>
                <div className="container">
                    {searchableNumbers.map((val, i) =>
                        <div key={'square-' + i} className={`square ${i < (searchableNumbers.length - 1) ? 'border-right' : ''} ${foundIndex === i ? 'border-colored' : ''}`}>
                            {val}
                        </div>)
                    }
                </div>
                <div className='step-wrapper'>
                    {restArray.map((_arr, idx) =>
                        <div className='step-wrapper-row' key={idx} style={{  }}>
                            <span>Step {idx + 1}:</span>
                            <div className='spacer' />
                            [{_arr.map((val, _idx) =>
                                <span key={_idx}>
                                    <span >
                                        {val}{_idx < _arr.length - 1 ? ',' : ''}
                                    </span>
                                </span>
                            )}]
                        </div>)}
                </div>
            </div>
        </Box >
    )

}
export default BinarySearchAlgo;