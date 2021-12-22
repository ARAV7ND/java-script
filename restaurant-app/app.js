const menuItems = [
    {
        id : 1,
        name : "Chicken biryani",
        price : 250,
        category : "biryani"
    },
    {
        id : 2,
        name : "Gulab Jamun",
        price : 150,
        category : "starters"

    },
    {
        id : 3,
        name :  "Bacon rings",
        price : 180,
        category : "starters"
    },
    {
        id : 4,
        name : "Butter Naan",
        price : 60,
        category : "main"
    },
    {
        id : 5,
        name : "Veg Biryani",
        price : 300,
        category : "biryani"
    },
    {
        id : 6,
        name : "Pizza",
        price : 200,
        category : "main"    
    },
    {
        id : 7,
        name : "Paneer biryani",
        price : 250,
        category : "biryani"
    }
    
];


for(let i=0;i<menuItems.length;i++){
    let menuList = document.getElementsByClassName('menu-items')[0];
    menuList.insertAdjacentHTML("beforeBegin",`
            <div class="item-body" id="item${menuItems[i]['id']}" draggable=true ondragstart="onDragStart(event,${menuItems[i]['id']})"">
                <h2 class="itemName">${menuItems[i]['name']}</h2>
                <p class="itemPrice">${menuItems[i]['price']}</p>
            </div>
  `);

}


const searchForItems = () => {
    let input = document.getElementById('myMenuInput').value.toLowerCase();
    const cards = document.getElementsByClassName("item-body");
    for(let i=0;i<cards.length;i++){
        let itemName = cards[i].querySelector('.item-body h2.itemName');
        if(itemName.innerHTML.toLowerCase().indexOf(input) > -1 || menuItems[i]['category'].toLowerCase().indexOf(input)>-1){
            cards[i].style.display="";
        }else{
            cards[i].style.display="none";
        }

    }

};


const table = [
    {
        id : 1,
        name : "Table-1",
        itemList : new Map(),
        price : 0,
        quantity : 0       
    },
    {
        id : 2,
        name : "Table-2",
        itemList : new Map(),
        price : 0,
        quantity : 0       
    },
    {
        id : 3,
        name : "Table-3",
        itemList : new Map(),
        price : 0,
        quantity : 0       
    }
    
];

//loading tables
    for(let i=0;i<table.length;i++){
        let tableList = document.getElementsByClassName('table')[0];
        tableList.insertAdjacentHTML("beforeBegin",
            `<div class="table-body" id="table${table[i].id}"  ondrop="drop(event)" ondragover="allowDrop(event)"  onclick="orderDetails(event)" 
                        ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondragend="wohoo(event)" onmouseenter="mouseEnter(event)" onmouseleave="mouseLeave(event)">
                <h2 class="tableName">${table[i]['name']}</h2>
                <p id="table-totalPrice${table[i].id}">Total :&nbsp ${table[i]['price']}&nbsp Rs</p>
                <p id="table-totalItems${table[i].id}">No of items : ${table[i]['quantity']} </p>
            </div>`

        );
    }


//search for table    
function searchForTable(){
    let input = document.getElementById('myTableInput').value.toLowerCase(); 
    const table = document.getElementsByClassName("table-body");
    for(let i=0;i<table.length;i++){
        let tableName = table[i].querySelector(".table-body h2.tableName");
        if(tableName.innerHTML.toLowerCase().indexOf(input) > -1){
            table[i].style.display="";
        }else{
            table[i].style.display="none";
        }

    }
}

var selectedItemId;
function onDragStart(ev,id){
    selectedItemId = id;
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
    
}

function dragEnter(ev){
    console.log('enter');
    ev.target.className += ' hovered';
}
function dragLeave(ev){
    ev.target.className = 'table-body';
}

function wohoo(ev){
    console.log("dropped");
}

function mouseEnter(ev){
    ev.target.className += ' hovered';
}
function mouseLeave(ev){
    ev.target.className = 'table-body';
}
function drop(ev){
    ev.preventDefault();
    let tableId = ev.target.id.match(/\d+/g);
    let items = table[tableId-1].itemList;
    console.log(table[tableId-1].itemList.size);
    if(items.size > 0 && items.get(selectedItemId)!=undefined){
        items.set(selectedItemId,items.get(selectedItemId)+parseInt(1));
    }else{
        items.set(selectedItemId,1);
    }
    table[tableId-1]['price'] += menuItems[selectedItemId-1]['price'];
    table[tableId-1]['quantity']++
    document.getElementById("table-totalPrice"+tableId).textContent = "Total : " + table[tableId-1]['price']+" Rs "; 
    document.getElementById("table-totalItems"+tableId).textContent = "No of items :" +table[tableId-1]['quantity'];
}


