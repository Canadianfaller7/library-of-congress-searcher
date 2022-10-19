const fetchData = () =>{
    console.log()
    const userInput = $('#user-input').val();
    const selectParam = $('#select').find(':selected').val();

    const query = `https://www.loc.gov/${selectParam}/?q=${userInput}&fo=json`
    
    fetch(query)
    .then((response) =>{

        return response.json();
    })
    .then((data) => {
        console.log(data)
        drawResults(data);
    })
}

const drawResults = data =>{
    $('#result-container').html('')
    if(!data) return window.alert('NO DATA IN RESPONSE');

    for(let i = 0; i < 16; i++){
        const dat = data.results[i];
        const resultCard = `<div class='result'>
                                <h3>${dat.title}</h3>
                                <h4>Date: ${dat.date}</h4>
                                <p>${dat.description[0]}<p>
                                <img src='${dat.image_url[0]}'/>
                            </div>`;

        $('#result-container').append(resultCard);
    }
}

$('#search').click(() => {
    fetchData();
});