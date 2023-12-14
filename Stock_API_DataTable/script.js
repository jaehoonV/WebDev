const url = "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo";
let chart1, chart2;

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

$(document).on("click",".view_chart",function(){
    monthChartSearch(this.dataset.itemnm, this.dataset.months);
})

/* stockSearch(); */

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

function monthChartSearch(item_nm, months){
    if (chart1) {
        chart1.destroy(); // 기존 차트 파기
    }
    if (chart2) {
        chart2.destroy(); // 기존 차트 파기
    }

    $('#chart_div').prepend('<div class="loader"><span><i></i></span></div>');

    let url_ = url;
    const serviceKey = $("#serviceKey").val() == "" ? "abPiIAX9s%2BDHXRnUd1X%2BRSPn3gr429SocWtL%2BLhIW3gLaY%2BV8DuQ6ypRPmmeoyfysHbBV0hh1EUSNCqKQR%2F74A%3D%3D" : $("#serviceKey").val();
    const numOfRows = $("#numOfRows").val() == "" ? "3000" : $("#numOfRows").val(); // 3000이면 모두 조회됨
    const pageNo = $("#pageNo").val() == "" ? "1" : $("#pageNo").val();
    const resultType = $("#resultType").val() == "" ? "json" : $("#resultType").val();
    
    let today = new Date();   
    const year = today.getFullYear(); // 년
    const month = today.getMonth();   // 월
    const day = today.getDate();      // 일
    
    let beginBasDt = "";
    /* 이평선을 구하기 위해 - 3개월 */
    let twoMonthAgo = new Date(year, month - 5, day);	// 2개월 전 
    let oneYearAgo = new Date(year - 1, month - 3, day); // 1년 전
    let twoYearAgo = new Date(year - 2, month - 3, day); // 2년 전
    if(months == 2){
        beginBasDt = beginBasDt.concat(twoMonthAgo.getFullYear(), pad(twoMonthAgo.getMonth() - 1, 2), pad(twoMonthAgo.getDate(), 2));
    }else if(months == 12){
        beginBasDt = beginBasDt.concat(oneYearAgo.getFullYear(), pad(oneYearAgo.getMonth() - 1, 2), pad(oneYearAgo.getDate(), 2));
    }else if(months == 24){
        beginBasDt = beginBasDt.concat(twoYearAgo.getFullYear(), pad(twoYearAgo.getMonth() - 1, 2), pad(twoYearAgo.getDate(), 2));
    }
    let endBasDt = "".concat(today.getFullYear(), pad(today.getMonth() + 1, 2), pad(today.getDate(), 2));
    
    const itmsNm = item_nm;

    url_ += "?serviceKey=" + serviceKey;
    url_ += "&numOfRows=" + numOfRows;
    url_ += "&pageNo=" + pageNo;
    url_ += "&resultType=" + resultType;
    url_ += "&beginBasDt=" + beginBasDt;
    url_ += "&endBasDt=" + endBasDt;
    if (itmsNm != "") url_ += "&itmsNm=" + itmsNm;

    console.log(url_);

    fetch(url_)
        .then(res => res.json())
        .then(data => makeMonthChart(data));
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
        + "<th>차트</th>"
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
            output += "<td>" + trqu + "</td>";
            output += "<td><button class='view_chart' data-months='2' data-itemnm='" + itmsNm +"'>2개월</button>"
                + "<button class='view_chart' data-months='12' data-itemnm='" + itmsNm +"'>1년</button>"
                + "<button class='view_chart' data-months='24' data-itemnm='" + itmsNm +"'>2년</button></td>";
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
    let title = ""; // 종목명
    if(items.length > 0){
        title = items[0].itmsNm;
    }

    let date_list = []; // 일자 리스트
    let mkp_list = []; // 시가 리스트
    let hipr_list = []; // 고가 리스트
    let lopr_list = []; // 저가 리스트
    let clpr_list = []; // 종가 리스트
    let lo_hi_list = []; // 저가, 고가 리스트
    let mkp_clpr_list = []; // 시가, 종가 리스트
    let min_lopr = Number.MAX_SAFE_INTEGER; // 최저값
    let max_hipr = 0; // 최대값
    let candle_list = []; // 캔들차트 리스트

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

        lo_hi_list.push(new Array(lopr, hipr));
        mkp_clpr_list.push(new Array(mkp, clpr));
        candle_list.push({x: Date.parse(basDt.substring(0, 4) + '-' + basDt.substring(4, 6) + '-' + basDt.substring(6, 8)), o: mkp, h: hipr, l: lopr, c: clpr});

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
            + "<td>" + basDt+ "</td>"
            + "</tr>";
    }
    output += "</table>";

    min_lopr = Math.min(...lopr_list);
    max_hipr = Math.max(...hipr_list);

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
    createChart(title, date_list, mkp_list, hipr_list, lopr_list, clpr_list, lo_hi_list, mkp_clpr_list, min_lopr, max_hipr, candle_list);
}

