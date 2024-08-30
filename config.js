const options = document.querySelectorAll('.option');
const calculator = document.querySelector('.calculator');
const testPortion = document.getElementById('test-portion');
const calcButton = document.getElementById('agg-calc-btn');
const closeBtn = document.querySelector('.calc-close-btn');
const result = document.querySelector('.result');
const resultCloseBtn = document.querySelector('.result-close-btn');
const reqBtn = document.querySelector('.req-btn');
const reqCloseBtn = document.querySelector('.req-close-btn');
const errorContainer = document.querySelector('.error-container');
const errorText = document.querySelector('.error');
const universitiesList = document.querySelector('.list');
const uniNameSpan = document.getElementById('uniName');
const aggText = document.querySelector('.agg-text');
const requestForm = document.querySelector('.request-form');

let error = "";

let mtObt = parseFloat(document.getElementById('mtO').value);
let mtTotal = parseFloat(document.getElementById('mtT').value);
let itObt = parseFloat(document.getElementById('itO').value);
let itTotal = parseFloat(document.getElementById('itT').value);
let tObt = parseFloat(document.getElementById('tO').value);
let tTotal = parseFloat(document.getElementById('tT').value);

let WtestReqs = document.querySelectorAll('.input-a');
let NtestReqs = document.querySelectorAll('.input-s');
let testReq = false;
let emptyFields = [];

const universities = [
    {
        uniName: "Air University",
        id: "air",
        haveTest: true,
    },
    {
        uniName: "Bahria University",
        id: "bu",
        haveTest: true,
    },
    {
        uniName: "COMSATS University",
        id: "comsats",
        haveTest: true,
    },
    {
        uniName: "Quaid e Azam University",
        id: "qau",
        haveTest: false,
    },
    {
        uniName: "National University of Sciences and Technology (NUST)",
        id: "nust",
        haveTest: true,
    },
    {
        uniName: "Pakistan Institute of Engineering and Applied Sciences",
        id: "pieas",
        haveTest: true,
    },
    {
        uniName: "University of Agriculture, Faislabad",
        id: "uaf",
        haveTest: true,
    },
    {
        uniName: "University of Health Sciences",
        id: "uhs",
        haveTest: true,
    },
    {
        uniName: "Insitute of Space Technology - Science",
        id: "ist-s",
        haveTest: false,
    },
    {
        uniName: "Insitute of Space Technology - Engneering",
        id: "ist-t",
        haveTest: true,
    },
    {
        uniName: "University of Engineering and Technology (UET)",
        id: "uet",
        haveTest: true,
    },
    {
        uniName: "Government College University (GCU)",
        id: "gcu",
        haveTest: true,
    },
    {
        uniName: "International Islamic University",
        id: "iiui",
        haveTest: true,
    },
    {
        uniName: "NED University of Engineering & Technology",
        id: "ned",
        haveTest: true,
    },
    {
        uniName: "University of Sindh",
        id: "uos",
        haveTest: true,
    },
    {
        uniName: "Khyber Medical College",
        id: "kmu",
        haveTest: true,
    },
    {
        uniName: "National University of Modern Languages",
        id: "numl",
        haveTest: true,
    },
    {
        uniName: "Gomal University, DI Khan",
        id: "gomal",
        haveTest: false,
    },
]

universities.forEach(university => {
    const newUni = document.createElement('div');
    const newUniTitle = document.createElement('h5');
    newUniTitle.innerText = university.uniName;
    newUni.appendChild(newUniTitle);
    // newUni.style.backgroundImage = university.image;
    newUni.classList.add('option', 'bg-light', 'border', 'rounded',);
    universitiesList.appendChild(newUni);
    newUni.addEventListener('click', () => {
        calcButton.id = university.id;
        let aggregateFormula;
        uniNameSpan.innerText = university.uniName;
        if (university.haveTest) {
            testPortion.classList.add('active');
            calculator.classList.add('active');
            testReq = true;
        } else {
            testPortion.classList.remove('active');
            calculator.classList.add('active');
            testReq = false;
        }
    })
})

closeBtn.addEventListener('click', () => {
    calculator.classList.remove('active');
    errorContainer.classList.remove('active');
})
resultCloseBtn.addEventListener('click', () => {
    result.classList.remove('active');
})
reqCloseBtn.addEventListener('click', () => {
    requestForm.classList.remove('active');
})
reqBtn.addEventListener('click', () => {
    requestForm.classList.add('active');
})

