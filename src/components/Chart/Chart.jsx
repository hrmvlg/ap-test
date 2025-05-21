import styles from './chart.module.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGraphData } from '../../slices/graphSlice';
import { fetchCategories } from '../../slices/uiSlice';

export default function Chart() {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const dispatch = useDispatch();
    const { datasets, labels } = useSelector((state) => state.graph);
    const { statusCategories, statusCountries } = useSelector((state) => state.ui);

    useEffect(() => {
        if (statusCategories === 'idle') {
            dispatch(fetchCategories());
        }
        if (statusCategories === 'succeeded' && statusCountries === 'succeeded') {
            dispatch(fetchGraphData());
        }
    }, [statusCategories, statusCountries, dispatch]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: '     Top History',
                position: 'top',
                padding: {
                    top: 10,
                    bottom: 20,
                },
                align: 'start',
                font: {
                    size: 18
                }
            },
        },
        scales: {
            y: {
                reverse: true,
                suggestedMin: 1,
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    padding: 20
                }
            },
        }
    };

    const data = {
        labels: labels,
        datasets: datasets,
    };

    return (
        <div className={styles["chart-container"]}>
            <Line options={options} data={data} />
        </div>
    );
}