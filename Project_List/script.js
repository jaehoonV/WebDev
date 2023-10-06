var xmlhttp = new XMLHttpRequest();
var url = "pjt_db.json";

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        func(xmlhttp.responseText);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();


function func(resp) {
    var arr = JSON.parse(resp);
    let out = "";

    arr.forEach(el => {
        let pjt_name = el.pjt_name;
        let pjt_img = el.pjt_img;
        let pjt_desc = el.pjt_desc;
        let pjt_rate = el.pjt_rate;

        out += "<div class='project-card'><div class='container'>"
            + "<div class='rectangle' style='height: " + pjt_rate + "%;'></div>"          
            + "<input type='text' class='percentageInput' value='" + pjt_rate + "'></div>"
            + "<p class='poject_name'>" + pjt_name + "</p>"
            + "<img class='project-image' src='" + pjt_img + "' alt='" + pjt_img + "'>"
            + "<p class='poject_desc'>" + pjt_desc + "</p></div>"
    }); 

    document.getElementById('project_list').innerHTML = out;
}