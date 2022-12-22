function updateTableDOM(pos, axis, axisLength) {
    const tableContainerCSS = document.getElementsByClassName('table-container')[0].classList
    
    if(tableContainerCSS.contains('hide')) {
        tableContainerCSS.toggle('hide');
    }

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


