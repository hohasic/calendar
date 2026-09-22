// --- 현재 날짜 ---
let current_year;           // 현재 년도
let current_month;          // 현재 월
let current_date;           // 현재 일
let current_day;            // 현재 요일

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOCUMENT READY!!');

    // --- 오늘 날짜 ---
    let today = new Date();
    let today_year = today.getFullYear();        // 오늘 년도
    let today_month = today.getMonth();          // 오늘 월(0 ~ 11)
    let today_date = today.getDate();            // 오늘 일
    let today_day = today.getDay();              // 오늘 요일(0 ~ 6, 0 -> 일요일)

    // 현재
    setCurrentCalender(today_year, today_month, today_date, today_day);

    // 현재 (<select> UI)
    setCurrentYearAndMonthSelectUI();

    // 현재 (<tr> UI)
    addCalenderTr();

});

// 현재
function setCurrentCalender(year, month, date, day) {
    console.log('setCurrentCalender() CALLED!!');

    current_year = year;
    current_month = month;
    current_date = date;
    current_day = day

}

// 현재 (<select> UI)
function setCurrentYearAndMonthSelectUI() {
    console.log('setCurrentYearAndMonthSelectUI() CALLED!!');

    document.querySelector('#section_wrap select[name="p_year"]').value = current_year;
    document.querySelector('#section_wrap select[name="p_month"]').value = current_month + 1;

}

// 현재 (<tr> UI)
function addCalenderTr() {
    console.log('addCalenderTr() CALLED!!');

    let thisCalenderStart = new Date(current_year, current_month, 1);
    let thisCalenderStartDate = thisCalenderStart.getDate();            // 현재 월의 첫 날
    let thisCalenderStartDay = thisCalenderStart.getDay();              // 현재 월의 첫 요일 2

    let thisCalenderEnd = new Date(current_year, current_month + 1, 0);
    let thisCalenderEndDate = thisCalenderEnd.getDate();                // 현재 월의 마지막 날

    // 달력 구성 날짜 데이터
    let dates = Array();
    let dateCnt = 1;
    for(let i = 0; i < 42; i++) {
        if (i < thisCalenderStartDay || dateCnt > thisCalenderEndDate) {
            dates[i] = 0;
        } else {
            dates[i] = dateCnt;
            dateCnt++;
        }

    }

    // UI 제작 with dates
    let tableBody = document.querySelector('#table_calender tbody');

    let dateIndex = 0;
    for (let i = 0; i < 6; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            let td = document.createElement('td');

            // 날짜UI
            if (dates[dateIndex] !== 0) {
                // 날짜  UI
                let dateDiv = document.createElement('div');
                dateDiv.textContent = dates[dateIndex];
                td.appendChild(dateDiv);
            }

            tr.appendChild(td);
            dateIndex++;

        }

        tableBody.appendChild(tr);

    }


}