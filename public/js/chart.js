function congigureChartData(data) {
    const _datasets = [];
    for(let record of data) {
        const index = _datasets.findIndex(set => set.label === record.title);
        let month = parseInt(moment(record.listing_date).format('M'))
        const color = random_rgba();
        if(index === -1) {
            let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            data[month-1] += (parseInt(record.revenue));
            _datasets.push({
                label: record.title,
                data: data,
                borderColor: color,
            })
        } else {
            let data = _datasets[index].data;
            data[month-1] += (parseInt(record.revenue));
            _datasets[index].data = data
        }
    }
    return _datasets;
}

function getLabels(startdate, enddate) {
    const dateStart = moment(startdate);
    const dateEnd = moment(enddate);
    const labels = [];
    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
        labels.push(dateStart.format('MMM-YY'));
        dateStart.add(1,'month');
    }
    return labels;
}

function getConfig() {
    return {
        type: 'line',
        data:  {
            labels: labels,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return '$' + convertToInternationalCurrencySystem(value);
                        }
                    },
                },
            }
        }
    };
}