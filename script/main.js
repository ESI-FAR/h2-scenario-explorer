 // Histogram (Bar Chart) Data ---------------------------------------------------
 const histogramCtx = document.getElementById('histogramChart').getContext('2d');
 new Chart(histogramCtx, {
     type: 'bar',
     data: {
         labels: ['A', 'B', 'C', 'D', 'E'],
         datasets: [{
             label: 'Sample Data',
             data: [12, 19, 3, 5, 2],
             backgroundColor: '#009DDD',
             borderColor: '#006F9A',
             borderWidth: 1
         }]
     },
     options: {
         scales: {
             y: {
                 beginAtZero: true
             }
         }
     }
 });
 
 // Pie Chart Data
 const pieCtx = document.getElementById('pieChart').getContext('2d');
 new Chart(pieCtx, {
     type: 'pie',
     data: {
         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
         datasets: [{
             label: 'Sample Data',
             data: [10, 20, 30, 25, 15],
             backgroundColor: [
                 '#FF6384',
                 '#36A2EB',
                 '#FFCE56',
                 '#4BC0C0',
                 '#9966FF'
             ]
         }]
     }
 });

 // ----------------------------------------------------------------------------------


 // ----------------------SQLite Database handling--------------------------------------


