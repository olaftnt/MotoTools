
function ValidateText()
{
    if (window.innerHeight > window.innerWidth) {
        $("#MainText").text(
          "Wyszukuj i sprzedawaj pojazdy z pewnością. Rzetelne informacje są kluczem do udanej transakcji. Dostęp do historii pojazdu to nieocenione wsparcie na konkurencyjnym rynku używanych samochodów."
        );
      } else {
        $("#MainText").text(
          "Szybko i łatwo wyszukaj pojazd, aby uniknąć niekorzystnych transakcji, sprzedaj go szybciej i z pewnością lub odkryj szczegółową historię Twojego pojazdu. W dzisiejszych czasach, gdy rynek pojazdów używanych jest coraz bardziej konkurencyjny, kluczem do udanej transakcji jest dobrze poinformowana decyzja. Niezależnie od tego, czy jesteś kupującym, który chce uniknąć pułapek i problemów związanych z ukrytymi wadami pojazdu, czy sprzedającym, który pragnie sprzedać swój pojazd w szybki i opłacalny sposób, dostęp do rzetelnych informacji jest nieoceniony."
        );
      }
}

window.addEventListener("DOMContentLoaded", (event) => {
  if (window.location.pathname.endsWith("/index.html") || window.location.pathname.endsWith("MotoTools/")) {
  }else{
        return;
  }

  ValidateText();
  $(window).on("resize", function () {
    ValidateText();
  });

  $("#SearchBtn").on("click", function () {
    location.href = "search.html";
  });

  $("#MoreBtn").on("click", function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#Sec2").offset().top,
      },
      1000
    );
  });
});
