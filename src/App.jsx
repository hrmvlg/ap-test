import Chart from './components/Chart/Chart';
import CountryDropdown from './components/CountryDropdown/CountryDropdown';
import styles from '../src/assets/styles/base.module.scss'
import DownloadButton from './components/DownloadButton/DownloadButton';
function App() {

  return (
    <div className={`container ${styles["wrapper-container"]}`}>
      <div className="container d-flex justify-content-end" style={{ columnGap: '10px' }}>
        <DownloadButton type="csv" />
        <CountryDropdown />
      </div>
      <Chart />
    </div>
  )
}

export default App