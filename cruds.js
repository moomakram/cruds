let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let submit = document.querySelector('.submit');

let mood = 'create';
let tmp;

// Get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

// Create product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        ads: ads.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (
        title.value != '' &&
        price.value != '' &&
        category.value != '' &&
        newPro.count < 100
    ) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    datapro.push(newPro);
                }
            } else {
                datapro.push(newPro);
            }
        } else {
            datapro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }

        clearData();
        localStorage.setItem('product', JSON.stringify(datapro));
        showData();
    }
};

// Clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Read
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
       <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].count}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
      </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deletAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `
      <button onclick='deleteAll()'>Delete All (${datapro.length})</button>
    `;
    } else {
        btnDelete.innerHTML = '';
    }
}
showData();

// Delete one
function deletData(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}

// Delete all
function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showData();
}

// Update
function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    ads.value = datapro[i].ads;
    taxes.value = datapro[i].taxes;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
}

// Search
let searchMod = 'title';
function getSearchMod(id) {
    if (id === 'searchTitle') {
        searchMod = 'title';
    } else {
        searchMod = 'category';
    }
    search.placeholder = 'Search By ' + searchMod;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (
            (searchMod == 'title' && datapro[i].title.includes(value.toLowerCase())) ||
            (searchMod == 'category' && datapro[i].category.includes(value.toLowerCase()))
        ) {
            table += `
       <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].count}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
      </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
