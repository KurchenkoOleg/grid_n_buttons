'use strict';
const INIT_ROWS = 4;
const INIT_COLS = 4;
const ID_COMPO_ROOT = 'MyCompoRoot';
const ID_COMPO_TABLE = 'MyCompoTable';
const ID_COMPO_ADD_COL_BTN = 'MyCompoDeleteRowBtn';
const ID_COMPO_DEL_COL_BTN = 'MyCompoDeleteColBtn';

function initMyComponents(classNameOfParentElement)
{
	var parentElements = document.getElementsByClassName(classNameOfParentElement);
	
	for (let id = 0; id < parentElements.length; id++) {
		let element = parentElements[id];

		let baseDivObj = document.createElement('div');
		baseDivObj.classList.add("block-base");
		baseDivObj.id = ID_COMPO_ROOT + id;
		element.appendChild(baseDivObj);	

		let topDivObj = document.createElement('div');
		topDivObj.classList.add("block-base");
		topDivObj.classList.add("block-button-horizontal");
		baseDivObj.appendChild(topDivObj);	
		
		let leftDivObj = document.createElement('div');
		leftDivObj.classList.add("block-base");
		leftDivObj.classList.add("block-button-vertical");
		baseDivObj.appendChild(leftDivObj);	

		let centerDivObj = document.createElement('div');
		centerDivObj.classList.add("block-base");		
		baseDivObj.appendChild(centerDivObj);	
		
		let rightDivObj = document.createElement('div');
		rightDivObj.classList.add("block-base");
		rightDivObj.classList.add("block-button-vertical");
		baseDivObj.appendChild(rightDivObj);	
		
		let bottomDivObj = document.createElement('div');
		bottomDivObj.classList.add("block-base");
		bottomDivObj.classList.add("block-button-horizontal");
		baseDivObj.appendChild(bottomDivObj);		

		let btnObj = document.createElement('button');
		topDivObj.appendChild(btnObj);			
		btnObj.id = ID_COMPO_DEL_COL_BTN + id;
		btnObj.hidden = true;
		btnObj.innerHTML = '-';
		btnObj.classList.add("button");
		btnObj.classList.add("button-remove");
		btnObj.classList.add("button-remove-col");
		btnObj.addEventListener("click", function () {deleteCol(this);});
		btnObj.addEventListener("mouseover", myButtonOnMouseOver);
		btnObj.addEventListener("mouseout", myButtonOnMouseOut);		

		btnObj = document.createElement('button');
		bottomDivObj.appendChild(btnObj);
		btnObj.innerHTML = '+';
		btnObj.classList.add("button");
		btnObj.classList.add("button-fade");
		btnObj.classList.add("button-add");
		btnObj.classList.add("button-add-row");
		btnObj.addEventListener("click", function () {addRow(this);});		

		btnObj = document.createElement('button');
		leftDivObj.appendChild(btnObj);	
		btnObj.id = ID_COMPO_ADD_COL_BTN + id;
		btnObj.hidden = true;
		btnObj.innerHTML = '-';
		btnObj.classList.add("button");
		btnObj.classList.add("button-remove");
		btnObj.classList.add("button-remove-row");
		btnObj.addEventListener("click", function () {deleteRow(this);});
		btnObj.addEventListener("mouseover", myButtonOnMouseOver);
		btnObj.addEventListener("mouseout", myButtonOnMouseOut);		

		btnObj = document.createElement('button');
		rightDivObj.appendChild(btnObj);		
		btnObj.innerHTML = '+';
		btnObj.classList.add("button");
		btnObj.classList.add("button-fade");
		btnObj.classList.add("button-add");
		btnObj.classList.add("button-add-col");
		btnObj.addEventListener("click", function () {addCol(this);});		
		
		let tblObj = document.createElement('table');
		tblObj.id = ID_COMPO_TABLE + id;
		tblObj.classList.add("myTable");
		centerDivObj.appendChild(tblObj);	
		tblObj.addEventListener("mouseover", myTableOnMouseOver);
		tblObj.addEventListener("mouseout", myTableOnMouseOut);
		tblObj.addEventListener("mouseleave", myTableOnMouseLeave);
	
		let tblBodyObj = document.createElement('tbody');
		tblObj.appendChild(tblBodyObj);
		
		for (let i=0; i<INIT_ROWS; i++) {
			let newRow = tblBodyObj.insertRow(-1);
			for (let j=0; j<INIT_COLS; j++) {
				let newCell = newRow.insertCell(j);
				newCell.innerHTML = (tblBodyObj.rows.length - 1) + ' : ' + j;
				newCell.classList.add("mycell");
			}
		}	
	}
}

