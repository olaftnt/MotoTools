window.addEventListener("DOMContentLoaded", (event) => {
  if (!window.location.pathname.endsWith("/wait.html")) {
    return;
  }

  vin = getUrlParameter("vin");
  $("#WaitText").text(vin);
  setInterval(VinAnimation, 50);

  CallVinRequest();
});

async function CallVinRequest() {
  var SleepTimer = Math.floor(Math.random() * 10) + 1;
  //await sleep(SleepTimer * 1000);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var ResponseJson = this.responseText;
      let ResponseObject = JSON.parse(ResponseJson);
      if (!ResponseObject.Completed) {
        location.href = "search.html?vin=" + vin + "&err=" + ResponseObject.Reason;
      } else {
        localStorage[vin] = ResponseJson;
        location.href = "vehicle.html?vin=" + vin;
      }
    }
  };
  xhttp.open(
    "GET",
    "https://lxrrv4fjggnmxq3g57jlgcbyge0yuyxc.lambda-url.eu-north-1.on.aws/?vin=" +
      vin,
    true
  );
  xhttp.send();
}

var vin = "";
var Ianim = 1;
var Rise = true;

function VinAnimation() {
  if (Rise) {
    if (Ianim > 16) {
      Rise = false;
    }

    let NewText = "";

    for (let i = 0; i < vin.length; i++) {
      if (i < Ianim && i != 0) {
        NewText += " ";
      }
      NewText += vin[i];
    }

    $("#WaitText").text(NewText);

    Ianim++;
  }

  if (!Rise) {
    if (Ianim < 2) {
      Rise = true;
    }

    let NewText = "";

    for (let i = 0; i < vin.length; i++) {
      if (i < Ianim && i != 0) {
        NewText += " ";
      }
      NewText += vin[i];
    }

    $("#WaitText").text(NewText);

    Ianim--;
  }
}