function makeMonthChart(data) {
    let items = data.response.body.items.item;
    let leng = items.length;
    let title = ""; // 종목명
    if(items.length > 0){
        title = items[0].itmsNm;
    }
    let date_list = []; // 일자 리스트
    let mkp_list = []; // 시가 리스트
    let hipr_list = []; // 고가 리스트
    let lopr_list = []; // 저가 리스트
    let clpr_list = []; // 종가 리스트
    let lo_hi_list = []; // 저가, 고가 리스트
    let mkp_clpr_list = []; // 시가, 종가 리스트
    let min_lopr = Number.MAX_SAFE_INTEGER; // 최저값
    let max_hipr = 0; // 최대값
    let candle_list = []; // 캔들차트 리스트

    let date_for_ave_list = []; // 이평선을 구하기 위한 날짜 리스트
    let clpr_for_ave_list = []; // 이평선을 구하기 위한 종가 리스트
    let average_5 = []; // 5일 이평선 리스트
    let average_20 = []; // 20일 이평선 리스트
    let average_60 = []; // 60일 이평선 리스트

    for (let i = leng - 1; i >= 0; i--) {
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

        if(i < leng - 59){
            console.log("basDt = " + basDt + " / clpr = " + clpr);
            date_list.push(basDt);
            mkp_list.push(mkp);
            hipr_list.push(hipr);
            lopr_list.push(lopr);
            clpr_list.push(clpr);

            lo_hi_list.push(new Array(lopr, hipr));
            mkp_clpr_list.push(new Array(mkp, clpr));
            candle_list.push({x: Date.parse(basDt.substring(0, 4) + '-' + basDt.substring(4, 6) + '-' + basDt.substring(6, 8)), o: mkp, h: hipr, l: lopr, c: clpr});
        }
        
        date_for_ave_list.push(basDt);
        clpr_for_ave_list.push(clpr);
    }
    min_lopr = Math.min(...lopr_list);
    max_hipr = Math.max(...hipr_list);

    let clpr_ave_leng = clpr_for_ave_list.length;
    /* 5일 이평선 리스트 생성*/
    let sum5 = 0;
    for (let i = 0; i < 5; i++){
        sum5 += clpr_for_ave_list[i];
        if(i != 4){
            average_5.push(NaN);
        }
    }
    average_5.push(Math.floor(sum5 / 5));
    for (let i = 5; i < clpr_ave_leng; i++) {
        sum5 += (clpr_for_ave_list[i] - clpr_for_ave_list[i - 5]);
        average_5.push(Math.floor(sum5 / 5));
    }
    /* 5일 이평선 리스트 생성*/

    /* 20일 이평선 리스트 생성*/
    let sum20 = 0;
    for (let i = 0; i < 20; i++){
        sum20 += clpr_for_ave_list[i];
        if(i != 19){
            average_20.push(NaN);
        }
    }
    average_20.push(Math.floor(sum20 / 20));
    for (let i = 20; i < clpr_ave_leng; i++) {
        sum20 += (clpr_for_ave_list[i] - clpr_for_ave_list[i - 20]);
        average_20.push(Math.floor(sum20 / 20));
    }
    /* 20일 이평선 리스트 생성*/

    /* 60일 이평선 리스트 생성*/
    let sum60 = 0;
    for (let i = 0; i < 60; i++){
        sum60 += clpr_for_ave_list[i];
        if(i != 59){
            average_60.push(NaN);
        }
    }
    average_60.push(Math.floor(sum60 / 60));
    for (let i = 60; i < clpr_ave_leng; i++) {
        sum60 += (clpr_for_ave_list[i] - clpr_for_ave_list[i - 60]);
        average_60.push(Math.floor(sum60 / 60));
    }
    /* 60일 이평선 리스트 생성*/

    $(".loader").detach();
    /* createChart */
    createChart(title, date_list, mkp_list, hipr_list, lopr_list, clpr_list, lo_hi_list, mkp_clpr_list, min_lopr, max_hipr, candle_list);

    /* searchGoldenCross */
    let goldenCross_list = searchGoldenCross(date_for_ave_list.slice(59), average_5.slice(59), average_20.slice(59), average_60.slice(59));

    /* searchDeadCross */
    let deadCross_list = searchDeadCross(date_for_ave_list.slice(59), average_5.slice(59), average_20.slice(59), average_60.slice(59));
    
    /* createChart 이평선 */
    createChart_average(title, date_for_ave_list.slice(59), average_5.slice(59), average_20.slice(59), average_60.slice(59), goldenCross_list, deadCross_list);
    
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
function createChart(title, date_list, mkp_list, hipr_list, lopr_list, clpr_list, lo_hi_list, mkp_clpr_list, min_lopr, max_hipr, candle_list){
    const ctx = document.getElementById('chart1');

    const totalDuration = 2000;
    const delayBetweenPoints = totalDuration / candle_list.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
    x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
        }
    },
    y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
        }
    }
    };
    
    /* 최소값, 최대값 평균 */
    let average = (min_lopr + max_hipr) /2;
    let temp_val = 1;
    for(let a = 0; a < average.toString().length - 2; a++){
        temp_val *= 10;
    }

    min_lopr -= temp_val;
    max_hipr += temp_val;

    let step_size = tick_cal(average);

    chart1 = new Chart(ctx, {
        type: 'candlestick',
        data: {
            labels: date_list,
            datasets: [
                {
                    label: 'candle chart',
                    data: candle_list,
                    color: {up: "#e00400", down: "#003ace", unchanged: "#666"}
                },
                {
                    label: '종가',
                    type: 'line',
                    data: lineData(candle_list)
                }	
            ]
        },
        options: {
            animation,
            interaction: {
            intersect: false
            },
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
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

/* createChart_average */
function createChart_average(title, date_list, average_5, average_20, average_60, goldenCross_list, deadCross_list){
    const ctx = document.getElementById('chart2');
    const totalDuration = 2000;
    const delayBetweenPoints = totalDuration / date_list.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
    x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
        }
    },
    y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
        }
    }
    };

    chart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_list,
            datasets: [
                {
                    label: '5Days MA',
                    data: average_5,
                    borderColor: "#25c930",
                    backgroundColor: "#25c930",
                    borderWidth: 1,
                    pointRadius:0,
                    radius:0,
                    hoverRadius:1,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: '20Days MA',
                    data: average_20,
                    borderColor: "#c46a6d",
                    backgroundColor: "#c46a6d",
                    borderWidth: 1,
                    pointRadius:0,
                    radius:0,
                    hoverRadius:1,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: '60Days MA',
                    data: average_60,
                    borderColor: "#c29569",
                    backgroundColor: "#c29569",
                    borderWidth: 1,
                    pointRadius:0,
                    radius:0,
                    hoverRadius:1,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: 'GoldenCross',
                    data: goldenCross_list,
                    borderColor: "#e6e607",
                    backgroundColor: "#e6e607",
                    pointStyle: 'triangle',
                    borderWidth: 1,
                    pointRadius:10,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: 'DeadCross',
                    data: deadCross_list,
                    borderColor: "#5c5c5b",
                    backgroundColor: "#5c5c5b",
                    pointStyle: 'crossRot',
                    borderWidth: 3,
                    pointRadius:10,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                }		
            ]
        },
        options: {
            animation,
            interaction: {
            intersect: false
            },
            responsive: true,
            plugins: {
                title: {
                    display: false,
                    text: title
                },
                legend: {
                    display: true,
                }
            },
            scales: {
                y: {
                    /* min: min_lopr, // Y 축의 최소값
                    max: max_hipr, // Y 축의 최대값
                    ticks: {
                        stepSize: step_size
                    } */
                }
            }
        }
    });
}
/* createChart_average */