function getComponentId(element)
{	
	var rootObj = null;
	var parent = element.parentElement;
	while(parent != null)
	{
		if (parent.id.startsWith(ID_COMPO_ROOT))
		{
			return parent.id.replace(ID_COMPO_ROOT, '');
		}
		else
		{
			parent = parent.parentElement;			
		}
	}
	return '';	
}

function getElement(elementId, anyCompoElement)
{	
	var id = getComponentId(anyCompoElement);
	if (id != '')
	{			
		return document.getElementById(elementId + id);
	}
	else
	{
		return null;
	}
}

function addRow(btnObj)
{	
	var tblObj = getElement(ID_COMPO_TABLE, btnObj);
	if (tblObj != null)
	{
		let tblBodyObj = tblObj.tBodies[0];	
		let newRow = tblBodyObj.insertRow(tblBodyObj.rows.length);
	
		for (let cell of tblBodyObj.rows[0].cells){
			let newCell = newRow.insertCell(cell.cellIndex);			
			newCell.innerHTML = (tblBodyObj.rows.length - 1) + ' : ' + newCell.cellIndex;
			newCell.classList.add("myTable");
			newCell.classList.add("mycell");
		}
	}
} 

function deleteRow(btnObj)
{
	var tblObj = getElement(ID_COMPO_TABLE, btnObj);
	if (tblObj != null)
	{
		let index = btnObj.getAttribute('rowNo');
				
		let tblBodyObj = tblObj.tBodies[0];
		if ((tblBodyObj.rows.length > 1) && (index >= 0) && (index < tblBodyObj.rows.length))
		{			
			tblBodyObj.deleteRow(index);
		}
		
		if ((tblBodyObj.rows.length == 1) || (index >= tblBodyObj.rows.length))
		{
			btnObj.removeAttribute('showButton');	
			btnObj.classList.remove('button-fade');	
			hideDeleteRowBtn(btnObj);
		}		
	}	
} 
	  
function addCol(btnObj)
{
	var tblObj = getElement(ID_COMPO_TABLE, btnObj);
	if (tblObj != null)
	{
		let tblBodyObj = tblObj.tBodies[0];
		
		for (let row of tblBodyObj.rows) {
			var newCell = row.insertCell(-1);
			newCell.innerHTML = row.rowIndex + ' : ' + (row.cells.length - 1);
			newCell.classList.add("myTable");
			newCell.classList.add("mycell");
		}
	}	
}  

function deleteCol(btnObj)
{
	var tblObj = getElement(ID_COMPO_TABLE, btnObj);
	if (tblObj != null)
	{
		let tblBodyObj = tblObj.tBodies[0];
		let index = btnObj.getAttribute('colNo');
			
		for (let row of tblBodyObj.rows) {
		if ((row.cells.length > 1) && (index >= 0) && (index < row.cells.length))
			row.deleteCell(index);
		}
		
		if ((tblBodyObj.rows[0].cells.length == 1) || (index >= tblBodyObj.rows[0].cells.length))
		{
			btnObj.removeAttribute('showButton');	
			btnObj.classList.remove('button-fade');	
			hideDeleteColBtn(btnObj);
		}		
	}	
}	  

