window.addEventListener("DOMContentLoaded", (event) => {
  if (!window.location.pathname.endsWith("/history.html")) {
    return;
  }
  var index = getUrlParameter("Index");
  var vin = getUrlParameter("vin");

  if (vin == false || !validateVin(vin)) {
    window.close();
  }
  if (localStorage[vin] == null) {
    window.close();
  }
  $("#ButtonPdf").on("click", function () {
    $(document.body).css("background-color", "white");
    $("#NavBar").hide();
    $("#ButtonPdf").hide();
    $("#BackBtn").hide();

    var opt = {
      margin: 0,
      filename: vin+" "+VehicleData.HistoricalData[index].CreationTime.substring(6) + ".pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a3", orientation: "p" },
    };
    html2pdf()
      .set(opt)
      .from(document.body)
      .save(vin + ".pdf");
    setTimeout(function () {
      $(document.body).css("background-color", "#212529");
      $("#NavBar").show();
      $("#ButtonPdf").show();
      $("#BackBtn").show();
    }, 1000);
  });

  var VehicleData = JSON.parse(localStorage[vin]);

  $("#BackBtn").on("click", function () {
    location.href = "vehicle.html?vin=" + vin;
  });

  var Name =
    VehicleData.HistoricalData[index].offer_params_Markapojazdu +
    " " +
    VehicleData.HistoricalData[index].offer_params_Modelpojazdu;
  var FullTitle =
    Name + " - " + VehicleData.HistoricalData[index].CreationTime.substring(6);
  $("#MainHead").text(FullTitle);

  $("#PriceData").text(VehicleData.HistoricalData[index].price_raw + " PLN");
  $("#FirstRegPlace").text(VehicleData.HistoricalData[index].offer_params_Krajpochodzenia);
  if (VehicleData.HistoricalData[index].private_business == "private") {
    $("#SellerData").text(
      "Osoba prywatna" + "\n" + VehicleData.HistoricalData[index].SellerName
    );
  } else {
    $("#SellerData").text("Firma" + "\n" + VehicleData.HistoricalData[index].SellerName);
  }

  $("#Milage").text(VehicleData.HistoricalData[index].offer_params_Rokprodukcji);
  $("#SizeData").text(VehicleData.HistoricalData[index].offer_params_Pojemnośćskokowa);
  $("#FuelData").text(VehicleData.HistoricalData[index].offer_params_Rodzajpaliwa);
  $("#PowerData").text(VehicleData.HistoricalData[index].offer_params_Moc);
  $("#TransmitionData").text(VehicleData.HistoricalData[index].offer_params_Skrzyniabiegów);
  $("#DateNewData").text(VehicleData.HistoricalData[index].offer_params_Przebieg);

  var IimgIndex = 0;

  for (let i = 0; i < VehicleData.HistoricalData[index]["imgcount"]; i++) {
    $("#ImgCol")
      .clone()
      .attr("id", "ce" + i)
      .appendTo("#ImageHolder");
  }

  $(".img-fluid").each(function (i, obj) {
    $(this)
      .parent()
      .attr("href", VehicleData.HistoricalData[index]["img_" + IimgIndex] + "?x=.png");
    $(this).attr("src", VehicleData.HistoricalData[index]["img_" + IimgIndex]);
    IimgIndex++;
  });

  baguetteBox.run("[data-bss-baguettebox]", { animation: "fadeIn" });
});
