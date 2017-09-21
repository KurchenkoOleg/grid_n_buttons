'use strict';


class MyComponent {
    constructor(options) {
        const elem = options.elem;
        let colNumber = -1;
        let rowNumber = -1;
        let showDelRowButton = false;
        let showDelColButton = false;

        let tblObj = elem.querySelector('.myCompo__table');
        tblObj.addEventListener("mouseover", myTableOnMouseOver);
        tblObj.addEventListener("mouseout", myTableOnMouseOut);
        tblObj.addEventListener("mouseleave", hideButtons);

        let btnAddRowObj = elem.querySelector('.myCompo__btn-add-row');
        btnAddRowObj.addEventListener("click", addRow);

        let btnAddColObj = elem.querySelector('.myCompo__btn-add-col');
        btnAddColObj.addEventListener("click", addCol);

        let btnDelColObj = elem.querySelector('.myCompo__btn-remove-col');
        btnDelColObj.addEventListener("click", deleteCol);
        btnDelColObj.addEventListener("mouseover", () => showDelColButton = true);
        btnDelColObj.addEventListener("mouseout", hideButtons);

        let btnDelRowObj = elem.querySelector('.myCompo__btn-remove-row');
        btnDelRowObj.addEventListener("click", deleteRow);
        btnDelRowObj.addEventListener("mouseover", () => showDelRowButton = true);
        btnDelRowObj.addEventListener("mouseout", hideButtons);


        function addRow() {
            let tblBodyObj = tblObj.tBodies[0];
            let newRow = tblBodyObj.insertRow(tblBodyObj.rows.length);

            for (let cell of tblBodyObj.rows[0].cells) {
                let newCell = newRow.insertCell(cell.cellIndex);
                newCell.innerHTML = (tblBodyObj.rows.length - 1) + ' : ' + newCell.cellIndex;
                newCell.classList.add("myCompo__cell");
            }
        }

        function deleteRow() {
            let tblBodyObj = tblObj.tBodies[0];
            if ((tblBodyObj.rows.length > 1) && (rowNumber >= 0) && (rowNumber < tblBodyObj.rows.length)) {
                tblBodyObj.deleteRow(rowNumber);
            }

            if ((tblBodyObj.rows.length === 1) || (rowNumber >= tblBodyObj.rows.length)) {
                showDelRowButton = false;
                hideDeleteRowBtn();
            }
        }

        function addCol() {
            let tblBodyObj = tblObj.tBodies[0];

            for (let row of tblBodyObj.rows) {
                const newCell = row.insertCell(-1);
                newCell.innerHTML = row.rowIndex + ' : ' + (row.cells.length - 1);
                newCell.classList.add("myCompo__cell");
            }
        }

        function deleteCol() {
            let tblBodyObj = tblObj.tBodies[0];

            for (let row of tblBodyObj.rows) {
                if ((row.cells.length > 1) && (colNumber >= 0) && (colNumber < row.cells.length))
                    row.deleteCell(colNumber);
            }

            if ((tblBodyObj.rows[0].cells.length === 1) || (colNumber >= tblBodyObj.rows[0].cells.length)) {
                showDelColButton = false;
                hideDeleteColBtn();
            }
        }

        function showDeleteRowBtn(cell) {
            btnDelRowObj.style.top = cell.offsetParent.offsetTop + cell.offsetTop;
            if (rowNumber !== cell.parentElement.rowIndex) {
                rowNumber = cell.parentElement.rowIndex;
            }

            showDelRowButton = true;
            btnDelRowObj.hidden = false;
        }

        function hideDeleteRowBtn() {
            if (!showDelRowButton) {
                btnDelRowObj.left = 0;
                rowNumber = -1;
                btnDelRowObj.hidden = true;
            }
        }

        function showDeleteColBtn(cell) {
            btnDelColObj.style.left = cell.offsetParent.offsetLeft + cell.offsetLeft;
            if (colNumber !== cell.cellIndex) {
                colNumber = cell.cellIndex;
            }

            showDelColButton = true;
            btnDelColObj.hidden = false;
        }

        function hideDeleteColBtn() {
            if (!showDelColButton) {
                btnDelColObj.top = 0;
                colNumber = -1;
                btnDelColObj.hidden = true;
            }
        }

        function hideButtons() {
            showDelColButton = false;
            setTimeout(() => hideDeleteColBtn(), 100);

            showDelRowButton = false;
            setTimeout(() => hideDeleteRowBtn(), 100);
        }

        function myTableOnMouseOver(event) {
            const cell = event.target;

            if (cell.classList.contains('myCompo__cell')) {
                let colIndex = cell.cellIndex;
                let rowIndex = cell.parentElement.rowIndex;

                let tblBodyObj = cell.parentElement.parentElement.parentElement.tBodies[0];
                if ((tblBodyObj.rows[0].cells.length > 1) && (colIndex >= 0) && (colIndex < tblBodyObj.rows[0].cells.length)) {
                    showDeleteColBtn(cell);
                }

                if ((tblBodyObj.rows.length > 1) && (rowIndex >= 0) && (rowIndex < tblBodyObj.rows.length)) {
                    showDeleteRowBtn(cell);
                }
            }
        }

        function myTableOnMouseOut(event) {
            const cell = event.target;
            if (cell.classList.contains('myCompo__cell')) {
                hideButtons();
            }
        }
    }
}