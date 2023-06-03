window.addEventListener("DOMContentLoaded", (event) => {
    $(".nav-link").each(function() {

        if (window.location.pathname != '/'+$(this).attr('href'))
        {
            $(this).removeClass("active");
        }else
        {
            $(this).addClass("active");
        }

        if (window.location.pathname == "/wait.html" && $(this).attr('href') == "search.html")
        {
            $(this).addClass("active");
        }

        if (window.location.pathname == "/vehicle.html" && $(this).attr('href') == "search.html")
        {
            $(this).addClass("active");
        }
    });
});