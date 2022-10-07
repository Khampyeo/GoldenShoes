fetch('data/shoes.json')
    .then(response => response.json())
    .then(data => {
        data.shoes.forEach(element => {
            element.quantity = 0;
        })
        if (JSON.parse(localStorage.getItem("list_shoes")) == null) {

            localStorage.setItem("list_shoes", JSON.stringify(data.shoes));
        }

    })
    .then(() => {
        data = JSON.parse(localStorage.getItem("list_shoes"));
        render(data);
        load_cart();
        contentChanged();
        sumPrice(data);
    });







function render(data) {
    let list_item = document.querySelector(".list-product");
    let content = ""
    data.forEach(element => {
        content += `
        <li class="item" id="item-${element.id}">
            <div class="item-img" style="background-color: ${element.color}">
                <img src=${element.image}
                    alt="">
            </div>
            <h1 class="item-title">${element.name}</h1>
            <p class="item-sub">${element.description}</p>
                <div class="item-wrap">
                <p class="item-price">$${element.price}</p>
                <button class="add-to-cart " onclick="addcart(${element.id})">ADD TO CART
                </button>
                <div class = "check-icon" >
                <img src="/assets/img/check.png" alt="">
                </div>
            </div>
        </li>
`
    });
    list_item.innerHTML = content;
}


function renderCart(data, id) {
    var cart_list = document.querySelector('.item_list-cart');
    var cart_item = document.createElement('div');
    cart_item.classList.add('cart-item');
    cart_item.setAttribute('id', `item-${id}`);
    content = '';
    content = `
                        <div class="cart-img" style="background-color : ${data[id - 1].color} ;">
                        <img src="${data[id - 1].image}" alt="">

                        </div>
                        <div class="cart-wrap">
                            <p class="cart-title">${data[id - 1].name}</p>
                            <p class="cart-price">$${data[id - 1].price}</p>
                            <div class="cart-wrap-child">
                                <div class="num-item">
                                    <div class="subtract-item" onclick="subtract_quantity(${id})">
                                    <img src="/assets/img/minus.png" alt="" height="8" width="8">
                                    </div>
                                    <span style="margin:0px 14px ; font-size: 14px;">${data[id - 1].quantity}</span>
                                    <div class="add-item" onclick="add_quantity(${id})">
                                    <img src="/assets/img/plus.png" alt="" height="8" width="8">
                                    </div>
                                </div>
                                <div class="remove-item" onclick ="remove_cart(${id})">
                                <img src="/assets/img/trash.png" alt="" height="16" width="16">
                                </div>
                            </div>
                        </div>
    `
    cart_item.innerHTML = content;
    cart_list.appendChild(cart_item);

    var addBtn = document.querySelector('#item-' + id + ' .add-to-cart');
    var check = document.querySelector('#item-' + id + ' .check-icon');
    addBtn.style.display = 'none';
    check.style.display = 'flex';
}


function addcart(id) {
    data[id - 1].quantity = 1;
    localStorage.setItem("list_shoes", JSON.stringify(data));
    renderCart(data, id);
    sumPrice(data);

}

function load_cart() {
    data = JSON.parse(localStorage.getItem('list_shoes'));
    data.forEach(element => {
        if (element.quantity > 0) {
            renderCart(data, element.id);
        }
    })
}

function remove_cart(id) {
    var item_remove = document.querySelector(".item_list-cart #item-" + id);
    data[id - 1].quantity = 0;
    localStorage.setItem("list_shoes", JSON.stringify(data));
    var addBtn = document.querySelector('#item-' + id + ' .add-to-cart');
    var check = document.querySelector('#item-' + id + ' .check-icon');
    addBtn.style.display = 'block';
    check.style.display = 'none';
    sumPrice(data);
    item_remove.style.animation = 'ScaleIn 0.5s ease-in'
    setTimeout(function () { item_remove.remove() }, 500)

}

function add_quantity(id) {
    var num = data[id - 1].quantity;
    var quantity = document.querySelector(".item_list-cart #item-" + id + " span");
    num++;
    quantity.innerHTML = num;
    data[id - 1].quantity = num;
    localStorage.setItem("list_shoes", JSON.stringify(data));
    sumPrice(data);

}
function subtract_quantity(id) {
    var num = data[id - 1].quantity;
    var quantity = document.querySelector(".item_list-cart #item-" + id + " span");
    num--;
    if (num > 0) {

        quantity.innerHTML = num;
        data[id - 1].quantity = num;
        localStorage.setItem("list_shoes", JSON.stringify(data));
    }
    else {
        quantity.innerHTML = 0;
        remove_cart(id);
    }
    sumPrice(data);

}

function sumPrice(data) {
    sum = 0;
    data.forEach(element => {
        sum += element.price * element.quantity;
    })
    var price = document.querySelector('.your-cart .card-price');
    price.innerHTML = '$' + sum.toFixed(2);
}

var myElement = document.querySelector('.your-cart .item_list-cart');
if (window.addEventListener) {
    myElement.addEventListener('DOMSubtreeModified', contentChanged, false);
}
function contentChanged() {
    var itemcheck = document.querySelector('.your-cart .cart-item');
    var emty = document.querySelector('.emty-cart')
    if (itemcheck == null) {
        emty.innerHTML = "your cart is empty.";
    }
    else {
        emty.innerHTML = '';
    }
}

