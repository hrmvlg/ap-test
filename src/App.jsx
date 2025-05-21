import { useRef } from 'react';
import Chart from './components/Chart/Chart';
import CountryDropdown from './components/CountryDropdown/CountryDropdown';
import DownloadButton from './components/DownloadButton/DownloadButton';
import RangeDatePicker from './components/RangeDatePicker/RangeDatePicker';

import html2canvas from 'html2canvas';
import styles from '../src/assets/styles/base.module.scss'
import { Row, Col } from 'react-bootstrap';

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
      <Row className='justify-content-end align-items-center  gap-2'>
        <Col xs="auto">
          <DownloadButton type="png" onDownload={handleDownloadImage} />
        </Col>
        <Col xs="auto">
          <DownloadButton type="csv" />
        </Col>
        <Col xs="auto">
          <CountryDropdown />
        </Col >
        <Col xs="auto" className='h-100'>
          <RangeDatePicker />
        </Col>
      </Row>
      <Chart ref={printRef} />
    </div>
  )
}

export default App