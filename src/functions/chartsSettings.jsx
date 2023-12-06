export const HomeExpensesChartOptions = {
    chart: {
        type: 'area', // The type of chart, e.g., 'line', 'bar', 'scatter', 'spline', etc.
        height: 500, // The height of the chart
        fontFamily: 'Roboto, sans-serif' // Font family for text in the chart
    },
    xaxis: {
        title: {
            text: 'Data' // Y-axis title
        } // X-axis categories or labels
    },
    yaxis: {
        title: {
            text: 'Valor' // Y-axis title
        }
    },
    title: {
        text: 'Despesas X Tempo' // The title of the chart
    },
    subtitle: {
        text: 'Acompanhe o desenvolvimento completo pelo dashboard de Despesas' // Subtitle of the chart
    },
    legend: {
        show: true, // Show or hide the legend
        position: 'top' // Legend position (e.g., 'top', 'right', 'bottom', 'left')
    },
    dataLabels: {
        enabled: false // Show or hide data labels on data points
    },
    grid: {
        row: {
            colors: ['transparent', 'transparent'], // Colors for alternate rows
            opacity: 0.5 // Opacity of alternate rows
        }
    },
    colors: ['#E15554', '#E15554'], // Custom colors for data series
    markers: {
        size: 6, // Size of data point markers
        colors: ['#E15554', '#E15554'], // Marker colors
        strokeWidth: 0, // Marker border width
        hover: {
            size: 9 // Marker size on hover
        }
    },
    responsive: [
        {
            breakpoint: 768, // Responsive breakpoint
            options: {
                legend: {
                    show: false // Hide legend on smaller screens
                }
            }
        }
    ]
}

export const HomeOSChartOptions = {
    chart: {
        type: 'area', // The type of chart, e.g., 'line', 'bar', 'scatter', 'spline', etc.
        height: 500, // The height of the chart
        fontFamily: 'Roboto, sans-serif' // Font family for text in the chart
    },
    xaxis: {
        title: {
            text: 'Data' // Y-axis title
        } // X-axis categories or labels
    },
    yaxis: {
        title: {
            text: 'Valor' // Y-axis title
        }
    },
    title: {
        text: 'Ordens de Serviço X Tempo' // The title of the chart
    },
    subtitle: {
        text: 'Acompanhe o desenvolvimento completo pelo dashboard de Entradas' // Subtitle of the chart
    },
    legend: {
        show: true, // Show or hide the legend
        position: 'top' // Legend position (e.g., 'top', 'right', 'bottom', 'left')
    },
    dataLabels: {
        enabled: false // Show or hide data labels on data points
    },
    grid: {
        row: {
            colors: ['transparent', 'transparent'], // Colors for alternate rows
            opacity: 0.5 // Opacity of alternate rows
        }
    },
    colors: ['#3BB273', '#3BB273'], // Custom colors for data series
    markers: {
        size: 6, // Size of data point markers
        colors: ['#3BB273', '#3BB273'], // Marker colors
        strokeWidth: 0, // Marker border width
        hover: {
            size: 9 // Marker size on hover
        }
    },
    responsive: [
        {
            breakpoint: 768, // Responsive breakpoint
            options: {
                legend: {
                    show: false // Hide legend on smaller screens
                }
            }
        }
    ]
}
