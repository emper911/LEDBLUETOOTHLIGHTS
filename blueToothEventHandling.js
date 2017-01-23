
$(document).ready(function(){
  var redData = 0, greenData = 0, blueData = 0;
  var stat = "off", blueConnect;
  $("#connectButton").click(function(event){
    //TODO connect bluetooth with arduino. If connected update <p>tag
    if($("#connectButton").val() == "Not Connected"){
      blueConnect = "Connected";
    }
    else{
      blueConnect = "Not Connected";
    }
    $.ajax({
      type:"POST",
      url:"/index.html",
      contentType: "application/json",
      data: JSON.stringify({status: blueConnect, power:"null", R:redData, G:greenData, B:blueData}),
      dataType: "json",
      success: function(json){
        console.log(json);
        if(json.status == "Connected"){
          $("#connectButton").val("Connected");
        }
        else{
          $("#connectButton").val("Not Connected");
        }
      },
      error: function(){
        $("#connectButton").val("Not Connected");
        alert("Bluetooth Connection was unsuccessful!");
      }
    });
  });

  $("#powerButton").click(function(event){
    //TODO send to arduino to turn on or off. default is off
    stat = $("#powerButton").val();
    if(stat == "OFF"){
      stat = "ON";
    }
    else{
      stat = "OFF";
    }
    $.ajax({
      type:"POST",
      url:"/index.html",
      contentType: "application/json",
      data: JSON.stringify({status: "null", power: stat, R:redData, G:greenData, B:blueData}),
      dataType: "json",
      success: function(json){
        console.log(json);
        if(json.power == "ON"){
          $("#powerButton").val("ON");
        }
        else{
          $("#powerButton").val("OFF");
        }
      },
      error: function(){
        $("#powerButton").val("OFF");
        alert("Something went wrong with the power!");
      }
    });
  });

  $("#redSlider").on("input",function(event){
    redData = $("#redSlider").val();
    $.ajax({
      type:"POST",
      url:"/index.html",
      contentType: "application/json",
      data: JSON.stringify({status: "null", power: stat, R:redData, G:greenData, B:blueData}),
      dataType: "json",
      success: function(){
        $("#redData").text("RED: " + redData);
        $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");
      },
      error: function(){
        console.log("Something wrong with Red!");
      }
    });
  });

  $("#greenSlider").on("input",function(event){
    greenData = $("#greenSlider").val();
    $("#greenData").text("GREEN: " + greenData);
    $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");
    $.ajax({
      type:"POST",
      url:"/index.html",
      contentType: "application/json",
      data: JSON.stringify({status: "null", power:stat, R:redData, G:greenData, B:blueData}),
      dataType: "json",
      success: function(){
        $("#greenData").text("GREEN: " + greenData);
        $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");
      },
      error: function(){
        console.log("Something wrong with Green!");
      }
    });
  });

  $("#blueSlider").on("input",function(event){
    blueData = $("#blueSlider").val();
    $("#blueData").text("BLUE: " + blueData);
    $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");
    $.ajax({
      type:"POST",
      url:"/index.html",
      contentType: "application/json",
      data: JSON.stringify({status: "null",power:stat, R: r, G: g, B: b}),
      dataType: "json",
      success: function(){
        $("#blueData").text("BLUE: " + blueData);
        $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");
      },
      error: function(){
        console.log("Something wrong with Blue!");
      }
    });
  });
});
