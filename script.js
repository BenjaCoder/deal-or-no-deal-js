window.onload = () => {
    const amounts = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750,
        1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000,
        500000, 750000, 1000000]
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23, 24, 25, 26];
    
    let cases = [];
    let amountsCopy = [...amounts];
    let numbersCopy = [...numbers];

    function shuffleArray(array) {
        for (let i = 0; i < 500; i++) {
            let indexA = Math.floor(Math.random() * array.length);
            let indexB = Math.floor(Math.random() * array.length);
            let itemA = array[indexA];
            let itemB = array[indexB];
            array[indexA] = itemB;
            array[indexB] = itemA;
        }
    }

    function createCases(numbers, amounts) {
        for (let i = 0; i < numbers.length; i++) {
            let caseObj = {number: numbers[i], amount: amounts[i], isShowing: false};
            cases.push(caseObj);
        }
        cases.sort((a, b) => a.number - b.number)
    }

    shuffleArray(numbersCopy);
    shuffleArray(amountsCopy);
    createCases(numbersCopy, amountsCopy);

    const casesContainer = document.getElementById("cases-container");
    
    function renderCases() {
        casesContainer.innerHTML = "";
        for (let i = 0; i < cases.length; i++) {
            let thisCase = cases[i];
            let caseDiv = document.createElement("div");
            if (thisCase.isShowing) {
                caseDiv.classList.add("case", "case-open");
                let textNode = document.createTextNode(thisCase.amount);
                caseDiv.appendChild(textNode);
            }
            else {
                caseDiv.classList.add("case", "case-closed");
                let textNode = document.createTextNode(thisCase.number);
                caseDiv.appendChild(textNode);
                caseDiv.addEventListener("click", () => {
                    caseDiv.classList.remove("case-closed");
                    caseDiv.classList.add("case-open")
                    caseDiv.removeChild(textNode);
                    textNode = document.createTextNode('$'+thisCase.amount);
                    caseDiv.appendChild(textNode);
                    thisCase.isShowing = true;
                });
            }
            casesContainer.appendChild(caseDiv);
        }
    }

    function startGame() {
        renderCases();
        let startingCaseNumber = getFirstCase();
        let startingCase = cases[startingCaseNumber-1];
        cases.splice(startingCaseNumber-1, 1);
        let yourArea = document.getElementById("your-area");
        let yourCase = document.createElement("div");
        yourCase.classList.add("case", "case-closed");
        let textNode = document.createTextNode(startingCase.number);
        yourCase.appendChild(textNode);
        yourArea.appendChild(yourCase);
        renderCases();
        let firstRound = true;
        while (firstRound) {
            if (getCountOfShowing == 6) {
                firstRound = false;
                makeOffer();
            }
        }
    }

    function getFirstCase() {
        let x = prompt("Select a case (1-26)");
        while (x < 1 || x > 26 || isNaN(x)) {
            x = prompt("Select a case (1-26)");  
        }
        return Math.round(x);
    }

    function makeOffer() {
        let sum = 0;
        for (let i = 0; i < cases.length; i++) {
            sum += cases[i].amount;
        }
        let offer = sum / cases.length;
        confirm(`The offer is ${offer}`);
    }

    function getCountOfShowing() {
        let count = 0;
        for (let i = 0; i < cases.length; i++) {
            if (cases[i].isShowing) {
                count++;
            }
        }
        return count;
    }

    startGame();

}