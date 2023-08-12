// fetch element through custom attribute
const inputSlider=document.querySelector("[data-lengthSlider]");

const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");

const copyMsg=document.querySelector("[data-copyMSG]");

const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numbersCheck=document.querySelector('#numbers');
const symbolsCheck=document.querySelector('#symbols');

const indicator=document.querySelector('[data-indicator]');
const gernerationBtn=document.querySelector('.generateBtn');

const copyBtn=document.querySelector("[data-copy]");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");

const symbols="~`!@#$%^&*()+-*/[]{}|<>?";

let password="";
let passwordlength=10;
let checkCount=0;
setIndicator("#ccc");


function handleSlider(){
    inputSlider.value=passwordlength;
    lengthDisplay.innerHTML=passwordlength;

    let min=inputSlider.min;
    let max=inputSlider.max;
    inputSlider.style.backgroundSize= ((passwordlength-min)*100/(max-min)) +"% 100%";

};

function setIndicator(color){
    // strength
    indicator.style.backgroundColor=color;

    // indicator.style.opacity=0.4;
}


// most important function as it will generate number from  0 to 9
// uppercase and lowercase letters too 
function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRndNumber(){
    return getRndInteger(0,9);
}

function generateRndLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateRndUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateRndSymbol(){
    let Index=getRndInteger(0,symbols.length);
    return symbols.charAt(Index);
}

// based on the length and the checkboxes included for password creation
function calStrength(){
    let hasupperCase=false;
    let haslowerCase=false;
    let hasNum =false;
    let hasSym=false;

    let passlength=parseInt(lengthDisplay.innerHTML);

    if(uppercaseCheck.checked){
        hasupperCase=true;
    }

    if(lowercaseCheck.checked){
        haslowerCase=true;
    }

    if(numbersCheck.checked){
        hasNum=true;
    }

    if(symbolsCheck.checked){
        hasSym=true;
    }

    if(hasupperCase && haslowerCase && (hasNum || hasSym) && passlength>=8){
        setIndicator("#0f0f");
    }
    else if( (haslowerCase || haslowerCase) && (hasNum || hasSym) && passlength>=6 ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
};

function shufflePassword(passArr){
    // fisher yates method
    for(let i=passArr.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(passArr.length));
        let temp=passArr[i];
        passArr[i]=passArr[j];
        passArr[j]=temp;
    }
    let str="";
    
    passArr.forEach((val)=>{
        str+=val;
    })

    return str;
    
}


async function copyContent(){
    try{
        // this is Api call check if it is NW call
       await navigator.clipboard.writeText(passwordDisplay.value);
       copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }

    // the copied message becomes invisible after some time
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);

};

inputSlider.addEventListener('input',(e)=>{
    // here e refers to thr event 
    passwordlength=e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click',(e)=>{
    if(passwordDisplay.value){
        copyContent();
    }
});

function handleCheckBoxChange(){
    checkCount=0;

    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    // special
    if(passwordlength < checkCount){
        passwordlength=checkCount
        handleSlider();
    }

};

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
});


gernerationBtn.addEventListener('click',()=>{
    if(checkCount<=0){
        return ;
    }

    // passwordDisplay.innerText="";
    password="";

    // if(uppercaseCheck.checked){
    //     password+=generateRndUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password+=generateRndLowerCase();
    // }

    // if(symbolsCheck.checked){
    //     password+=generateRndNumber();
    // }

    // if(numbersCheck.checked){
    //     password+=generateRndNumber();
    // }

    let funcArr=[];

    if(uppercaseCheck.checked){
        password+=generateRndUpperCase();
        funcArr.push(generateRndUpperCase);
    }

    if(lowercaseCheck.checked){
        password+=generateRndLowerCase();
        funcArr.push(generateRndLowerCase);
    }

    if(symbolsCheck.checked){
        password+=generateRndSymbol();
        funcArr.push(generateRndSymbol);
    }

    if(numbersCheck.checked){
        password+=generateRndNumber();
        funcArr.push(generateRndNumber);
    }
    console.log(funcArr);

    // for(let i=0;i<funcArr.length;i++){
    //     password+=funcArr[i]();
    // }

    for(let i=0;i<passwordlength-funcArr.length;i++){
        let rndIndex=getRndInteger(0,funcArr.length);
        password+=funcArr[rndIndex]();
    };

    // shuffle the password
    password=shufflePassword(Array.from(password));

    passwordDisplay.value=password;

    calStrength();

})
























// async function abcd(){
//     let merapromise=new Promise((resolve,rejected)=>{
//         setTimeout(()=>{
//             console.log("hello");
//             rejected(1000);
//         },5000);
//         // resolve(1000);
//     });

//     await merapromise;

//     console.log("chalegakya");
// }