function showDeleteRowBtn(cell){
	var btnObj = getElement(ID_COMPO_ADD_COL_BTN, cell);
	if (btnObj != null)
	{	
		btnObj.style.top = cell.offsetTop;
		if (btnObj.getAttribute('rowNo') != cell.parentElement.rowIndex)
		{
			btnObj.setAttribute('rowNo', cell.parentElement.rowIndex);
			btnObj.classList.remove('button-fade');	
		}
		
		btnObj.setAttribute('showButton', '1');	
		btnObj.hidden = false;
	}
}

function hideDeleteRowBtn(cell){
	var btnObj = getElement(ID_COMPO_ADD_COL_BTN, cell);
	if (btnObj != null)
	{	
		if (!btnObj.getAttribute('showButton'))
		{			
			btnObj.left = 0;
			btnObj.setAttribute('colNo', '');	
			btnObj.hidden = true;
		}
	}
}

function showDeleteColBtn(cell){
	var btnObj = getElement(ID_COMPO_DEL_COL_BTN, cell);
	if (btnObj != null)
	{	
		let tblObj = getElement(ID_COMPO_TABLE, btnObj);
		if (tblObj != null)
		{
			btnObj.style.left = cell.offsetLeft;
			if (btnObj.getAttribute('colNo') != cell.cellIndex)
			{
				btnObj.setAttribute('colNo', cell.cellIndex);
				btnObj.classList.remove('button-fade');	
			}
			
			btnObj.setAttribute('showButton', '1');	
			btnObj.hidden = false;
		}
	}
}

function hideDeleteColBtn(cell){
	var btnObj = getElement(ID_COMPO_DEL_COL_BTN, cell);
	if (btnObj != null)
	{
		if (!btnObj.hasAttribute('showButton'))
		{
			btnObj.top = 0;
			btnObj.setAttribute('rowNo', '');
			btnObj.hidden = true;
		}
	}
}		

function hideButtons(element) {
	let btnObj = getElement(ID_COMPO_DEL_COL_BTN, element);
	if (btnObj != null)
	{
		btnObj.removeAttribute('showButton');	
	}
	
	btnObj = getElement(ID_COMPO_ADD_COL_BTN, element);
	if (btnObj != null)
	{
		btnObj.removeAttribute('showButton');	
	}	
	
	hideButtonsDelayed(element);	
}

function hideButtonsDelayed(element) {
	setTimeout(function() {
		hideDeleteColBtn(element);      
	}, 100);
	setTimeout(function() {
		hideDeleteRowBtn(element);
	}, 100);
}
 
function myTableOnMouseOver(event) {
	var cell = event.target;
	var colIndex = cell.cellIndex;
    var rowIndex = cell.parentElement.rowIndex;

	if ((colIndex != undefined) && (rowIndex != undefined))
	{	
		if (cell.classList.contains('mycell'))
		{	
			let tblBodyObj = cell.parentElement.parentElement.parentElement.tBodies[0];
			if ((tblBodyObj.rows[0].cells.length > 1) && (colIndex >= 0) && (colIndex < tblBodyObj.rows[0].cells.length))
			{
				showDeleteColBtn(cell);
			}
			
			if ((tblBodyObj.rows.length > 1) && (rowIndex >= 0) && (rowIndex < tblBodyObj.rows.length))
			{
				showDeleteRowBtn(cell);
			}
		}
	}	
}

function myTableOnMouseOut(event) {
	var cell = event.target;
	var colIndex = cell.cellIndex;
    var rowIndex = cell.parentElement.rowIndex;

	if ((colIndex != undefined) && (rowIndex != undefined))
	{	
		hideButtons(event.target);
	}
}
	
function myTableOnMouseLeave(event) {
	hideButtons(event.target);
}

function myButtonOnMouseOver(event) {
	var btnObj = event.target;
	btnObj.classList.add('button-fade');
	btnObj.setAttribute('showButton', '1');	
}

function myButtonOnMouseOut(event) {
	var btnObj = event.target;
	btnObj.removeAttribute('showButton');	
	hideButtonsDelayed(event.target);	
} 