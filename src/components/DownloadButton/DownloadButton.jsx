import CSVButton from './CSVButton';
import PNGButton from './PNGButton';

export default function DownloadButton({ type }) {

    return (
        <>
            {type === 'csv' ? (
                <CSVButton />
            ) : type === 'png' ? (
                <PNGButton />
            ) : null}
        </>
    )
}