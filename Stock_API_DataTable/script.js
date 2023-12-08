const url = "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo";
let chart1;

$('#likeItmsNm, #basDt').on("keydown", function(e){
    if(e.which==13){
        stockSearch();
    }
});

$('#select_btn').click(function () {
    stockSearch();
});

$('#select_btn2').click(function () {
    stockSearch2();
});

function stockSearch(){
    if (chart1) {
        chart1.destroy(); // 기존 차트 파기
    }

    $('#stock_table_div').html('<div class="loader"><span><i></i></span></div>');

    let url_ = url;
    const serviceKey = $("#serviceKey").val() == "" ? "abPiIAX9s%2BDHXRnUd1X%2BRSPn3gr429SocWtL%2BLhIW3gLaY%2BV8DuQ6ypRPmmeoyfysHbBV0hh1EUSNCqKQR%2F74A%3D%3D" : $("#serviceKey").val();
    const numOfRows = $("#numOfRows").val() == "" ? "3000" : $("#numOfRows").val(); // 3000이면 모두 조회됨
    const pageNo = $("#pageNo").val() == "" ? "1" : $("#pageNo").val();
    const resultType = $("#resultType").val() == "" ? "json" : $("#resultType").val();
    
    let date_map = getDefualtDate($("#basDt").val());
    const basDt = date_map.format_defualt_date;
    const weekend_yn = date_map.weekend_yn;
    const likeItmsNm = $("#likeItmsNm").val();

    url_ += "?serviceKey=" + serviceKey;
    url_ += "&numOfRows=" + numOfRows;
    url_ += "&pageNo=" + pageNo;
    url_ += "&resultType=" + resultType;
    url_ += "&basDt=" + basDt;
    if (likeItmsNm != "") url_ += "&likeItmsNm=" + likeItmsNm;

    console.log(url_);

    let format_basDt = basDt.substring(0, 4) + '년' + basDt.substring(4, 6) + '월' + basDt.substring(6, 8) + '일';

    fetch(url_)
        .then(res => res.json())
        .then(data => makeDataTable(data, format_basDt, weekend_yn));
}

function stockSearch2(){
    if (chart1) {
        chart1.destroy(); // 기존 차트 파기
    }

    $('#stock_table_div').html('<div class="loader"><span><i></i></span></div>');
    $('#chart_div').prepend('<div class="loader"><span><i></i></span></div>');

    let url_ = url;
    const serviceKey = $("#serviceKey").val() == "" ? "abPiIAX9s%2BDHXRnUd1X%2BRSPn3gr429SocWtL%2BLhIW3gLaY%2BV8DuQ6ypRPmmeoyfysHbBV0hh1EUSNCqKQR%2F74A%3D%3D" : $("#serviceKey").val();
    const numOfRows = $("#numOfRows").val() == "" ? "3000" : $("#numOfRows").val(); // 3000이면 모두 조회됨
    const pageNo = $("#pageNo").val() == "" ? "1" : $("#pageNo").val();
    const resultType = $("#resultType").val() == "" ? "json" : $("#resultType").val();
    
    let beginBasDt_map = getDefualtDate($("#beginBasDt").val());
    let endBasDt_map = getDefualtDate($("#endBasDt").val());
    const beginBasDt = beginBasDt_map.format_defualt_date;
    const endBasDt = endBasDt_map.format_defualt_date;
    const itmsNm = $("#itmsNm").val();

    url_ += "?serviceKey=" + serviceKey;
    url_ += "&numOfRows=" + numOfRows;
    url_ += "&pageNo=" + pageNo;
    url_ += "&resultType=" + resultType;
    url_ += "&beginBasDt=" + beginBasDt;
    url_ += "&endBasDt=" + endBasDt;
    if (itmsNm != "") url_ += "&itmsNm=" + itmsNm;

    console.log(url_);

    let format_beginBasDt = beginBasDt.substring(0, 4) + '년' + beginBasDt.substring(4, 6) + '월' + beginBasDt.substring(6, 8) + '일';
    let format_endBasDt = endBasDt.substring(0, 4) + '년' + endBasDt.substring(4, 6) + '월' + endBasDt.substring(6, 8) + '일';

    fetch(url_)
        .then(res => res.json())
        .then(data => makeDataTable2(data, format_beginBasDt, format_endBasDt));
}

