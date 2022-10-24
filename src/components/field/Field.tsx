import Pixel from '../drawables/Pixel';
import './Field.css';

function Field({ numbers, showNumbers }: { numbers: number[]; showNumbers: boolean }) {
  function randNumArray(n: number, range: number) {
    return Array.from(
      {
        length: n
      },
      () => Math.floor(Math.random() * range)
    );
  }

  const array = numbers ? numbers : randNumArray(900, 100);
  const points = (row: any) =>
    row.map((point: number, idx: number) => (
      <Pixel point={point} showNumbers={showNumbers} key={`pixel-${idx}`}></Pixel>
    ));

  const root = Math.floor(Math.sqrt(array.length));
  const rows: number[][] = [];

  for (let i = 0; i < array.length; i += root) {
    const chunk = array.slice(i, i + root);
    rows.push(chunk);
  }
  const displayedRows = rows.map((row, idx) => (
    <div className={`row`} key={'row-' + idx.toString()}>
      {points(row)}
    </div>
  ));

  return <div>{displayedRows}</div>;
}
export default Field;
