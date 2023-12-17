const experiencePerAdventureLevels = {
    1: 0,
    2: 375,
    3: 500,
    4: 625,
    5: 725,
    6: 850,
    7: 950,
    8: 1075,
    9: 1200,
    10: 1300,
    11: 1425,
    12: 1525,
    13: 1650,
    14: 1775,
    15: 1875,
    16: 2000,
    17: 2375,
    18: 2500,
    19: 2625,
    20: 2775,
    21: 2825,
    22: 3425,
    23: 3725,
    24: 4000,
    25: 4300,
    26: 4575,
    27: 4875,
    28: 5150,
    29: 5450,
    30: 5725,
    31: 6025,
    32: 6300,
    33: 6600,
    34: 6900,
    35: 7175,
    36: 7475,
    37: 7750,
    38: 8050,
    39: 8325,
    40: 8625,
    41: 10550,
    42: 11525,
    43: 12475,
    44: 13450,
    45: 14400,
    46: 15350,
    47: 16325,
    48: 17275,
    49: 18250,
    50: 19200,
    51: 26400,
    52: 28800,
    53: 31200,
    54: 33600,
    55: 36000,
    56: 232350,
    57: 258950,
    58: 285750,
    59: 312825,
    60: 340125
}

let adventureLevels = [];

const adventureLevelSelectElement = document.getElementById('adventureLevel');
const adventureExpInputElement = document.getElementById('adventureExp');
const expPerDayInputElement = document.getElementById('expPerDay');
const desiredAdventureLevelSelectElement = document.getElementById('desiredAdventureLevel');

/**
 * This fonction will fill the {adventureLevels} array with a series of object representing an adventure level.
 * Each object will have an 'exp' field with the same value we have in {experiencePerAdventureLevels},
 * and a field totalExp representing the total of experience the player as gained to be in the current adventure level
 *
 * (AR 1:) { exp: 0, totalExp: 0 }
 * (AR 2:) { exp: 375, totalExp: 375 }
 * (AR 3:) { exp: 500, totalExp: 875 }
 * (AR 4:) { exp: 625, totalExp: 1500 }
 * ...
 */
function calculateAdventureRanks() {
    let currentExp = 0;
    for (let i = 1; i <= 60; i++) {
        let exp = experiencePerAdventureLevels[i];
        currentExp += exp;
        adventureLevels.push({
            exp: exp,
            totalExp: currentExp
        });
    }
}

function updateDesiredAdventureLevel() {
    desiredAdventureLevelSelectElement.innerHTML = '';
    
    for (let i = Number(adventureLevelSelectElement.value)+1; i <= 60; i++) {
        let optionElement = document.createElement('option');
        optionElement.value = i;
        optionElement.innerText = i;
        
        desiredAdventureLevelSelectElement.appendChild(optionElement);
    }
}

function calculate() {
    // User inputs
    let adventureLevel = Number(adventureLevelSelectElement.value);
    let adventureExp = Number(adventureExpInputElement.value);
    let expPerDay = Number(expPerDayInputElement.value);
    let desiredAdventureLevel = Number(desiredAdventureLevelSelectElement.value);
    
    // User totals
    let totalAdventureExp = adventureLevels[adventureLevel-1].totalExp + adventureExp;
    let totalAdventureExpRequired = adventureLevels[desiredAdventureLevel-1].totalExp;
    
    // Calculate days
    let days = 1;
    let exp = totalAdventureExp;
    
    for (days; exp < totalAdventureExpRequired; days++) {
        exp = exp + expPerDay;
    }
    
    days -= 1;
    
    // Date
    let date = new Date();
    date.setDate(date.getDate() + days);
    let dateString = date.toLocaleDateString("en-US", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    console.log(`Tu vas passer l'AR ${desiredAdventureLevelSelectElement.value} dans ${days} jours (${dateString})`);
    console.log('--------------------------');
}

window.onload = () => {
    calculateAdventureRanks();
    
    for (let i = 1; i < 60; i++) {
        let optionElement = document.createElement('option');
        optionElement.value = i;
        optionElement.innerText = i;
        
        adventureLevelSelectElement.appendChild(optionElement);
    }
    
    updateDesiredAdventureLevel();
    adventureLevelSelectElement.onchange = () => updateDesiredAdventureLevel();
}



















