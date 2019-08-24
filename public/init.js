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
        // console.log(resData);
        ConnectButton.value = resData.connect;
        PowerButton.value = resData.power;
        DefaultLightingButton = resData.default;
        RedSlider.value = resData.red;
        GreenSlider.value = resData.green;
        BlueSlider.value = resData.blue;
        setSVGColor(resData.red, resData.green, resData.blue);
    });
}

function initButtons(){
    //Connects to bluetooth lights
    ConnectButton.addEventListener('click', function(){
        const url = host + '/ConnectButton';
        let data = {status: ConnectButton.value};
        let initData = DataFetch(url, data);
        ConnectButton.value = initData.status;
    });
    //Power Button click event
    PowerButton.addEventListener('click', function(){
        const url = host + '/PowerButton';
        let data = {power: PowerButton.value};
        let initData = DataFetch(url, data);
        initData.then(resData => {
            PowerButton.value = resData.power;
        });
    });
    //Normal Lighting Button click event
    DefaultLightingButton.addEventListener('click', function(){
        const url = host + '/DefaultLight';
        let data = {
            red: 255,
            green: 255,
            blue: 120
        };
        let initData = DataFetch(url, data);
        initData.then(resData => {
            DefaultLightingButton.value = resData.default;
            setSVGColor(data.red, data.green, data.blue);
        });
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
}










