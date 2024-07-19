let id = document.getElementById('id');
let pname = document.getElementById('pname');
let pri = document.getElementById('pri');
let qua = document.getElementById('qua');

let isEdit = false;
let isIndex;
let storage = [];

const getData = () => {
    let data = JSON.parse(localStorage.getItem('data')) || [];
    storage = [...data];
    displayData();
};

const addData = (event) => {
    event.preventDefault();

    console.log("Add");

    let obj = {
        Id: isIndex ? isIndex : Math.floor(Math.random() * 1000),
        pname: pname.value,
        pri: pri.value,
        qua: qua.value,
    };

    if (isEdit) {
        storage = storage.map((data) => {
            if (data.Id == obj.Id) {
                return obj;
            } else {
                return data;
            }
        });

        isEdit = false;
        isIndex = null;
    } else {
        storage = [...storage, obj];
        console.log("OBJ", obj);
    }

    console.log("Storage", storage);

    displayData();

    localStorage.setItem('data', JSON.stringify(storage));

    pname.value = '';
    pri.value = '';
    qua.value = '';
};

const editData = (id) => {
    console.log("Edit");
    let data = [...storage];

    let single = data.find((d) => d.Id == id);

    if (single) {
        pname.value = single.pname;
        pri.value = single.pri;
        qua.value = single.qua;

        isEdit = true;
        isIndex = id;
    }
};

const deleteData = (id) => {
    console.log("Delete");
    let data = [...storage];
    data = data.filter((data) => data.Id != id);

    storage = [...data];
    localStorage.setItem('data', JSON.stringify(storage));

    displayData();
};

const displayData = () => {
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    storage.forEach((rec) => {
        tbody.innerHTML += `<tr><td>${rec.Id}</td><td>${rec.pname}</td><td>${rec.pri}</td><td>${rec.qua}</td><td><button class="btn btn-primary" onclick="return editData(${rec.Id})">Edit</button>||<button class="btn btn-danger" onclick="return deleteData(${rec.Id})">Delete</button></td></tr>`;
    });
};

getData();