function makeDataTable(data, format_basDt, weekend_yn) {
    let items = data.response.body.items.item;
    let output = "";

    if(weekend_yn == "N" && items.length == 0){
        output = "<div class='load_text'>기준일자 " + format_basDt + "은 휴장일 입니다.</div>";
    }else{
        output = "<div class='load_text'>기준일자 : " + format_basDt + "</div>"
        + "<table id='stock_table' class='display'><thead><tr>"
        + "<th>종목명</th>"
        + "<th>시장구분</th>"
        + "<th>시가</th>"
        + "<th>고가</th>"
        + "<th>저가</th>"
        + "<th>종가</th>"
        + "<th>대비</th>"
        + "<th>등락률</th>"
        + "<th>거래량</th>"
        + "</tr></thead>";

        for (i in items) {
            let item = items[i];

            let itmsNm = item.itmsNm; // 종목명
            let mrktCtg = item.mrktCtg; // 시장구분 (KOSPI/KOSDAQ/KONEX)
            
            if(mrktCtg == 'KONEX') continue; // KONEX 제외

            let mkp = item.mkp; // 시가
            let hipr = item.hipr; // 고가
            let lopr = item.lopr; // 저가
            let clpr = item.clpr; // 종가
            let vs = item.vs; // 전일 대비 등락
            let fltRt = Number(item.fltRt); // 등락률
            let trqu = item.trqu; // 거래량
            let srtnCd = item.srtnCd; // 종목코드

            output += "<tr>"
                + "<td>" + "<a href='https://finance.naver.com/item/main.naver?code=" + srtnCd +"' target='_blank'>" + itmsNm + "</a>" + "</td>"
                + "<td>" + mrktCtg + "</td>"
                + "<td>" + mkp + "</td>"
                + "<td>" + hipr + "</td>"
                + "<td>" + lopr + "</td>";
  
            output += make_color_td(vs, clpr);
            output += make_color_td(vs, vs);
            output += make_color_td(fltRt, fltRt);
            output += "<td>" + trqu + "</td>"
                + "</tr>";
        }
        output += "</table>";
    }

    $('#stock_table_div').html(output);
    $('#stock_table').DataTable({
        order: [[0, 'asc']],
        pageLength: 50,
        columnDefs: [
                        {targets: 2, render: $.fn.dataTable.render.number(',')},
                        {targets: 3, render: $.fn.dataTable.render.number(',')},
                        {targets: 4, render: $.fn.dataTable.render.number(',')},
                        {targets: 5, render: $.fn.dataTable.render.number(',')},
                        {targets: 6, render: $.fn.dataTable.render.number(',')},
                        {targets: 7, render: function(data, type, row){ 
                            return data >= 0 ? data == 0 ? '⚊ ' + data : '▲ ' + data : '▼ ' + data
                        }, type: 'formatted-num'},
                        {targets: 8, render: $.fn.dataTable.render.number(',')}
                    ]
    });
}

