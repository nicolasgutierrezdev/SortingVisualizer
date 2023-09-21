const arraySlider = document.querySelector('#array-slider');
const speedSlider = document.querySelector('#speed-slider');
const algorithmsButtons = document.querySelectorAll('#algorithms button');
const sortButton = document.querySelector('#sort-button');

let arraySize = arraySlider.value;
let speed = 100 - speedSlider.value + 10;
let algorithm = '';
let sorting = false;

updateArray(arraySize);

sortButton.addEventListener('click', () => {
    if (algorithm === '') {
        alert('Please select an algorithm');
        return;
    }

    if (sorting) return;

    sorting = true;
    sortButton.disabled = true;
    arraySlider.disabled = true;
    speedSlider.disabled = true;
    algorithmsButtons.forEach(button => {
        button.disabled = true;
    })

    sortButton.classList.add('active');
    if (colors[0] === '#888') {
        updateArray(arraySize)
    }
    sort(array, speed)
})

arraySlider.addEventListener('input', () => {
    arraySize = arraySlider.value;
    updateArray(arraySize);
})

speedSlider.addEventListener('input', () => {
    speed = 100 - speedSlider.value + 10;
})


algorithmsButtons.forEach(button => {
    button.addEventListener('click', () => {
        algorithmsButtons.forEach(button => {
            button.classList.remove('active');
        })
        button.classList.add('active');
        algorithm = button.id;
        updateArray(arraySize)
    })

})

