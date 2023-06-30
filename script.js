const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;

handalSlider();

//ste strength circle color to grey
setIndicator("#ccc");

//set passwordLength
function handalSlider() {
    lengthDisplay.innerHTML = passwordLength;
    lengthDisplay.value = passwordLength;

    // Aur kuch bhi karann chahiye ? -- HW
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = 
    ((passwordLength - min) * 100) / (max - min) + "% 100%";

}


// After Notice 
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function randomInteger(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function genratRandamNumber() {
    randomInteger(1, 9);
}

function genratUppercase() {
   return String.fromCharCode(randomInteger(65, 91));
}

function genrateLowercase() {
   return String.fromCharCode(randomInteger(97, 123));
}

function genratSymboll() {
   const randSymboll = randomInteger(0, symbols.length);
   return symbols.charAt(randSymboll);
}

function calculatStrangth() {
    let chackUpper = false;
    let chackLower = false;
    let chackNum = false;
    let chackSym = false;

    if(uppercaseCheck.checked) {
        chackUpper = true;
    }

    if(lowercaseCheck.checked) {
        chackLower = true;
    }

    if(numbersCheck.checked){
        chackNum = true; 
    }

    if(symbolsCheck.checked) {
        chackSym = true;
    }

    if(chackUpper && chackLower && (chackNum || chackSym) && passwordLength >= 8) {
        setIndicator("#0f0"); 
    }

    else if((chackUpper || chackLower) && (chackNum || chackSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    
    else{
        setIndicator("#f00");
    }
}


// After Notice 
async function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML = "Copied";
    }
    catch(err) {
        copyMsg.innerHTML = "Failed"; 
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}


function shufflePassword(array) {
    for(let i  = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        // swap number at i index to j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function handalChackBoxCheck() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked) {
            checkCount++; 
        }
    });
    
    if(passwordLength < checkCount) {
       passwordLength = checkCount;
       handalSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handalChackBoxCheck);
});

inputSlider.addEventListener("input", (rang) => {
    passwordLength = rang.target.value;
    handalSlider();
})

copyBtn.addEventListener("click", () => {
    if(passwordDisplay.value) {
        copyContent();
    }
})


generateBtn.addEventListener("click", () => {
    //none of the checkbox are selected
    if(checkCount == 0) return;
    
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handalSlider();
    }
   
    // Remove old Password
    password = "";

    let funcArr = [];

    if(uppercaseCheck.checked) {
        funcArr.push(genratUppercase);
    }

    if(lowercaseCheck.checked) {
        funcArr.push(genrateLowercase);
    }

    if(numbersCheck.checked) {
        funcArr.push(genratRandamNumber);
    }

    if(symbolsCheck.checked) {
        funcArr.push(genratSymboll);
    }

    // compulsory Addition 
    for(let i = 0; i < funcArr.length; i++) {
        password = password + funcArr[i];
    }
    console.log("COmpulsory adddition done");

    // Remaning Addition 
    // for(let i = 0; i < passwordLength - funcArr.length; i++) {
    //     let randNumInt = randamInteger(0, funcArr.length);
    //     console.log("randIndex" + randNumInt);
    //     password = password + funcArr[randNumInt]();
    //     console.log("Remaining adddition done" + i);
    // }

    // Remaning Addition 
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randNumInt = randomInteger(0, funcArr.length);        
        console.log("randIndex" + i);
        password += funcArr[randNumInt];
      }

    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
 
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");

    //calculate strength
    calculatStrangth();

})

