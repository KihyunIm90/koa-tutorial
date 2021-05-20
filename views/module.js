var selectBtn = document.getElementById('selectBtn');
var selectId = document.getElementById('selectId');
selectBtn.addEventListener('click', async () => {
    try {
        var id = parseInt(selectId.value);
        var path = '/select';
        console.log(id);
        if (!isNaN(id)) {
            path = path + `?id=${id}`;
        }
        const response = await fetch(path, {
            method: 'get',
        });
        response.text().then(result => {
            alert(result);
        })
    }
    catch (e) {
        alert(e);
    }
})

var insertBtn = document.getElementById('insertBtn');
var insertName = document.getElementById('insertName');
var insertAge = document.getElementById('insertAge');
insertBtn.addEventListener('click', async () => {
    try {
        var age = parseInt(insertAge.value);
        if (isNaN(age)) {
            throw 'Age is not integer!';
        }
        const reqBody = {
            name: insertName.value,
            age: age,
        }
        const response = await fetch('/insert', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reqBody)
        });
        response.text().then(result => {
            alert(result);
        })
    }
    catch (e) {
        alert(e);
    }
})

var updateBtn = document.getElementById('updateBtn');
var updateId = document.getElementById('updateId');
var updateName = document.getElementById('updateName');
var updateAge = document.getElementById('updateAge');
updateBtn.addEventListener('click', async () => {
    try {
        var age = parseInt(updateAge.value);
        if (isNaN(age)) {
            throw 'Age is not integer!';
        }
        var id = parseInt(updateId.value);
        if (isNaN(id)) {
            throw 'ID is not integer!';
        }
        const reqBody = {
            id: id,
            name: updateName.value,
            age: age,
        }
        const response = await fetch('/update', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reqBody)
        });
        response.text().then(result => {
            alert(result);
        })
    }
    catch (e) {
        alert(e);
    }
})

var deleteBtn = document.getElementById('deleteBtn');
var deleteId = document.getElementById('deleteId');
deleteBtn.addEventListener('click', async () => {
    try {
        var id = parseInt(deleteId.value);
        var path = '/delete';
        console.log(id);
        if (!isNaN(id)) {
            path = path + `?id=${id}`;
        }
        else {
            throw 'ID is not integer!'
        }
        const response = await fetch(path, {
            method: 'delete',
        });
        response.text().then(result => {
            alert(result);
        })
    }
    catch (e) {
        alert(e);
    }
})