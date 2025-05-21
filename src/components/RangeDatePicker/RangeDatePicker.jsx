import DatePicker from "react-multi-date-picker";
import { Row, Col } from 'react-bootstrap';
import { fetchGraphData } from "../../slices/graphSlice";
import { setDateRange } from '../../slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './range-datepicker.module.scss';

export default function RangeDatePicker() {

    const dispatch = useDispatch();
    const { dateRange } = useSelector((state) => state.ui);

    const handleDateChange = (dates) => {
        const formattedDates = dates.map(date => date.format('YYYY-MM-DD'));

        dispatch(setDateRange(formattedDates));
        dispatch(fetchGraphData());
    };

    return (
        <Row className={styles['range-datepicker']}>
            <Col className={styles['range-datepicker__title']}>
                Period
            </Col>
            <Col className={styles['range-datepicker__calendar']}>
                <DatePicker
                    range
                    dateSeparator=" - "
                    value={dateRange}
                    onChange={handleDateChange}
                />
            </Col>
        </Row>
    );
}