function makeDataTable2(data, format_beginBasDt, format_endBasDt) {
    let items = data.response.body.items.item;
    let output = "";

    let date_list = []; // 일자 리스트
    let mkp_list = []; // 시가 리스트
    let hipr_list = []; // 고가 리스트
    let lopr_list = []; // 저가 리스트
    let clpr_list = []; // 종가 리스트
    let bg_color_list = []; // 색상 리스트
    let lo_hi_list = []; // 저가, 고가 리스트
    let mkp_clpr_list = []; // 시가, 종가 리스트
    let min_lopr = Number.MAX_SAFE_INTEGER; // 최저값
    let max_hipr = 0; // 최대값

    output = "<div class='load_text'>기준일자 : " + format_beginBasDt + " ~ " + format_endBasDt + "</div>"
    + "<table id='stock_table' class='display'><thead><tr>"
    + "<th>종목명</th>"
    + "<th>시장구분</th>"
    + "<th>시가</th>"
    + "<th>고가</th>"
    + "<th>저가</th>"
    + "<th>종가</th>"
    + "<th>대비</th>"
    + "<th>등락률</th>"
    + "<th>거래량</th>"
    + "<th>기준일자</th>"
    + "</tr></thead>";

    for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];

        let itmsNm = item.itmsNm; // 종목명
        let mrktCtg = item.mrktCtg; // 시장구분 (KOSPI/KOSDAQ/KONEX)
        let mkp = Number(item.mkp); // 시가
        let hipr = Number(item.hipr); // 고가
        let lopr = Number(item.lopr); // 저가
        let clpr = Number(item.clpr); // 종가
        let vs = item.vs; // 전일 대비 등락
        let fltRt = Number(item.fltRt); // 등락률
        let trqu = item.trqu; // 거래량
        let basDt = item.basDt; // 기준일자
        let srtnCd = item.srtnCd; // 종목코드
        
        date_list.push(basDt);
        mkp_list.push(mkp);
        hipr_list.push(hipr);
        lopr_list.push(lopr);
        clpr_list.push(clpr);

        if(vs > 0){
            bg_color_list.push('#e00400');
        }else if(vs < 0){
            bg_color_list.push('#003ace');
        }else{
            bg_color_list.push('#666');
        }
        lo_hi_list.push(new Array(lopr, hipr));
        mkp_clpr_list.push(new Array(mkp, clpr));

        min_lopr = Math.min(...lopr_list);
        max_hipr = Math.max(...hipr_list);

        output += "<tr>"
            + "<td>" + "<a href='https://finance.naver.com/item/main.naver?code=" + srtnCd +"' target='_blank'>" + itmsNm + "</a>" + "</td>"
            + "<td>" + mrktCtg + "</td>"
            + "<td>" + mkp + "</td>"
            + "<td>" + hipr + "</td>"
            + "<td>" + lopr + "</td>";

        output += make_color_td(vs, clpr);
        output += make_color_td(vs, vs);
        output += make_color_td(fltRt, fltRt);
        output += "<td>" + trqu + "</td>"
            +"<td>" + basDt+ "</td>"
            + "</tr>";
    }
    output += "</table>";
    

    $('#stock_table_div').html(output);
    $('#stock_table').DataTable({
        order: [[9, 'desc']],
        pageLength: 50,
        columnDefs: [
                        {targets: 2, render: $.fn.dataTable.render.number(',')},
                        {targets: 3, render: $.fn.dataTable.render.number(',')},
                        {targets: 4, render: $.fn.dataTable.render.number(',')},
                        {targets: 5, render: $.fn.dataTable.render.number(',')},
                        {targets: 6, render: $.fn.dataTable.render.number(',')},
                        {targets: 7, render: function(data, type, row){ 
                            return data >= 0 ? data == 0 ? '⚊ ' + data : '▲ ' + data : '▼ ' + data
                        }, type: 'formatted-num'},
                        {targets: 8, render: $.fn.dataTable.render.number(',')},
                        {targets: 9, render: function(data, type, row){ 
                            return data.substring(0, 4) + '년' + data.substring(4, 6) + '월' + data.substring(6, 8) + '일'
                        }, type: 'formatted-num'}
                    ]
    });

    $(".loader").detach();
    /* createChart */
    createChart(date_list, mkp_list, hipr_list, lopr_list, clpr_list, bg_color_list, lo_hi_list, mkp_clpr_list, min_lopr, max_hipr);
}