function orderDetails(ev){

    document.querySelector(".table-details").style.visibility = "visible";
    document.querySelector('body').style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    document.getElementById(ev.target.id).style.backgroundColor="yellow";
    let tableId = ev.target.id.match(/\d+/g); 
    console.log(tableId);
    let header = document.getElementById('order-header');
    header.textContent = `Table-${tableId} | Order Details`;
    renderOrderItems(tableId);
}

function renderOrderItems(tableId){
    if(table[tableId-1].quantity>0){
        let innerHTMLString = "";
        innerHTMLString += 
            `<tr>
                <th>S.No</th>
                <th>Item</th>
                <th>Price</th>
                <th>No of servings</th>
            </tr>`;
        let i = 1;

        for (const [key, value] of table[tableId-1].itemList.entries()) {
            if(i<=table[tableId-1]['itemList'].size){

                innerHTMLString +=`
                <tr>
                    <td>${i}</td>
                    <td>${menuItems[key-1]['name']}</td>
                    <td>${menuItems[key-1]['price']}</td>
                    <td><input type=number id=quantity${key} class="quantity${key}" min=0  value="${value}" onchange="updateQuantity(${tableId},${key})"></td> 
                    <td><img class="trashicon" id="trashicon${key}" onclick="deleteItem('${tableId-1}',${key})" src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"/></td>
                </tr>`; 
                i++;
            }
            document.getElementById("table-items").innerHTML = innerHTMLString;
        }
        document.querySelector('#total-price').textContent = table[tableId-1].price;
    }else{
        document.getElementById("table-items").innerHTML = `<div style="margin : 22px 159px;font-size:25px">Order&nbsp;list&nbsp;is&nbsp;empty</div>`;
        document.querySelector('#total-price').textContent = table[tableId-1].price;
    }
    document.querySelector('.closeButton').id = tableId;
}
function closeTableDetails(ev){
    console.log("closed : ",ev.target.id);
    document.querySelector(".table-details").style.visibility = "hidden";
    document.querySelector('body').style.backgroundColor = "white";
    document.getElementById(`table${ev.target.id}`).style.backgroundColor="inherit";
}
function deleteItem(tableId,itemId){
    console.log(table[tableId]);
    console.log("item : ",itemId,"table : ",tableId);
    console.log(menuItems[itemId-1].name);
    var count = table[tableId].itemList.get(itemId);
    console.log("count : ",count);
    price = menuItems[itemId-1].price;
    table[tableId].price -= price * count;
    table[tableId].quantity -= count;
    console.log("del tapped");
    console.log(table[tableId]);
    table[tableId].itemList.delete(itemId);
    console.log(table[tableId]);
    
    document.getElementById("table-totalPrice"+(parseInt(tableId)+1)).textContent = "Total : " + table[tableId]['price']+" Rs "; 
    document.getElementById("table-totalItems"+(parseInt(tableId)+1)).textContent = "No of items :" +table[tableId]['quantity'];
    renderOrderItems(parseInt(tableId)+1);
}

function updateQuantity(tableId,itemId){
    let newQuantity = document.querySelector(".quantity"+itemId).value;
    console.log(newQuantity);
    if(newQuantity==0){
        console.log(tableId,itemId);
        deleteItem(tableId-1,itemId);

    }
    else{
        let oldQuantity = table[tableId-1].itemList.get(itemId);
        let price = menuItems[itemId-1].price;
        let oldPrice = (oldQuantity*price);
        let newPrice = (newQuantity*price);
        table[tableId-1].price += (newPrice-oldPrice);
        table[tableId-1].quantity += (newQuantity - oldQuantity);
        table[tableId-1].itemList.set(itemId,newQuantity);
    }
    document.getElementById("table-totalPrice"+(parseInt(tableId))).textContent = "Total : " + table[tableId-1]['price']+" Rs "; 
    document.getElementById("table-totalItems"+(parseInt(tableId))).textContent = "No of items :" +table[tableId-1]['quantity'];
    renderOrderItems(parseInt(tableId));
    
}

function generateBill(ev){
    console.log(ev.target.id);
    let bill = document.getElementById("total-price").textContent;
    console.log(bill);
    alert(`Total Bill : ${bill}`,location.reload());
}