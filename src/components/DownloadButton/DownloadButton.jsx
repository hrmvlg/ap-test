import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';

export default function DownloadButton({ type }) {

    const { csv } = useSelector((state) => state.graph);

    const headers = [
        { label: 'Date', key: 'date' },
        { label: 'Category', key: 'category' },
        { label: 'Value', key: 'value' },
    ];

    return (
        type &&
        <CSVLink
            data={csv}
            headers={headers}
            filename="graph.csv"
            className="btn btn-outline-secondary"
            style={{ color: "blue" }}
            target="_blank"
        >
            {type.toUpperCase()}
        </CSVLink>
    )
}