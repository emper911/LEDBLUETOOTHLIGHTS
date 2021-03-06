window.addEventListener('load', function(){
    initTags();
    initLoadTagData();
    initButtons();
    initSliders();
});

function initTags(){
    ConnectButton = document.getElementById('Connect-Button');
    PowerButton = document.getElementById('Power-Button');
    DefaultLightingButton = document.getElementById('Default-Button');

    RedSlider = document.getElementById('Red-Slider');
    GreenSlider = document.getElementById('Green-Slider');
    BlueSlider = document.getElementById('Blue-Slider');

    RedData = document.getElementById('Red-Data');
    GreenData = document.getElementById('Green-Data');
    BlueData = document.getElementById('Blue-Data');

    svgSquare = document.getElementById('svg-square');
}

function initLoadTagData(){
    const url = host+'/initData';
    let initData = DataFetch(url, null);
    initData.then(resData => {
        //console.log(resData);
        ConnectButton.value = resData.connect;
        PowerButton.value = resData.power;
        DefaultLightingButton.value = resData.default;
        RedSlider.value = resData.red;
        RedData.innerText = resData.red;
        GreenSlider.value = resData.green;
        GreenData.innerText = resData.green;
        BlueSlider.value = resData.blue;
        BlueData.innerText = resData.blue;
        setSVGColor(resData.red, resData.green, resData.blue);
    });
}

function initButtons(){
    //Connects to bluetooth lights
    ConnectButton.addEventListener('click', function(){
        const url = host + '/ConnectButton';
        const data = {status: ConnectButton.value};
        let initData = DataFetch(url, data);
        console.log(initData);
        initData.then( resData => {
            console.log(resData);
            ConnectButton.value = resData.status;
        });
    });

    ConnectButton.addEventListener('message', (resData) => { 
        console.log(resData);
        ConnectButton.value = resData.status;
    })

    //Power Button click event
    PowerButton.addEventListener('click', function(){
        const url = host + '/PowerButton';
        let data = {power: PowerButton.value};
        let initData = DataFetch(url, data);
        initData.then(resData => {
            PowerButton.value = resData.power;
        });
    });

    PowerButton.addEventListener("message", (resData) => {
      PowerButton.value = resData.power;
    });
    
    //Normal Lighting Button click event
    DefaultLightingButton.addEventListener('click', function(){
        const url = host + '/DefaultLight';
        if (DefaultLightingButton.value == "OFF"){
            var data = {
                red: 255,
                green: 255,
                blue: 80
            };
        }
        // else if (DefaultLightingButton.value == "ON"){
        // }
        else{
            var data = {
                red: 0,
                green: 0,
                blue: 0
            };
        }
        let initData = DataFetch(url, data);
        initData.then(resData => {
            DefaultLightingButton.value = resData.default;
            RedSlider.value = data.red;
            RedData.innerText = data.red;

            GreenSlider.value = data.green;
            GreenData.innerText = data.green;

            BlueSlider.value = data.blue;
            BlueData.innerText = data.blue;

            setSVGColor(data.red, data.green, data.blue);
        });
    });
    
    DefaultLightingButton.addEventListener("message", (resData) => { 
        DefaultLightingButton.value = resData.default;
        RedSlider.value = data.red;
        RedData.innerText = data.red;

        GreenSlider.value = data.green;
        GreenData.innerText = data.green;

        BlueSlider.value = data.blue;
        BlueData.innerText = data.blue;

        setSVGColor(data.red, data.green, data.blue);
    });
}

function initSliders(){
    //connection
    const urlColor = host + '/ColorSlider';
    //Red Slider event
    RedSlider.addEventListener('change', function(){
        let data = getSliderData();
        setSVGColor(data.red, data.green, data.blue);
        let initData = DataFetch(urlColor, data);
        initData.then(resData => {
            RedData.innerText = data.red;
        });
    });

    
    RedSlider.addEventListener('input', function() {
        let data = getSliderData();
        setSVGColor(data.red, data.green, data.blue);
        RedData.innerText = data.red;
    });
    
    RedSlider.addEventListener("message", (resData) => {
        setSVGColor(resData.red, resData.green, resData.blue);
        RedData.innerText = resData.red;
        RedSlider.value = resData.red;
    });

    //Green Slider event
    GreenSlider.addEventListener('change', function(){
        let data = getSliderData();
        setSVGColor(data.red, data.green, data.blue);
        let initData = DataFetch(urlColor, data);
        initData.then(resData => {
            GreenData.innerText = data.green;
        });
    });
    GreenSlider.addEventListener('input', function() {
        let data = getSliderData();
        setSVGColor(data.red, data.green, data.blue);
        GreenData.innerText = data.green;
    });

    GreenSlider.addEventListener("message", (resData) => {
        setSVGColor(resData.red, resData.green, resData.blue);
        GreenData.innerText = resData.green;
        GreenSlider.value = resData.green;
    });

    //Blue Slider event
    BlueSlider.addEventListener('change', function(){
        let data = getSliderData();
        setSVGColor(data.red, data.green, data.blue);
        let initData = DataFetch(urlColor, data);
        initData.then(resData => {
            BlueData.innerText = data.blue;
        });

    });
    BlueSlider.addEventListener('input', function() {
        let data = getSliderData();
        setSVGColor(data.red, data.green, data.blue);
        BlueData.innerText = data.blue;
    });

    BlueSlider.addEventListener("message", (resData) => {
        setSVGColor(resData.red, resData.green, resData.blue);
        BlueData.innerText = resData.blue;
        BlueData.value = resData.blue
    });

}









