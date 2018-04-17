function bootstrap_setup() {
    var d = document;
    var link = d.createElement('link');
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    var h = d.getElementsByTagName('head')[0];
    h.appendChild(link);
/*
    var script_jquery = d.createElement('script');
    script_jquery.src = "https://code.jquery.com/jquery-3.3.1.slim.min.js";
    script_jquery.integrity = "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo";
    script_jquery.setAttribute("crossorigin", "anonymous");
    h.appendChild(script_jquery);

    var script_propper = d.createElement('script');
    script_propper.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js";
    script_propper.integrity = "sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ";
    script_propper.setAttribute("crossorigin", "anonymous");
    h.appendChild(script_propper);

    var script_bootstrap = d.createElement('script');
    script_bootstrap.src = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js";
    script_bootstrap.integrity = "sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm";
    script_bootstrap.setAttribute("crossorigin", "anonymous");
    h.appendChild(script_bootstrap);
*/
}