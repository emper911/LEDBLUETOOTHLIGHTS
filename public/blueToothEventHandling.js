$(document).ready(function(){
  var redData = "000", greenData = "000", blueData = "000";
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
        else if(json.status == "Not Connected"){
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
      data: JSON.stringify({status: blueConnect, power:stat, R:redData, G:greenData, B:blueData}),
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

  $("#regLighting").on("click", function(){
    $.ajax({
      type: "POST",
      url: "/index.html",
      contentType: "application/json",
      data: JSON.stringify({status: blueConnect, power:"null",R:"255",G:"255",B:"120"}),
      dataType: "json",
      success: function(){
        $("#regLighting").css("fill", "rgb(255,241,200)");
      }
    });
  });

  $("#redSlider").on({
    input: function(event){
      redData = $("#redSlider").val();
      redData = redData.toString();
      if(redData.length == 1){
        redData = "00"+redData;
      }
      else if(redData.length == 2){
        redData = "0"+redData;
      }
      $("#redData").text("RED: " + redData);
      $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");

    },
    click: function(event){
      $.ajax({
        type:"POST",
        url:"/index.html",
        contentType: "application/json",
        data: JSON.stringify({identifier:"red",status: blueConnect, power:"null", R:redData, G:greenData, B:blueData}),
        dataType: "json",
        success: function(){
          $("#redData").text("RED: " + redData);
          $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");
        },
        error: function(){
          console.log("Something wrong with Red!");
        }
      });
    }
   });

  $("#greenSlider").on({
    input: function(event){
      greenData = $("#greenSlider").val();
      greenData = greenData.toString();
      if(greenData.length == 1){
        greenData = "00"+greenData;
      }
      else if(greenData.length == 2){
        greenData = "0"+greenData;
      }
      $("#greenData").text("GREEN: " + greenData);
      $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");
    },
    click: function(event){
      $.ajax({
        type:"POST",
        url:"/index.html",
        contentType: "application/json",
        data: JSON.stringify({status: blueConnect, power:"null", R:redData, G:greenData, B:blueData}),
        dataType: "json",
        success: function(){
          $("#greenData").text("GREEN: " + greenData);
          $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");
        },
        error: function(){
          console.log("Something wrong with Green!");
        }
      });
    }
  });

  $("#blueSlider").on({
    input: function(event){
      blueData = $("#blueSlider").val();
      blueData = blueData.toString();
      if(blueData.length == 1){
        blueData = "00"+blueData;
      }
      else if(blueData.length == 2){
        blueData = "0"+blueData;
      }
      $("#blueData").text("BLUE: " + blueData);
      $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");
    },
    click: function(event){
      $.ajax({
        type:"POST",
        url:"/index.html",
        contentType: "application/json",
        data: JSON.stringify({status: blueConnect, power:"null", R: redData, G: greenData, B: blueData}),
        dataType: "json",
        success: function(){
          $("#blueData").text("BLUE: " + blueData);
          $("#colorSquare").css("fill","rgb("+redData+","+greenData+","+blueData+")");
        },
        error: function(){
          console.log("Something wrong with Blue!");
        }
      });
    }
  });
});
