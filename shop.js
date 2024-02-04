let cart = [];

//To see if the page is done loading bcs i used async
if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
}

//added all the code for buttons to this function below cuz the code for buttons will work even if the page is not already loaded 
//Cuz it will wait for event DOMContentLoaded before it  calls the ready function

function ready() {
//page will be already loaded when it gets to this point
    
    // Remove items in the cart
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)           
    }

    //fixing the quantity going minus number error
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    //Adding items to cart
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    //purchase button click
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', validateForm)
}

//clearing the cart after the purchase button clicked
function purchaseClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0]

   updateCartTotal()
   invoice()
  
}

//giving an alert if the for for email,name,num not filled.only if its filled then proceed purchase
function validateForm() {
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var pnum = document.getElementById('pnum').value
    if ((name.trim() == "") || (email.trim() == "") || (pnum.trim() == ""))  {
        alert('Uh Oh! The Boxes should be filled')
    } else {
        localStorage.setItem('userData', JSON.stringify({
            name,
            email,
            pnum
        }));
        purchaseClicked()
    }
    return name
}

//function for removing cart items
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    let title = buttonClicked.parentElement.parentElement.querySelector('.cart-item-title').innerText;
    cart = cart.filter(e => e.title != title);
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart);
    updateCartTotal()
}



//fixing the quantity going minus number error
function quantityChanged(event) {
   var input = event.target
    if (isNaN(input.value) || input.value <=0 ) {
        input.value = 1
    }
    let title = input.dataset.title;
    cart = cart.map(e => {
        if (e.title == title) {    //cite from w3schools.com
            return {
                ...e,
                quantity: parseInt(input.value)
            }
        } else {
            return e;
        }
    })
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTotal()
}

//adding to cart button clicked
function addToCartClicked(event) {

    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}


//configuring added itmes to cart
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
     
    const item = cart.find(e => e.title === title)
    
    //had to get the data as an array because when redirecting to a new page the ways of travelling data would be difficutlt
    if(item) {
        alert('Oops! You have already added this item :)')
        return;
    } else {
        cart.push({
            title,
            price,
            imageSrc,
            quantity: 1
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    console.log(cart);

    // adding the item to cart Used Template String method  https://youtu.be/TMomnNS4VAA
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" data-title="${title}" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents                        
    cartItems.append(cartRow)

    //Re connfiguring the remove cart button n add items because they were added after the eventlistner above
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

//updating cart items
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        //update of cart price and quantity and total
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('£', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    // Fixing the decimal error in total
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
    return total
}
function refreshPage() {
    location.reload();
}

function invoice() {

    var name = document.getElementById('name').value;
    var total = document.getElementsByClassName('cart-total-price')[0].innerHTML;
    var Email=document.getElementById('email').value;
    var mnum=document.getElementById('pnum').value;
    alert("\nName: " + name + 
    "\nEmail: " + Email +
    "\nMobile Number: "+ mnum+ 
    "\n--------------------------" +
    "\nInvoice Details" +
    "\n\n" + "Total Bill:"+ total)
    refreshPage()
 }
 

