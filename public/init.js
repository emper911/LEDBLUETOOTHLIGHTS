//initial load of data tracked by server
var ConnectButton = null;
var PowerButton =  null;
var DefaultLightingButton = null;
var RedSlider = null;
var GreenSlider = null;
var BlueSlider = null;

window.addEventListener('load', function(){
    ConnectButton = document.getElementById('Connect-Button');
    PowerButton = document.getElementById('Power-Button');
    DefaultLightingButton = document.getElementById('Default-Button');

    RedSlider = document.getElementById('Red-Slider');
    GreenSlider = document.getElementById('Green-Slider');
    BlueSlider = document.getElementById('Blue-Slider');

    const url = host+'/initData';
    let initData = DataFetch(url);
    initData.then(resData => {
        console.log(resData);
        ConnectButton.value = resData.connect;
        PowerButton.value = resData.power;
        DefaultLightingButton = resData.default;
        RedSlider.value = resData.red;
        GreenSlider.value = resData.green;
        BlueSlider.value = resData.blue;
    });
    

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
        PowerButton.value = initData.power;
    
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
        DefaultLightingButton.value = initData.default;
        setSVGColor(data.red, data.green, data.blue);
    
    });    

    //connection
    const urlColor = host + '/ColorSlider';

    //Red Slider event
    RedSlider.addEventListener('click', function(){
        let data = getSliderData();
        let initData = DataFetch(urlColor, data);
        setSVGColor(data.red, data.green, data.blue);
    });

    //Green Slider event
    GreenSlider.addEventListener('click', function(){
        let data = getSliderData();
        let initData = DataFetch(urlColor, data);
        setSVGColor(data.red, data.green, data.blue);
    });

    //Blue Slider event
    BlueSlider.addEventListener('click', function(){
        let data = getSliderData();
        let initData = DataFetch(urlColor, data);
        setSVGColor(data.red, data.green, data.blue);
    });
});