const AggregateCalculator = () => {
    let mtObt = parseFloat(document.getElementById('mtO').value);
    let mtTotal = parseFloat(document.getElementById('mtT').value);
    let itObt = parseFloat(document.getElementById('itO').value);
    let itTotal = parseFloat(document.getElementById('itT').value);
    let tObt = parseFloat(document.getElementById('tO').value);
    let tTotal = parseFloat(document.getElementById('tT').value);

    let formulae = [
        {
            name: 'air',
            formula: (mtObt / mtTotal * 15) + (itObt / itTotal * 35) + (tObt / tTotal * 50),
        },
        {
            name: 'bu',
            formula: (mtObt / mtTotal * 15) + (itObt / itTotal * 35) + (tObt / tTotal * 50),
        },
        {
            name: 'comsats',
            formula: (mtObt / mtTotal * 10) + (itObt / itTotal * 40) + (tObt / tTotal * 50),
        },
        {
            name: 'qau',
            formula: (mtObt / mtTotal * 30) + (itObt / itTotal * 70),
        },
        {
            name: 'nust',
            formula: (mtObt / mtTotal * 10) + (itObt / itTotal * 15) + (tObt / tTotal * 75),
        },
        {
            name: 'pieas',
            formula: (mtObt / mtTotal * 15) + (itObt / itTotal * 25) + (tObt / tTotal * 60),
        },
        {
            name: 'uaf',
            formula: (mtObt / mtTotal * 30) + (itObt / itTotal * 30) + (tObt / tTotal * 60),
        },
        {
            name: 'uhs',
            formula: (mtObt / mtTotal * 10) + (itObt / itTotal * 40) + (tObt / tTotal * 50),
        },
        {
            name: 'ist-s',
            formula: (mtObt / mtTotal * 40) + (itObt / itTotal * 60),
        },
        {
            name: 'ist-t',
            formula: (mtObt / mtTotal * 20) + (itObt / itTotal * 40) + (tObt / tTotal * 40),
        },
        {
            name: 'uet',
            formula: (mtObt / mtTotal * 25) + (itObt / itTotal * 45) + (tObt / tTotal * 30),
        },
        {
            name: 'gcu',
            formula: (itObt / itTotal * 60) + (tObt / tTotal * 40),
        },
        {
            name: 'iiui',
            formula: (itObt / itTotal * 40) + (tObt / tTotal * 60),
        },
        {
            name: 'ned',
            formula: (itObt / itTotal * 50) + (tObt / tTotal * 50),
        },
        {
            name: 'uos',
            formula: (mtObt / itTotal * 10) + (itObt / itTotal * 30) + (tObt / tTotal * 60),
        },
        {
            name: 'kmu',
            formula: (mtObt / itTotal * 10) + (itObt / itTotal * 40) + (tObt / tTotal * 50),
        },
        {
            name: 'numl',
            formula: (mtObt / itTotal * 5) + (itObt / itTotal * 10) + (tObt / tTotal * 75) + 0.1,
        },
        {
            name: 'gomal',
            formula: ((mtObt / itTotal) + (itObt / itTotal * 2))/3,
        },

    ]

    formulae.forEach(formula => {
        if (formula.name == calcButton.id) {
            aggregateFormula = formula.formula;
        }
    })
    
    aggText.innerText = aggregateFormula;
    result.classList.add('active');
}
calcButton.addEventListener('click', () => {
    emptyFields = [];
    error = '';
    errorText.innerText = '';
    if (testReq) {
        WtestReqs.forEach(input => {
            if (input.value == '') {
                error = "Some Fields are empty";
                emptyFields.push(input.id);
            }
        })
    } else {
        NtestReqs.forEach(input => {
            if (input.value == '') {
                error = "Some Fields are empty";
                emptyFields.push(input.id)
            }
        })
    }
    if (error == '') {
        AggregateCalculator();
        errorContainer.classList.remove('active');
        WtestReqs.forEach(input => {
            input.classList.add('border-success');
            input.classList.remove('border-danger');
        })
    } else {
        WtestReqs.forEach(input => {
            if (emptyFields.includes(input.id)) {
                input.classList.add('border-danger');
                input.classList.remove('border-success');
            }
        })
        errorText.innerText = error;
        errorContainer.classList.add('active')
    }
})

function send() {
    let userEmail = document.getElementById("user-email").value;
    let userMessage = document.getElementById("user-message").value;
    let body =
      "<h1>" + userMessage + "</h1> <span style='color:blue;'>" + userEmail + "</span>";
  
    if (userEmail === '' || userMessage === '') {
      return 
    }
    else{
      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "[ELASTICEMAIL USERNAME HERE]",
        Password: "[ELASTICEMAIL PASSWORD HERE]",
        To: "[ELASTICEMAIL EMAIL HERE]",
        From: "[ELASTICEMAIL EMAIL HERE]",
        Subject: "University request",
        Body: body,
      }).then(
        message => {
          if(message == 'OK'){
            swal("","Your Message has been sent", "success");
          } else{
            swal("","Something went wrong", "error");
          }
        });
      
    }
     
  }
