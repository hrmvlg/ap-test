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
import subCategoryMap from '../../consts/subCategoryMap';

import getRandomColor from '../../helpers/getRandomColor';
import findCategoryById from '../../helpers/findCategoryById';
import { getLast30Days, getLast30DaysISO } from '../../helpers/dateHelpers';

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

    const labels = getLast30Days();
    const searchDates = getLast30DaysISO();
    const datasets = [];

    const dispatch = useDispatch();
    const { graphData, status } = useSelector((state) => state.graph);
    const { categories } = useSelector((state) => state.ui);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGraphData());
            dispatch(fetchCategories());
        }

    }, [status, dispatch]);

    if (graphData) {
        const rawData = graphData;
        for (const categoryId in rawData) {
            for (const subCategoryId in rawData[categoryId]) {
                const dataPoints = searchDates.map(date => rawData[categoryId][subCategoryId][date] ?? null);

                const subCategory = subCategoryMap[subCategoryId] || subCategoryId;
                const category = findCategoryById(categories, categoryId) || categoryId;
                const color = getRandomColor();

                datasets.push({
                    label: `${category.name ? category.name : categoryId} - ${subCategory}`,
                    data: dataPoints,
                    borderColor: color,
                    backgroundColor: color,
                    pointRadius: 0,
                    tension: 0.3,
                    fill: false,
                    spanGaps: true
                });
            }
        }
    };

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
        labels,
        datasets: datasets,
    };

    return (
        <div className={styles["chart-container"]}>
            <Line options={options} data={data} />
        </div>
    );
}