function getDefualtDate(date) {
    let sel_day = '';
    let today = new Date();
    let todayForYesterday = new Date();
    let yesterday = new Date(todayForYesterday.setDate(todayForYesterday.getDate() - 1));
    let today_bool = false, yesterday_bool = false;
    let weekend_yn = "N";

    if(date != "") {
        let datatimeRegexp = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

        if ( !datatimeRegexp.test(date)) { // 날짜 형식이 아닌 경우 현재 날짜로 세팅
            alert("날짜는 yyyy-mm-dd 형식으로 입력해주세요!!\n현재 날짜 기준으로 검색합니다.");
            today_bool = true;
        }

        if(today_bool){
            sel_day = new Date();
        }else{
            sel_day = new Date(date);
        }

        if(!today_bool && sel_day > today)  { // 날짜가 현재 날짜보다 클 경우 현재 날짜로 세팅
            alert("날짜는 현재 날짜보다 클 수 없습니다!!\n현재 날짜 기준으로 검색합니다.");
            sel_day = new Date();
            today_bool = true;
        }

        if( // 현재 날짜인 경우
            "".concat(sel_day.getFullYear(), pad(sel_day.getMonth() + 1, 2), pad(sel_day.getDate(), 2)) 
            == "".concat(today.getFullYear(), pad(today.getMonth() + 1, 2), pad(today.getDate(), 2))
        ){
            today_bool = true;
        }

        if( // 어제 날짜인 경우
            "".concat(sel_day.getFullYear(), pad(sel_day.getMonth() + 1, 2), pad(sel_day.getDate(), 2)) 
            == "".concat(yesterday.getFullYear(), pad(yesterday.getMonth() + 1, 2), pad(yesterday.getDate(), 2))
        ){
            yesterday_bool = true;
        }

    } else{ // 현재 날짜로 세팅
        sel_day = new Date();
        today_bool = true;
    }

    let cal_minus = 0;
    if(sel_day.getDay() == 0) {
        cal_minus += 2; // 일요일
        weekend_yn = "Y";
    } else if(sel_day.getDay() == 6) {
        cal_minus++; // 토요일
        weekend_yn = "Y";
    }
    if(today_bool){
        if(today.getHours() < 13 ){
            cal_minus+=2; // 현재 날짜이며 13시 이전 (-2일)
        }else{
            cal_minus++; // 현재 날짜이며 13시 이후 (-1일)
        }
    }

    if(yesterday_bool && today.getHours() < 13 ){
        cal_minus++; // 어제 날짜이며 13시 이전 (-1일)
    }

    if(cal_minus > 2) cal_minus = 2; // 날짜 계산이 2일을 초과하면 2로 세팅

    let defualt_date = new Date(sel_day.setDate(sel_day.getDate() - cal_minus));
    let format_defualt_date = "".concat(defualt_date.getFullYear(), pad(defualt_date.getMonth() + 1, 2), pad(defualt_date.getDate(), 2));

    return {'format_defualt_date' : format_defualt_date, 'weekend_yn' : weekend_yn};
}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

/* make color td function */
function make_color_td(val, num){
    if(val < 0){
        return "<td class='tag_minus_blue'>" + num + "</td>";
    }else if(val > 0){
        return "<td class='tag_plus_red'>" + num + "</td>";
    }else{
        return "<td class='tag_none'>" + num + "</td>";
    }
}
/* make color td function */

/* createChart */
function createChart(date_list, mkp_list, hipr_list, lopr_list, clpr_list, bg_color_list, lo_hi_list, mkp_clpr_list, min_lopr, max_hipr){
    /* 최소값, 최대값 평균 */
    let average = (min_lopr + max_hipr) /2;
    let temp_val = 1;
    
    for(let a = 0; a < average.toString().length - 1; a++){
        temp_val *= 10;
    }

    min_lopr -= temp_val;
    max_hipr += temp_val;

    let step_size = tick_cal(average);

    const ctx = document.getElementById('chart1');
    chart1 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: date_list,
            datasets: [{
                label: 'data',
                data: mkp_clpr_list,
                backgroundColor: bg_color_list,
                borderColor: bg_color_list,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    min: min_lopr, // Y 축의 최소값
                    max: max_hipr, // Y 축의 최대값
                    ticks: {
                        stepSize: step_size
                    }
                }
            }
        }
    });
}
/* createChart */

/* 틱 계산 */
function tick_cal(price){
    let val = 1;
    if(price < 2000){
        val = 1;
    }else if(price >= 2000 && price < 5000){
        val = 5;
    }else if(price >= 5000 && price < 10000){
        val = 10;
    }else if(price >= 10000 && price < 20000){
        val = 10;
    }else if(price >= 20000 && price < 50000){
        val = 50;
    }else if(price >= 50000 && price < 100000){
        val = 100;
    }else if(price >= 100000 && price < 200000){
        val = 100;
    }else if(price >= 200000 && price < 500000){
        val = 500;
    }else if(price >= 500000){
        val = 1000;
    }
    return val;
}
/* 틱 계산 */