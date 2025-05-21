import { useRef } from 'react';
import Chart from './components/Chart/Chart';
import CountryDropdown from './components/CountryDropdown/CountryDropdown';
import styles from '../src/assets/styles/base.module.scss'
import DownloadButton from './components/DownloadButton/DownloadButton';
import html2canvas from 'html2canvas';

function App() {

  const printRef = useRef(null);

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'graph.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <div className={`container ${styles["wrapper-container"]}`}>
      <div className="container d-flex justify-content-end" style={{ columnGap: '10px' }}>
        <DownloadButton type="png" onDownload={handleDownloadImage} />
        <DownloadButton type="csv" />
        <CountryDropdown />
      </div>
      <Chart ref={printRef} />
    </div>
  )
}

export default App