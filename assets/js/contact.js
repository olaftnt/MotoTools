window.addEventListener("DOMContentLoaded", (event) => {
    if (!window.location.pathname.endsWith("/contact.html")) {
        return;
      }
    $("#SubmitBtn").on("click", function () {
        var Name = $("#Name").val();
        var Email = $("#Email").val();
        var Message = $("#Message").val();

        if(Name.length == 0 || Email.length == 0 || Message.length == 0)
        {
            alert("Wypełnij wszystkie pola");
            return;
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {if (this.readyState == 4 && this.status == 200) {
            alert("Dziękujemy za wiadomośc");
            location.href = "index.html";
        }};
        var Url = "https://lxrrv4fjggnmxq3g57jlgcbyge0yuyxc.lambda-url.eu-north-1.on.aws/?Name="+Name+"&Email="+Email+"&Message="+Message
        xhttp.open("GET",Url,true);
        xhttp.send();
    });
  });