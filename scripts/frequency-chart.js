function updateTableDOM(pos, axis, axisLength) {
    document.getElementById(`${axis}pos`).innerHTML = `${pos} | ${axisLength}`;
    
    if(pos < axisLength/3) {
        updateDataRow('0', axis);
    }
    else if(axisLength/3 <= pos && pos < 2*axisLength/3) {
        updateDataRow('1', axis);
    }
    else if(2*axisLength/3 < pos) {
        updateDataRow('2', axis);
    }   
}

function updateDataRow(pos, axis) {
    const num = `${axis}${pos}`;
    document.getElementById(num).innerHTML = Number(document.getElementById(num).innerHTML) + 1;
}


// function scaleToRange (number, inMin, inMax, outMin, outMax) {
//     return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
// }

// axisLength = 225;
// function getPos() {
//     return Math.floor(Math.random() * axisLength);
// }
//    inMin = Math.floor(axisLength/3),                75
//             inMax = Math.floor(2 * axisLength/3),   150
//             outMin = Math.floor(4 * axisLength/10), 90
//             outMax = Math.floor(6 * axisLength/10); 135

// console.clear();
// pos = getPos()
// if (pos < 1/3) {
//     newRange = scaleToRange(pos, 0, inMin, 0, outMin);
// }
// if (1/3 <= pos && pos < 2/3) {
//     newRange = scaleToRange(pos, inMin, inMax, outMin, outMax);
// }
// if(2/3 <= pos) {
//     newRange = scaleToRange(pos, inMax, 1, outMax, 1);
// }
// console.log(`current pos: ${pos}, \nnew range: ${newRange}`)