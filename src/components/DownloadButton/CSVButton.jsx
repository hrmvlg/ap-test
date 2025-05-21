import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

export default function CSVButton() {

    const { csv } = useSelector((state) => state.graph);
    
    const headers = [
        { label: 'Date', key: 'date' },
        { label: 'Category', key: 'category' },
        { label: 'Value', key: 'value' },
    ];

    return (<CSVLink
        data={csv}
        headers={headers}
        filename="graph.csv"
        className="btn btn-outline-secondary"
        style={{ color: "blue" }}
        target="_blank"
    >
        CSV
    </CSVLink>);
}