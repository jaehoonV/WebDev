import * as basic from "./basic_scripts.js"

let service_key_input = document.getElementById("service-key");
let prev_btn = document.getElementById("prev_btn");

service_key_input.addEventListener("keydown", (e) => handleKeyDown(e));
prev_btn.addEventListener("click", function (){
    basic.effect_hide("prev_btn");
    setTimeout(() => {
        document.getElementById("service-key").value = "";
        let location_options = document.getElementById("location_select").options;
        location_options[0].selected = true;
        document.getElementById("weather-container").innerHTML = "";
        document.getElementById("service-key").classList.remove("hidden");
        document.getElementById("service-key").closest('.input-container').style.opacity = 1;
        document.getElementById("service-key").closest('.input-container').style.transform = 'translateY(0)';
    }, 500);
});

function handleKeyDown(event) {
    if (event.key === "Enter") {
        document.getElementById("service-key").closest('.input-container').style.opacity = 0;
        document.getElementById("service-key").closest('.input-container').style.transform = 'translateY(-300px)';
        setTimeout(() => {
            document.getElementById("service-key").classList.add("hidden");

            const serviceKey = document.getElementById("service-key").value;
            weather_service(serviceKey);
        }, 500); // 애니메이션 시간과 일치하는 시간 설정
    } 
    /* else if (event.key === "Backspace") {
        document.getElementById("service-key").classList.remove("hidden");
        document.getElementById("service-key").closest('.input-container').style.opacity = 1;
        document.getElementById("service-key").closest('.input-container').style.transform = 'translateY(0)';
        document.getElementById("service-key").value = "";
        document.getElementById("weather-container").innerHTML = "";
    } */
}

function weather_service(key){
    document.getElementById("weather-container").innerHTML = "<div class='loader'><span><i></i></span></div>";
    let location = document.getElementById("location_select");
    let location_val = location.options[location.selectedIndex].value;
    let loc_xy = basic.getLocXY(location_val);
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /* URL */
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + key; /* Service Key */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* page */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* 한 페이지 결과 수*/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* XML, JSON*/
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(basic.getToday()); /* 발표일자 */
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(basic.getTime_weather()); /* 발표시각 */
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(loc_xy.x); /* 예보지점 X 좌표 */
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(loc_xy.y); /* 예보지점 Y 좌표 */

    console.log("url = " + url + queryParams);

    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            create_weather_table(this.response);
        }
    };

    xhr.send('');
}

function create_weather_table(data){
    if(basic.IsJson(data)){
        let table = "<table id='weather_table'><tr><th>지역</th><th>예보일자</th><th>예보시간</th><th>기온</th></tr>";
        let location = document.getElementById("location_select");
        let location_val = location.options[location.selectedIndex].value;
        let loc_xy = basic.getLocXY(location_val);

        let json_data = JSON.parse(data);
        let items = json_data.response.body.items.item;
        for (let i = 0; i < items.length; i++) {
            let fcstDate = items[i].fcstDate;
            let fcstTime = items[i].fcstTime;
            let fcstValue = items[i].fcstValue;
            let category = items[i].category;
            /* console.log(fcstDate);
            console.log(fcstTime);
            console.log(fcstValue);
            console.log(category); */

            if(category == "TMP"){ // 기온
                table += "<tr>";
                table += "<td>" + loc_xy.loc_nm + "</td>";
                table += "<td>" + basic.dateForamt(fcstDate) + "</td>";
                table += "<td>" + basic.func_time(fcstTime) + "</td>";
                table += "<td>" + fcstValue + "</td>";
                table += "</tr>";
            }
            
        }
        table += "</table>";

        document.getElementById("weather-container").innerHTML = table;
        basic.effect_show("weather_table");
    }else{
        let xmlParser = new DOMParser();
        let xmlDoc = xmlParser.parseFromString(data, "text/xml"); // parseFromString() 메소드를 이용해 문자열을 파싱함. 
        let errMsg = xmlDoc.getElementsByTagName("errMsg")[0].textContent; 
        let returnAuthMsg = xmlDoc.getElementsByTagName("returnAuthMsg")[0].textContent; 
        
        let err_text = "<div id='err_text'>" + errMsg + " : " + returnAuthMsg + "</div>";

        document.getElementById("weather-container").innerHTML = err_text;
        basic.effect_show("err_text");
    }
    basic.effect_show("prev_btn");
}

