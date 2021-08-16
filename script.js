// 2
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    }

    delete() {
        //15
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        //5
        // this.currentOperand = number

        //7
        if (number === '.' && this.currentOperand.includes('.')) return
        //6
        this.currentOperand = this.currentOperand.toString() + number.toString()
    };

    chooseOperation(operation) {
        //11
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.currentOperand = ''
        }
        //9
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        //13
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    //18
    getDisplayNumber(number) {
        // return number
        //20
        // const floatNumber = parseFloat(number)
        // if (isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')

        //21
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        //4
        // this.currentOperandTextElement.innerText = this.currentOperand
        //10
        // this.previousOperandTextElement.innerText = this.previousOperand
        //17
        // this.currentOperandTextElement.innerText = this.currentOperand
        // if (this.operation != null) {
        //     this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        // }

        //19
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        //22
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// 1
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// 3
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});

//8
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});

//12
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
});

//14
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
});

//16
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
});