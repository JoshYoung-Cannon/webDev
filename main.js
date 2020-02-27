let deleteData = (id) => {
    console.log(id);
    let request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:8081/note/" + id);
    request.send();
    request.onload = () => {
        getData();
    }
};

let getData = () => {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8081/note/");
    request.send();
    let readAll;
    // Does the div excist? Create if it doesn't
    if (document.getElementById("readAll")){
        readAll = document.getElementById("readAll");
    }
    else{
        readAll = document.createElement("div");
    }
    readAll.innerHTML="";
    request.onload = () => {
        // convert data
        let data = JSON.parse(request.response);
        // define heading
        let heading = document.createElement('h1');
        heading.className = "title";
        heading.innerText = "Records";
        // add heading to div
        readAll.appendChild(heading);
        // define ul
        let recordList = document.createElement('ul');

        for (let value of data){
            console.log(value.text);
            // define list item with a p and button div
            let record = document.createElement('li');
            let div = document.createElement('div');
            let para = document.createElement('p');
            // assign p text
            para.innerText=value.text;
            // define delete button
            let delButton = document.createElement('button');
            delButton.id = "delButton";
            delButton.innerText = "Delete";
            delButton.addEventListener("click", () => {
                deleteData(value.id)
            });
            // define update button
            let putButton = document.createElement('button');
            putButton.id = "putButton";
            putButton.type = "button";
            putButton.dataToggle = "modal";
            putButton.dataTarget = "#updateScreen";
            putButton.innerText = "Update";
            putButton.addEventListener("click", () => {
                putDataSetUp(value)
            });
            // add p and button to div then add to listitem then to ul
            div.appendChild(para);
            div.appendChild(putButton);
            div.appendChild(delButton);
            record.appendChild(div);
            recordList.append(record);
        }
        // add to html
        readAll.appendChild(recordList);
        document.body.appendChild(readAll);
    }
}

let postData = (event) => {
    event.preventDefault();
    let form = event.target;    
    console.log(form);
    let obj = {};
    for (let input of form){
        if (input.name){
            console.log(input.name);
            console.log(input.value);
            obj[input.name] = input.value;
        }
    }
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8081/note/");
    request.setRequestHeader("Content-Type", "application/json");
    let body = JSON.stringify(obj);
    console.log(body);
    request.send(body);

    request.onload = () => {
        getData();
    }
}

let putDataSetUp = (record) => {
    console.log(record);
    // open model
    record.text = "updated";
    let request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:8081/note/");
    request.setRequestHeader("Content-Type", "application/json");
    let body = JSON.stringify(record);
    console.log(body);
    request.send(body);
    request.onload = () => {
        getData();
    }
}

getData();