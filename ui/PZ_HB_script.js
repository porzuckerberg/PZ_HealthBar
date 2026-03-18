let numID = 9999;
let numHP = 100;
let numAR = 100;
let numSTMN = 100;
let numO2 = 100;
let slideState = false;
let numWorld = 0;
let numSR = 2;
let isNpush = false;
let ishide = false;

function updateHP() {
    let hpBar = document.querySelector('.HpBar');
    let leftValue = -23 + numHP * 0.23;
    let cropValue = 100 - numHP + (numHP * 0.05 - 5);
    hpBar.style.left = `${leftValue}%`;
    hpBar.style.clipPath = `inset(0 0 0 ${cropValue}%)`;
    document.getElementById('hp-id').textContent = numHP;
}
function updateAR() {
    let arBar = document.querySelector('.ArmorBar');
    let leftValue = -19.3 + numAR * 0.193;
    let cropValue = 100 - numAR + (numAR * 0.2 - 20);
    arBar.style.left = `${leftValue}%`;
    arBar.style.clipPath = `inset(0 0 0 ${cropValue}%)`;
    document.getElementById('ar-id').textContent = numAR;
}
function updateSTMN() {
    let stmnBar = document.querySelector('.StaminaBar');
    let leftValue = -29.8 + numSTMN * 0.298;
    let cropValue = 100 - numSTMN + (0.16 * numSTMN - 12);
    stmnBar.style.left = `${leftValue}%`;
    stmnBar.style.clipPath = `inset(0 0 0 ${cropValue}%)`;
}
function updateO2() {
    const o2 = document.getElementById('O2-ID');
    if (numO2 == 100) { o2.style.display = 'none'; }
    else {
        o2.style.display = 'block';
        let o2Bar = document.querySelector('.O2Bar');
        let leftValue = -15.5 + numO2 * 0.155;
        let cropValue = 100 - numO2 + (numO2 * 0.12 - 12);
        o2Bar.style.left = `${leftValue}%`;
        o2Bar.style.clipPath = `inset(0 0 0 ${cropValue}%)`;
    }
}
function updateSlide() {
    let slideBar = document.getElementById('slide-bar');
    if (slideState) {
        slideBar.classList.remove('blue');
        slideBar.classList.add('red');
    } else {
        slideBar.classList.remove('red');
        slideBar.classList.add('blue');
    }
}
function updateSR() {
    let textSR;
    let rangeBar = document.getElementById('range-bar');

    if (numSR == 1) {
        textSR = "Whisper";
        rangeBar.classList.remove('blue', 'red');
        rangeBar.classList.add('green');
    } else if (numSR == 2) {
        textSR = "Normal";
        rangeBar.classList.remove('green', 'red');
        rangeBar.classList.add('blue');
    } else if (numSR == 3) {
        textSR = "Shout";
        rangeBar.classList.remove('green', 'blue');
        rangeBar.classList.add('red');
    }
    document.getElementById('sr-id').textContent = textSR;
}
function updateNpush() {
    const N = document.getElementById('Npush');
    if (isNpush) { N.style.display = 'block'; }
    else { N.style.display = 'none'; }
}
function hideUI(force = ishide) {
    const elements = [
        document.getElementById('PZ-HealthBar-ID'),
        document.getElementById('O2-ID'),
        document.getElementById('PZ-Logo'),
        document.getElementById('label-time'),
        document.getElementById('label-date'),
        document.getElementById('date-id'),
        document.getElementById('time-id'),
        document.getElementById('world-id'),
        document.getElementById('WDTbox'),
        document.getElementById('WDTbox2'),
    ];

    elements.forEach(el => {
        if (!el) return;

        el.classList.add('fade');

        if (force) {
            el.classList.add('hidden');
        } else {
            el.classList.remove('hidden');
        }
    });

    if (!force) updateO2();
}


function updateDateTime() {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const timeString = now.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('date-id').textContent = dateString;
    document.getElementById('time-id').textContent = timeString;
}
function updateWorld() {
    if (numWorld == 0) { document.getElementById('world-id').textContent = "Main World"; }
    else { document.getElementById('world-id').textContent = "World " + numWorld + "   "; }
}
function updateID() { document.getElementById('id-id').textContent = "ID : " + numID; }

function updateALL() { hideUI(); updateNpush(); updateHP(); updateAR(); updateSTMN(); updateO2(); updateSlide(); updateSR(); updateDateTime(); updateWorld(); updateID(); }

setInterval(updateDateTime, 10000);
updateALL();


// ================================================================================================================
// ================================================================================================================ 

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener("message", (event) => {
        const e = event.data;

        if (e.type === "updateSlide") {
            slideState = e.isSlide
            updateSlide();
        } else if (e.type === "updateMic") {
            if (e.Vs !== null) {
                numSR = e.Vs;
                updateSR();
            }
        }

        else if (e.type === "updateN") { isNpush = e.N; updateNpush(); }

        else if (e.type === "updateStatus") {
            let new_numID = e.playerId;
            let new_numHP = Math.round(e.health);
            let new_numAR = Math.round(e.armour);
            let new_numO2 = 10 * Math.round(e.air);
            let new_numSTMN = 100 - Math.round(e.stamina);

            //let new_numWorld = 0;
            //let new_ishide   = false;

            if (new_numID != numID) { numID = new_numID; updateID(); }
            if (new_numHP != numHP) { numHP = new_numHP; updateHP(); }
            if (new_numAR != numAR) { numAR = new_numAR; updateAR(); }
            if (new_numO2 != numO2) { numO2 = new_numO2; updateO2(); }
            if (new_numSTMN != numSTMN) { numSTMN = new_numSTMN; updateSTMN(); }

            //if (new_numWorld != numWorld) {numWorld = new_numWorld;updateWorld();}
            //if (new_ishide != ishide)     {ishide = new_ishide;updateHide();}
        }
        else if (e.type === "hideUI") {
            hideUI(true);
        }
        else if (e.type === "showUI") {
            hideUI(false);
        }

    });
});