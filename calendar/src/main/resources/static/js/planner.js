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

    // 이벤트 핸들러 등록
    initEvents();

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

        if (i >= 5 && dates[dateIndex] === 0)
            break;

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

// 이벤트 등록
function initEvents() {
    console.log('initEvents()');

    // click 이벤트 들 처리
    document.addEventListener('click', function (event) {

        // 이전달 에서 이벤트 발생 시
        if (event.target.matches('#section_wrap .btn_pre')) {
            console.log('btn_pre CLICKED!!');
            setPreMonth();
        }

        // 다음달 에서 이벤트 발생 시
        if (event.target.matches('#section_wrap .btn_next')) {
            console.log('btn_next CLICKED!!');
            setNextMonth();
        }

    });

    // change 이벤트 들 처리
    document.addEventListener('change', function (event) {

        // 달력에서 년 변경 시
        if (event.target.matches('#section_wrap select[name="p_year"]')) {
            setMonthBySelectChanged();
        }

        // 달력에서 월 변경 시
        if (event.target.matches('#section_wrap select[name="p_month"]')) {
            setMonthBySelectChanged();
        }

    });
}

function setPreMonth() {
    console.log('setPreMonth()');

    let yearSelect = document.querySelector('select[name="p_year"]');
    let monthSelect = document.querySelector('select[name="p_month"]');

    if (yearSelect.value == 2025 && monthSelect.value == 1) {
        alert('2025년 1월 이전은 설정할 수 없습니다.');
        return false;
    }

    let temp_year = current_year;
    let temp_month = current_month - 1;

    if (temp_month <= -1) {
        temp_year -= 1;
        temp_month = 11;
    }

    let preCalender = new Date(temp_year, temp_month, 1);

    // 현재 데이터 설정
    setCurrentCalender(
        preCalender.getFullYear(),
        preCalender.getMonth(),
        preCalender.getDate(),
        preCalender.getDay()
    )

    // UI(<select>) 렌더링
    setCurrentYearAndMonthSelectUI();

    //  UI(<tr>) 제거
    removeCalenderTr();

    // UI(<tr>) 렌더링
    addCalenderTr();

}

function setNextMonth() {
    console.log('setNextMonth()');

    let yearSelect = document.querySelector('select[name="p_year"]');
    let monthSelect = document.querySelector('select[name="p_month"]');

    if (yearSelect.value == 2030 && monthSelect.value == 12) {
        alert('2030년 12월 이후는 설정할 수 없습니다.');
        return false;
    }

    let temp_year = current_year;
    let temp_month = current_month + 1;

    if (temp_month >= 12) {
        temp_year += 1;
        temp_month = 0;
    }

    let nextCalender = new Date(temp_year, temp_month, 1);

    // 현재 데이터 설정
    setCurrentCalender(
        nextCalender.getFullYear(),
        nextCalender.getMonth(),
        nextCalender.getDate(),
        nextCalender.getDay()
    )

    // UI(<select>) 렌더링
    setCurrentYearAndMonthSelectUI();

    //  UI(<tr>) 제거
    removeCalenderTr();

    // UI(<tr>) 렌더링
    addCalenderTr();

}

function removeCalenderTr() {
    console.log('removeCalenderTr() CALLED!!');

    let tbody = document.querySelector('#table_calender tbody');
    tbody.innerHTML = '';

}

function setMonthBySelectChanged() {
    console.log('setMonthBySelectChanged() CALLED!!');

    let temp_year = document.querySelector('select[name="p_year"]').value;
    let temp_month = document.querySelector('select[name="p_month"]').value - 1;

    let seletedCalender = new Date(temp_year, temp_month, 1);

    // 데이터 설정
    setCurrentCalender(
        seletedCalender.getFullYear(),
        seletedCalender.getMonth(),
        seletedCalender.getDate(),
        seletedCalender.getDay()
    );

    // 달력 UI 렌더링
    removeCalenderTr();
    addCalenderTr();

}