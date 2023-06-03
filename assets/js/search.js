function ValidateTextIndex() {
  if (window.innerHeight > window.innerWidth) {
    $("#ParagraphText").text(
      "Sprawdź pojazd za darmo. Automatycznie przeszukamy dostępne źródła danych i internet, dostarczając kompleksowe informacje. Uniknij ukrytych danych sprzedawców i dokonaj pewnego zakupu."
    );
  } else {
    $("#ParagraphText").text(
      "Po wprowadzeniu numeru VIN i zaakceptowaniu regulaminu, serwis automatycznie przeszuka dostępne źródła danych oraz internet, aby znaleźć informacje na temat pojazdu. Wielu sprzedawców stara się ograniczać udostępniane informacje, abyśmy nie mieli możliwości dokładnego sprawdzenia dostępnych danych przed zakupem. Dlatego skorzystaj z naszego darmowego narzędzia, które pozwoli Ci na uzyskanie kompleksowych informacji."
    );
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  if (!window.location.pathname.endsWith("/search.html")) {
    return;
  }

  $("#ErrorText").hide();
  ValidateTextIndex();
  $(window).on("resize", function () {
    ValidateTextIndex();
  });

  if (getUrlParameter("vin") != false) {
    $("#VinInput").val(getUrlParameter("vin"));
    $("#ErrorText").text("Nieprawidłowy vin");
    $("#ErrorText").show();
  }

  if (window.innerHeight > window.innerWidth) {
    //$("#ParagraphText").css({ "margin-bottom": "15%" });
  }

  $("#VinInput").on("input", function (e) {
    if (validateVin($("#VinInput").val())) {
      $("#VinInput").css({ "border-color": "#59bc40" });
    } else {
      $("#VinInput").css({ "border-color": "var(--bs-blue)" });
    }
  });

  $("#SearchButton").on("click", function () {
    var vin = $("#VinInput").val();
    if (!validateVin(vin)) {
      $("#ErrorText").text("Nieprawidłowy vin");
      $("#ErrorText").show();
      return;
    }

    if (!$("#StatuteCheck").is(":checked")) {
      $("#ErrorText").text("Brak akceptacji regulaminu");
      $("#ErrorText").show();
      return;
    }

    if ($("#VinInput").val() == getUrlParameter("vin")) {
      $("#ErrorText").text("Nieprawidłowy vin");
      $("#ErrorText").show();
      return;
    }

    location.href = "wait.html?vin=" + vin;
  });
});
