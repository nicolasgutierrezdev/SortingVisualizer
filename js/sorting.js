let array = [];
let colors = [];


const sort = async (array, speed) => {
    switch (algorithm) {

        case 'bubble':
            await bubbleSort(array, speed);
            break;

        case 'insertion':
            await insertionSort(array, speed);
            break;

        case 'selection':
            await selectionSort(array, speed);
            break;

        case 'merge':
            const array_ = Array.from(array);
            const pumba = await mergeSort(array_, 0, array_.length);
            break;

    }

    draw(array, colors);

    sorting = false;
    sortButton.disabled = false;
    arraySlider.disabled = false;
    speedSlider.disabled = false;
    algorithmsButtons.forEach(button => {
        button.disabled = false;
    })

    sortButton.classList.remove('active');
}

const draw = (array, colors_) => {

    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800
    canvas.height = 500
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = canvas.width / array.length;

    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = colors_[i];
        ctx.fillRect(i * width, 0, width - 2, array[i]);
    }
}

const updateArray = (arraySize) => {
    array = [];
    colors = [];
    for (let i = 0; i < arraySize; i++) {
        array.push((2 + Math.floor(Math.random() * 60)) * 4);
        colors.push('#039BE5');
    }
    draw(array, colors);
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const bubbleSort = async (array, speed) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = array.length - 1; j >= 0 + i; j--) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                const tempColor = Array.from(colors);
                tempColor[j] = '#FF5252';
                tempColor[j + 1] = '#FF5252';
                draw(array, tempColor);
            } else {
                const tempColor = Array.from(colors);
                tempColor[j] = '#52FF52';
                tempColor[j + 1] = '#52FF52';
                draw(array, tempColor);
            }
            await sleep(speed * 0.4);
        }
        colors[i] = '#888';
    }
}

const insertionSort = async (array, speed) => {

    for (let i = 1; i < array.length; i++) {
        let j = i - 1;
        let temp = array[i];
        while (j >= 0 && array[j] > temp) {
            array[j + 1] = array[j];
            j--;

            const tempColor = Array.from(colors);
            tempColor[i] = '#52FF52';
            tempColor[j] = '#52FF52';

            draw(array, tempColor);

            await sleep(speed * 0.4);
        }

        array[j + 1] = temp;

        const tempColor = Array.from(colors);
        tempColor[i] = '#FF5252';
        tempColor[j] = '#FF5252';

        draw(array, tempColor);

        await sleep(speed * 0.4);

        colors[i - 1] = '#888';
        colors[i] = '#888';

        draw(array, colors);

    }
    colors[colors.length - 1] = '#888';
    draw(array, colors);

    await sleep(speed * 0.4);
}

const selectionSort = async (array, speed) => {
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {

            if (array[j] < array[min]) {
                const tempColor = Array.from(colors);
                tempColor[j] = '#FF5252';
                tempColor[min] = '#FF5252';

                draw(array, tempColor);

                min = j;
            } else {
                const tempColor = Array.from(colors);
                tempColor[j] = '#52FF52';
                tempColor[min] = '#52FF52';

                draw(array, tempColor);

            }

            await sleep(speed * 0.4);
        }
        colors[i] = '#888';
        let temp = array[i];
        array[i] = array[min];
        array[min] = temp;
    }
}


const mergeSort = async (array, start, end) => {
    if ((end - start) <= 1) return array.slice(start, end);

    const middle = Math.floor(start + (end - start) / 2);
    const left = await mergeSort(array, start, middle);
    const right = await mergeSort(array, middle, end);
    console.log(left, right);
    console.log(start, middle, middle, end);

    const result = await merge(left, right);

    return result;
}

const merge = async (left, right) => {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]) {
            result.push(left[indexLeft++]);
        } else {
            result.push(right[indexRight++]);
        }
    }

    const leftArray = left.slice(indexLeft);
    const rightArray = right.slice(indexRight);

    result = result.concat(leftArray).concat(rightArray);

    return result;
}