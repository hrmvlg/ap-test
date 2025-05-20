import Chart from './components/Chart/Chart';
import CountryDropdown from './components/CountryDropdown/CountryDropdown';
import styles from '../src/assets/styles/base.module.scss'
function App() {

  return (
    <div className={`container ${styles["wrapper-container"]}`}>
      <CountryDropdown />
      <Chart />
    </div>
  )
}

export default App