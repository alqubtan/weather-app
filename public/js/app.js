console.log('')
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const mes0 = document.querySelector('#mes0');
const mes1 = document.querySelector('#mes1');
const mes2 = document.querySelector('#mes2');
const mes3 = document.querySelector('#mes3');
const mes4 = document.querySelector('#mes4');
const mes5 = document.querySelector('#mes5');


const clearHistory = (elements) => {
    elements.forEach(element => {
        element.textContent = ''
    });
}

const fetchData = (location) => {

    
    const url = 'http://localhost:3000/weather?address='+location
    
    
    fetch(url).then((res) => {
        res.json().then((data) => {
             if (data.error) {
                 return mes0.textContent = data.error
            }

            mes0.textContent = ''
            mes1.textContent = data.summary
            mes2.textContent =  'temperature now : ' + data.currently
            mes3.textContent = 'Wind Speed : ' + data.windSpeed
            mes4.textContent = 'Probability to Rain : ' + data.precipProbability
            mes5.textContent = 'for this week : ' + data.daily           
        
        })
     })
     
}





const elements = [mes1, mes2, mes3, mes4, mes5];

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearHistory(elements);
    const location = searchElement.value;
    if (!location) {
      return mes0.textContent = 'provide an location!'
    }
    
    mes0.textContent = 'loading...'
    fetchData(location);

   
    
    
    
})