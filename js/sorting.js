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
            await mergeSort(array, 0, array.length);
            break;

        case 'quick':
            await quickSort(array, 0, array.length - 1);
            break;

        case 'heap':
            await heapSort(array);
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
        ctx.fillRect(i * width, 250 - array[i] / 2, width - 2, array[i]);
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
    await mergeSort(array, start, middle);
    await mergeSort(array, middle, end);

    await merge(array, start, middle, middle, end);


}

const merge = async (array, start1, end1, start2, end2) => {
    let left = array.slice(start1, end1);
    let right = array.slice(start2, end2);
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;


    while (indexLeft < left.length && indexRight < right.length) {

        if (left[indexLeft] < right[indexRight]) {
            result.push({
                value: left[indexLeft],
                index: start1 + indexLeft,
                branch: 'left'
            });

            indexLeft++
        } else {
            result.push({
                value: right[indexRight],
                index: start2 + indexRight,
                branch: 'right'
            });

            indexRight++
        }

    }

    while (indexLeft < left.length) {
        result.push({
            value: left[indexLeft],
            index: start1 + indexLeft,
            branch: 'left'
        });

        indexLeft++
    }

    while (indexRight < right.length) {
        result.push({
            value: right[indexRight],
            index: start2 + indexRight,
            branch: 'right'
        });

        indexRight++
    }

    indexRight = 0;
    let leftLength = left.length;

    for (let i = start1; i < end2; i++) {
        let temp = result[i - start1].value;

        let tmpIndex = i + leftLength;
        const tempColors = Array.from(colors);




        if (i < result[i - start1].index) {
            if (array[i] > array[tmpIndex]) {
                tempColors[i] = '#FF5252';
                tempColors[tmpIndex] = '#FF5252';
            } else {
                tempColors[i] = '#52FF52';
                tempColors[tmpIndex] = '#52FF52';
            }

            await draw(array, tempColors);
            await sleep(speed * 0.8);

            array.splice(result[i - start1].index, 1);
            array.splice(i, 0, temp);
        }

        if (result[i - start1].branch === 'left') {
            leftLength--;
        } else {
            indexRight++;
        }

        if (i < result[i - start1].index) {
            if (array[i] > array[tmpIndex]) {
                tempColors[i] = '#FF5252';
                tempColors[tmpIndex] = '#FF5252';
            } else {
                tempColors[i] = '#52FF52';
                tempColors[tmpIndex] = '#52FF52';
            }
            await draw(array, tempColors);
            await sleep(speed * 0.8);
        }

        if (start1 === 0 && end2 === array.length) colors[i] = '#888';

    }

}

const quickSort = async (array, low, high) => {
    if (low < high) {
        const pivotIndex = await partition(array, low, high);

        await quickSort(array, low, pivotIndex - 1);
        await quickSort(array, pivotIndex + 1, high);
    } {
        colors[low] = '#888';
        colors[high] = '#888';
        await draw(array, colors);
        await sleep(speed * 0.8);
    }
}

const partition = async (array, low, high) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }

        const tempColors = Array.from(colors);

        tempColors[i] = '#cc0';
        tempColors[j] = '#cc0';
        await draw(array, tempColors);
        await sleep(speed * 0.3);
    }


    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    colors[i + 1] = '#888';
    await draw(array, colors);
    await sleep(speed * 0.8);


    return i + 1;
}

const heapSort = async (array) => {
    // Build a max-heap from the array
    await buildMaxHeap(array);

    // Extract elements from the max-heap one by one and place them at the end
    for (let i = array.length - 1; i > 0; i--) {
        // Swap the root (maximum element) with the last element
        [array[0], array[i]] = [array[i], array[0]];

        colors[i] = '#888';
        await draw(array, colors);
        await sleep(speed * 0.4);

        // Call maxHeapify on the reduced heap
        await maxHeapify(array, 0, i);
    }
    colors[0] = '#888';
}

const buildMaxHeap = async (array) => {
    const n = array.length;

    // Build a max-heap by starting from the last non-leaf node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await maxHeapify(array, i, n);

    }
}

const maxHeapify = async (array, i, n) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        // Swap arr[i] and arr[largest]
        [array[i], array[largest]] = [array[largest], array[i]];
        const tempColors = Array.from(colors);
        tempColors[i] = '#ff5252';
        tempColors[largest] = '#ff5252';
        await draw(array, tempColors);
        await sleep(speed * 0.4);


        // Recursively heapify the affected sub-tree
        await maxHeapify(array, largest, n);
    } else {
        const tempColors = Array.from(colors);
        tempColors[i] = '#52ff52';
        await draw(array, tempColors);
        await sleep(speed * 0.4);
    }
}


