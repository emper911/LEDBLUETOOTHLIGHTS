// let host = '192.168.1.200:3000';
let host = 'http://localhost:3000';

function DataFetch(url, data){
    if (data != null) { //data will be in json format
        //blob is to send the json to server endpoint
        data = new Blob([JSON.stringify(data)], {type : 'application/json'});
    }
    const myInit = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: data,
    };

    let request = new Request(url, myInit);
    return fetch(request)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } 
        else {
            throw new Error('Something went wrong on api server!');
        }
    })
    .then(data => {   
        return data;
    })
    .catch(error => {
        console.error(error);
    });
}

function getSliderData(){
    data = {
        red: parseInt(RedSlider.value),
        green: parseInt(GreenSlider.value),
        blue: parseInt(BlueSlider.value)
    };
    return data;
}

//TODO
function setSVGColor(red, green, blue){
    svgSquare.setAttribute("fill", `rgb(${red}, ${green}, ${blue})`)
}