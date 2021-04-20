import Grid from '../components/Grid'
export default function Row ({key, row_idx, value}) {
    return (
        <tr key={key}>
          { value.map((x, col_idx) => (<Grid row_idx={row_idx} col_idx={col_idx} value={x}/>))}
        </tr>
    );
};