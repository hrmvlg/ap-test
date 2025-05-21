import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function DownloadButton({ type }) {

    const dispatch = useDispatch();
    const { last30DaysISO, csv } = useSelector((state) => state.graph);

    return (
        type && <Button
            variant="outline-secondary"
            style={{ color: "blue" }}
        >
            {type.toUpperCase()}
        </Button >
    )
}