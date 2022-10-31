//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily items.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var itemInput=document.getElementById("new-item");//Add a new item.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteitemHolder=document.getElementById("incomplete-items-list");//ul of #incompleteitems
var completeditemsHolder=document.getElementById("completed-items-list");//completed-items


//New item list item
var createNewitemElement=function(itemString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbox
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    listItem.className='incomplete-items__item item';

    label.innerText=itemString;
    label.className='item__label';

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className='item__checkbox';

    editInput.type="text";
    editInput.className="item__input";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="item__button button button__edit";

    deleteButton.className="item__button button button__delete";

    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className = "item__img";
    deleteButtonImg.alt = "Remove button";

    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var additem=function(){
    console.log("Add item...");
    //Create a new list item with the text from the #new-item:
    if (!itemInput.value) return;
    var listItem=createNewitemElement(itemInput.value);

    //Append listItem to incompleteitemHolder
    incompleteitemHolder.appendChild(listItem);
    binditemEvents(listItem, itemCompleted);

    itemInput.value="";

}

//Edit an existing item.

var edititem=function(){
    console.log("Edit item...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.item__input');
    var label=listItem.querySelector(".item__label");
    var editBtn=listItem.querySelector(".button__edit");
    var containsClass=listItem.classList.contains("item__edit");
    //If class of the parent is .item__edit
    if(containsClass){

        //switch to .item__edit
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .item__edit on the parent.
    listItem.classList.toggle("item__edit");
};


//Delete item.
var deleteitem=function(){
    console.log("Delete item...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark item completed
var itemCompleted=function(){
    console.log("Complete item...");

    //Append the item list item to the #completed-items
    var listItem=this.parentNode;
    completeditemsHolder.appendChild(listItem);
    binditemEvents(listItem, itemIncomplete);

}


var itemIncomplete=function(){
    console.log("Incomplete item...");
//Mark item as incomplete.
    //When the checkbox is unchecked
    //Append the item list item to the #incompleteitems.
    var listItem=this.parentNode;
    incompleteitemHolder.appendChild(listItem);
    binditemEvents(listItem,itemCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the additem function.
addButton.addEventListener("click",additem);
addButton.addEventListener("click",ajaxRequest);


var binditemEvents=function(itemListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=itemListItem.querySelector(".item__checkbox");
    var editButton=itemListItem.querySelector(".button__edit");
    var deleteButton=itemListItem.querySelector(".button__delete");


    //Bind edititem to edit button.
    editButton.onclick=edititem;
    //Bind deleteitem to delete button.
    deleteButton.onclick=deleteitem;
    //Bind itemCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteitemHolder ul list items
//for each list item
for (var i=0; i<incompleteitemHolder.children.length;i++){

    //bind events to list items chldren(itemsCompleted)
    binditemEvents(incompleteitemHolder.children[i],itemCompleted);
}




//cycle over completeditemsHolder ul list items
for (var i=0; i<completeditemsHolder.children.length;i++){
    //bind events to list items chldren(itemsIncompleted)
    binditemEvents(completeditemsHolder.children[i],itemIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty items.

//Change edit to save when you are in edit mode.