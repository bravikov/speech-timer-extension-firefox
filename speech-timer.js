"use strict";

var initialized = false;
var visibility = false;

const timerDivId = "speech-timer"
const timerValueId = "speech-timer-value"

var g_interval;
var g_timerStartValue = "00:02:00";

function toggleVisibility()
{
    var timer = document.getElementById(timerDivId)

    if (visibility)
    {
        timer.style.display = "none";
        clearInterval(g_interval);
        visibility = false;
    }
    else
    {
        timer.style.display = "block";
        visibility = true;
    }
}

function run()
{
    clearInterval(g_interval);
    var timerValue = document.getElementById(timerValueId);
    timerValue.value = g_timerStartValue;
    g_interval = setInterval(function stepDown()
    {
        timerValue.stepDown();
        if (timerValue.value == "00:00")
        {
            clearInterval(g_interval);
        }
    }, 1000);
}

function updateTimerValue(event)
{
    clearInterval(g_interval);
    g_timerStartValue = event.target.value;
}

function initialize()
{
    if (initialized)
    {
        var timerValue = document.getElementById(timerValueId);
        timerValue.value = g_timerStartValue;
        return;
    }

    var timer = document.createElement("div");
    timer.id = timerDivId;
    timer.style.display = "block";
    timer.style.position = "relative";
    timer.style.textAlign = "center";
    timer.style.left = "0px";
    timer.style.right = "0px";
    timer.textAlign = "center";

    var value = document.createElement("input");
    value.id = timerValueId;
    value.type = "time";
    value.value = g_timerStartValue;
    value.step = 1;
    value.style.fontSize = "70pt";
    value.style.fontFamily = "arial";
    value.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
    value.style.border = "none";
    value.style.textAlign = "center";
    value.style.color = "rgb(64,64,64)";
    value.required = true;
    value.addEventListener("input", updateTimerValue);
    timer.appendChild(value);

    var button = document.createElement("button");
    button.name = "button";
    button.style.height = "40px";
    button.style.width = "75px";
    button.style.position = "absolute";
    button.style.top = "50%";
    button.style.margin = "-20px 0 0 30px";
    button.style.fontSize = "15pt";
    button.style.fontFamily = "arial";
    button.style.color = "#000";
    button.style.borderRadius = "10px 0px";
    button.style.border = "none";
    button.style.backgroundColor = "#fc0";
    button.style.cursor = "pointer";
    button.innerHTML = "Start";
    button.onclick = run;
    timer.appendChild(button);

    document.body.insertBefore(timer, document.body.firstChild);

    initialized = true;
}

browser.runtime.onMessage.addListener(request => {
    initialize();
    toggleVisibility();

    return Promise.resolve({});
});
