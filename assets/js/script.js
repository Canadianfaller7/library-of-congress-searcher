
const fetchData = () =>{
    console.log()
    // here we are saving using input value into a var
    const userInput = $('#user-input').val(); 
    // here we are finding what option the user selected and getting its value
    const selectParam = $('#select').find(':selected').val();
    // this is our api call
    const query = `https://www.loc.gov/${selectParam}/?q=${userInput}&fo=json`
    // we are fetching the url
    fetch(query)
    // then doing a promise to get the response
    .then((response) =>{
        // returning the response after reading and parsing it
        return response.json();
    })
    // then doing a promise to get the data and then plugging it into our function drawResults as a param
    .then((data) => {
        console.log(data)
        drawResults(data);
    })
}

const drawResults = data =>{
    // setting the results container to be blank at first
    $('#result-container').html('') 
    // if data is not there then return an alert
    if(!data) return window.alert('NO DATA IN RESPONSE');
    // looping through how many items we want displayed on screen
    for(let i = 0; i < 16; i++){
        // making a var equal to the results array at the positions
        const dat = data.results[i];
        // making new html to display the results on the screen
            // getting the title, date, description, and image from the api call we make
        const resultCard = `<div class='result'>
                                <h3>${dat.title}</h3>
                                <h4>Date: ${dat.date}</h4>
                                <p>${dat.description[0]}<p>
                                <img src='${dat.image_url[0]}'/>
                            </div>`;
        // appending the result card inside the result-container to show on the html page.
        $('#result-container').append(resultCard);
    }
}
/* event listener for click and when it is clicked it will run our fetchData function that 
will then call our drawResults function and display everything on the page */
$('#search').click(() => {
    fetchData();
});