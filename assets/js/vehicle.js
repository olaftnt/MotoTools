window.addEventListener("DOMContentLoaded", (event) => {
  if (!window.location.pathname.endsWith("/vehicle.html")) {
    return;
  }
  var vin = getUrlParameter("vin");
  if (vin == false || !validateVin(vin)) {
    location.href = "search.html";
    return;
  }
  if (localStorage[vin] == null) {
    location.href = "wait.html?vin=" + vin;
    return;
  }

  var VehicleData = JSON.parse(localStorage[vin]);

  if (VehicleData.HistoricalData.length == 0) {
    $("#Sec0").hide();
  } else {
    for (let i = 0; i < VehicleData.HistoricalData.length; i++) {
      $("#HisBtn")
        .clone()
        .addClass("BtnHisClk")
        .attr("id", "BtHis" + i)
        .attr("datacon", i)
        .text(VehicleData.HistoricalData[i].CreationTime.substring(6))
        .appendTo("#BtHisHolder");
    }

    $("#HisBtn").remove();
  }

  $(".BtnHisClk").on("click", function () {
    location.href = "history.html?vin=" + vin+"&Index="+$(this).attr("datacon");
  });

  $("#VehHisLink").on("click", function () {
    window.open("https://historiapojazdu.gov.pl/", "_blank").focus();
  });

  $("#ButtonPdf").on("click", function () {
    $(document.body).css("background-color", "white");
    $("#NavBar").hide();
    $("#ButtonPdf").hide();
    $("#Sec0").hide();

    var opt = {
      margin: 0,
      filename: vin + ".pdf",
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
      if (VehicleData.HistoricalData.length > 0) {
        $("#Sec0").show();
      }
    }, 1000);
  });

  $("#Milage").text(VehicleData.BaseData.offer_params_Rokprodukcji);
  $("#SizeData").text(VehicleData.BaseData.offer_params_Pojemnośćskokowa);
  $("#FuelData").text(VehicleData.BaseData.offer_params_Rodzajpaliwa);
  $("#PowerData").text(VehicleData.BaseData.offer_params_Moc);
  $("#TransmitionData").text(VehicleData.BaseData.offer_params_Skrzyniabiegów);
  $("#DateNewData").text(VehicleData.BaseData.offer_params_Przebieg);

  $("#PriceData").text(VehicleData.BaseData.price_raw + " PLN");
  $("#FirstRegPlace").text(VehicleData.BaseData.offer_params_Krajpochodzenia);
  if (VehicleData.BaseData.private_business == "private") {
    $("#SellerData").text(
      "Osoba prywatna" + "\n" + VehicleData.BaseData.SellerName
    );
  } else {
    $("#SellerData").text("Firma" + "\n" + VehicleData.BaseData.SellerName);
  }
 

  $("#MainImage").attr("src", VehicleData.BaseData.img_0);
  var CreationTime = VehicleData.BaseData.CreationTime.substring(6);
  if (CreationTime == null) {
    CreationTime = formatDate(VehicleData.GenerationTime);
  }
  if (VehicleData.IsBaseDataHistorical == false) {
    CreationTime = "Aktualna oferta";
    $("#Auction").attr("href", VehicleData.BaseUrl);
    $("#Auction").attr("target", "_blank");
  }else
  {
    $("#Auction").hide();
  }
  $("#MainText").text(
    CreationTime +
      " - " +
      VehicleData.BaseData.offer_params_Markapojazdu +
      " " +
      VehicleData.BaseData.offer_params_Modelpojazdu
  );
  $("#VinNumber").text(VehicleData.VinVumber);

  var string = VehicleData.BaseData.desc;
  var length = 450;
  var trimmedString =
    string.length > length ? string.substring(0, length - 3) + "..." : string;
  $("#MainParagraph").text(trimmedString);

  if (
    VehicleData.BaseData
      .offer_params_Datapierwszejrejestracjiwhistoriipojazdu != null
  ) {
    $("#FirstRegDate").text(
      VehicleData.BaseData.offer_params_Datapierwszejrejestracjiwhistoriipojazdu
    );
  } else {
    $("#FirstRegDate").text(VehicleData.BaseData.offer_params_Rokprodukcji);
  }

  if (VehicleData.BaseData.offer_params_Numerrejestracyjnypojazdu != null) {
    $("#RegNumber").text(
      VehicleData.BaseData.offer_params_Numerrejestracyjnypojazdu
    );
  } else {
    $("#RegNumber").text(
      "Numer rejestracyjny nie został znaleziony automatycznie, możliwe, że jest on widoczny na jednym ze zdjęć pojazdu."
    );
  }

  var IimgIndex = 0;

  for (let i = 0; i < VehicleData.BaseData["imgcount"]; i++) {
    $("#ImgCol")
      .clone()
      .attr("id", "ce" + i)
      .appendTo("#ImageHolder");
  }

  $(".img-fluid").each(function (i, obj) {
    $(this)
      .parent()
      .attr("href", VehicleData.BaseData["img_" + IimgIndex] + "?x=.png");
    $(this).attr("src", VehicleData.BaseData["img_" + IimgIndex]);
    IimgIndex++;
  });

  baguetteBox.run("[data-bss-baguettebox]", { animation: "fadeIn" });
});
