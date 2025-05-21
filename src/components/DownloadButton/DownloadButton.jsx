import CSVButton from './CSVButton';
import PNGButton from './PNGButton';

export default function DownloadButton({ type, onDownload }) {

    return (
        <>
            {type === 'csv' ? (
                <CSVButton />
            ) : type === 'png' ? (
                <PNGButton
                    onDownload={onDownload}
                />
            ) : null}
        </>
    )
}