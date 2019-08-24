// let host = '192.168.1.200:3000';
let host = 'http://localhost:3000';

function DataFetch(url, data=null){
    ResData = null;
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
    // ...
    }).catch(error => {
        console.error(error);
    });

}

function getSliderData(){
    let data = {
        red: RedSlider.value,
        green: GreenSlider.value,
        blue: BlueSlider.value
    };

    return data;
}
//TODO
function setSVGColor(red, green, blue){

}