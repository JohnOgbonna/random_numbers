let form = document.getElementById('form');
let randomNumbers = []
function generateRandomNumbers(min, max, digits, decimals){
    let index = 0
    while (randomNumbers.length < digits) {
        let number = +(Math.random() * (max-min) + min).toFixed(decimals) //set range of numbers based on max and min
        if (!randomNumbers.includes(number)) { //only add number if not inside random numbers array to avoid duplication
            randomNumbers.push(number)
            index++ //index tracks numbers added to random numbers
        }
    }
    let numbersList = document.getElementById('randomNumbers')
    numbersList.innerHTML = '' //clear any existing list
    for(let i = 0; i < randomNumbers.length; i++ ){
        numbersList.appendChild(document.createElement('li')).innerHTML = randomNumbers[i]
    }
    let confirmation = document.getElementById('confirmation')
    confirmation.innerHTML = ''
    confirmation.innerHTML = `Generated ${randomNumbers.length} Random Number${randomNumbers.length > 1 ? 's' : ''}`
    let buttonWrapper = document.getElementById("buttonWrapper")
    buttonWrapper.innerHTML = ''
    let copyButton = document.createElement('button')
    copyButton.id = "copyButton"
    copyButton.innerHTML = "Copy!"
    buttonWrapper.appendChild(copyButton)
    copyButton.addEventListener('click', e =>{
        e.preventDefault()
        copyNumbers()
    })
}
function copyNumbers(){
    let copiedNumbers = ''
    for(let i = 0; i< randomNumbers.length; i++){
        copiedNumbers += `${randomNumbers[i]}\n`
    }
    navigator.clipboard.writeText(copiedNumbers)
}
form.addEventListener('submit', e =>{
    e.preventDefault()
    //series of if statements for validation
    if (+ e.target.min.value > + e.target.max.value){
        alert("Minimum value cannot be higher than the Maximum")
        return
    }
    if (e.target.digits.value > (e.target.max.value - e.target.min.value + 1 )){
        alert("Too many requested digits for given range") //this is important as there are no duplicates allowed. If range is not long enough, would case infinite loop
        return
    }
    if (e.target.digits.value > 1000000){
        alert("Limit for this program is 1,000,000 numbers!")
        return
    }
    generateRandomNumbers(+e.target.min.value, +e.target.max.value, +e.target.digits.value, +e.target.decimals.value)
})
clearButton = document.getElementById('clear')
clearButton.addEventListener('click', e =>{
    e.preventDefault()
    let numbersList = document.getElementById('randomNumbers')
    numbersList.innerHTML = '' //clear any existing list
    confirmation.innerHTML = '' //clear confirmation message
    let buttonWrapper = document.getElementById("buttonWrapper")
    buttonWrapper.innerHTML = '' // remove copy button on clear
})
