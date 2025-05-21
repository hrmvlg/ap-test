import { Button } from "react-bootstrap";

export default function PNGButton({ onDownload }) {

    return (
        <Button
            variant="outline-secondary"
            style={{ color: "blue" }}
            onClick={onDownload}
        >
            PNG
        </Button>
    )
}