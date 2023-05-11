const chart = {
    title: {
        // text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
        // align: 'left',
    },

    subtitle: {
        // text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
        // align: 'left',
    },

    yAxis: {
        title: {
            text: '',
        },
        color: 'transparent',
        startOnTick: false,
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 8h to 17h',
        },
        color: '#fff',
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false,
            },
            pointStart: 8,
        },
    },

    series: [
        {
            name: 'em la ke dang thuong',
            data: [
                43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174,
                155157, 161454, 154610,
            ],
            color: 'red',
            id: 'song1',
        },
        {
            name: 'thuyen quyen',
            data: [
                24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726,
                34243, 31050,
            ],
            color: 'yellow',
        },
        {
            name: 'thang hau',
            data: [
                11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243,
                29213, 25663,
            ],
            color: 'blue',
        },
    ],

    responsive: {
        rules: [
            {
                condition: {
                    maxWidth: 500,
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                    },
                },
            },
        ],
    },
};
export default chart;