/* searchGoldenCross */
function searchGoldenCross(date_list, average_5, average_20, average_60){
    let goldenCrossList = [];
    let goldenCrossDate = [];
    goldenCrossList.push(NaN);
    for(let i = 1; i < date_list.length - 2; i++){
        let push_check = false;
        if(average_5[i] > average_20[i] && average_5[i - 1] < average_20[i - 1]){ // 5일선이 20일선 돌파
            if(average_5[i + 1] > average_20[i + 1] && average_5[i + 2] > average_20[i + 2]){ // 다음날, 다다음날까지 돌파
                if(average_5[i] > average_60[i] && average_20[i] > average_60[i]){ // 60일선 위
                    goldenCrossDate.push(date_list[i]);
                    goldenCrossList.push(average_5[i]);
                    push_check = true;
                }
            }
        }

        if(!push_check){
            goldenCrossList.push(NaN);
        }
    }
    console.log("골든크로스 발생일 = " + goldenCrossDate);
    return goldenCrossList
}
/* searchGoldenCross */

/* searchDeadCross */
function searchDeadCross(date_list, average_5, average_20, average_60){
    let deadCrossList = [];
    let deadCrossDate = [];
    deadCrossList.push(NaN);
    for(let i = 1; i < date_list.length - 1; i++){
        let push_check = false;
        if(average_5[i] < average_20[i] && average_5[i - 1] > average_20[i - 1]){ // 5일선이 20일선 아래로
            if(average_5[i + 1] < average_20[i + 1]){ // 다음날까지
                deadCrossDate.push(date_list[i]);
                deadCrossList.push(average_5[i]);
                push_check = true;
            }
        }

        if(!push_check){
            deadCrossList.push(NaN);
        }
    }
    console.log("데드크로스 발생일 = " + deadCrossDate);
    return deadCrossList
}
/* searchDeadCross */

/* lineData */
function lineData(candle_list) { return candle_list.map(d => { return { x: d.x, y: d.c} }) };
/* lineData */

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