const numbers = ['0','1','2','3','4','5','6','7','8','9','.',]
const operations = ['/','x','-','+','%']
let a = ''
let b = ''
let sign = ''
let equal = false

const output = document.querySelector('.main__output')
const button = document.querySelector('.main__buttons')

function clearAll(){
    a = ''
    b = ''
    sign = ''
    equal = false
    output.value = null
}

function round(){
    if(a !== Math.round(a)){
        a = a.toFixed(2)
    }
}

function checkLength(arg){
    if(arg.length > 11){
        output.classList.add('output')
        output.value = 'Number too long'
        a = ''
        b = ''
        sign = ''
    }
}

button.addEventListener('click', function(e){
    let key = e.target.textContent
    output.classList.remove('output')
    if(key === 'C') clearAll()

    if(numbers.includes(key)){
        if(b === '' && sign === ''){
            a += key
            output.value = a
            checkLength(a)
        }
        else if(a !== '' && b !== '' && equal){
            b = key
            equal = false
            output.value = b
            checkLength(b)
        }else{
            b += key
            output.value = b
            checkLength(b)
        }   
    }

    if(operations.includes(key)){
        sign = key
        return
    }

    if(key === '+/-'){
        if(output.value === a){
            a = -a
            output.value = -output.value
        }else{
            b = -b
            output.value = -output.value
        }
    }

    if(key === '='){
        if(b === '') b = a
        switch (sign) {
            case '+': 
                round(a = (+a) + (+b))
                break;
            case '-':
                round(a = a - b)
                break;    
            case '/':
                if(b !== '0'){
                    round(a = a / b)
                }else{
                    output.value = 'Error'
                    a = ''
                    b = ''
                    sign = ''
                    return
                }
                break;
            case 'x':
                round(a = a * b)
                break;   
            case '%':
                round(a = (a / b) * 100)
                break;  

        }

        if(String(a).length > 10){
            output.value = parseFloat(a.toPrecision(10)).toExponential(6)
        }else{
            output.value = a
        }
        equal = true
        
    }
})


