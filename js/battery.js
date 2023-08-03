const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
const image = document.querySelector(".image");
const message = document.querySelector(".message");
const surpriseElement = document.querySelector("#surprise");
const url = `https://robohash.org/`;

const updateBatteryStatus = (battery) => {
    chargeStatus.innerHTML = battery.charging ? 'Charge status: charging' : 'Charge status: not charging';

    let batteryLevel = battery.level * 100;

    message.textContent = batteryLevel < 20 ? "You need to charge your battery" : "Your battery is charged";

    image.hidden = false;
    image.src = `${url}${batteryLevel}.png`;

    chargeLevel.value = batteryLevel + "%";
    chargeMeter.value = batteryLevel;
}

navigator.getBattery().then(battery => {
    console.log(battery);

    updateBatteryStatus(battery);

    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    })

    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    })
})