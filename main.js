var cart = []

var cartLength = 0;
// var cartLength = cart.length

var nameContainer = document.getElementById('cart-button');
var cartButtonI = document.getElementById('cart-button-i')

const data = [{id:1, productname:" C42GM -A1",rot:["APAC"], esim:true, ff:["M.2, MiniPCI, LGA"]},{id:2,productname:" C42GM -A3",rot:["APAC"],esim:true,ff:["M.2, MiniPCI, LGA"]},{id:3,productname:" C42GM -A3",rot:["APAC","NAM"],esim:false,ff:["M.2, MiniPCI, LGA"]},{id:4,productname:" C42GM -A4",rot:["APAC","SAM"],esim:true,ff:["M.2, MiniPCI, LGA"]},{id:5,productname:" C42GM -A5",rot:["NAM","SAM","EU","GLOBAL"],esim:false,ff:["M.2, MiniPCI, LGA"]}]

function addToCart(id) {
    let item = data.find((item)=> item.id == id);
    cart.push(item)
    console.log(cart)
    cartButtonI.innerHTML = cart.length
}

var nameContainer = document.getElementById('parent-container');

for (var i = 0; i < data.length; i++) {

    var nameParagraph = document.createElement('div');
    nameContainer.appendChild(nameParagraph);
    nameParagraph.setAttribute("id", `${i}-sub-parent`);
    nameParagraph.setAttribute("class", `col-4`);

    var subParentOne = document.createElement('div');
    nameParagraph.appendChild(subParentOne)
    subParentOne.setAttribute("class", `card`);

    var subParent = document.createElement('div');
    subParentOne.appendChild(subParent)
    nameParagraph.setAttribute("id", `${i}-sub-parent-child`);
    subParent.setAttribute("class", `card-body`);

    var img = document.createElement('img');
    subParent.appendChild(img)
    img.setAttribute('src', `img/1.png`)

    var productName = document.createElement('p')
    subParent.appendChild(productName)
    productName.innerHTML = data[i].productname;
    productName.setAttribute('class', "card-text")
    productName.setAttribute('style', "color: #506979;")

    let ff_Char = ""
    for (let index = 0; index < data[i].ff.length; index++){
        ff_Char += data[i].ff[index]
    }

    var ff_span = document.createElement('span')
    subParent.appendChild(ff_span)
    ff_span.setAttribute('class','border border-primary border-3 rounded-pill p-1')
    ff_span.setAttribute('style', "border-color: #334bff; font-size: x-small;")

    var elementBr = document.createElement('br')
    subParent.appendChild(elementBr)
    var elementBrTwo = document.createElement('br')
    subParent.appendChild(elementBrTwo)

    var addToCartButton = document.createElement('button')
    subParent.appendChild(addToCartButton)
    // addToCartButton.setAttribute('onClick', `addToCart(${data[i].id})`)
    addToCartButton.setAttribute('style', `background-color: #5266ff;`)
    addToCartButton.setAttribute('class', 'btn text-white')
    addToCartButton.setAttribute('style', `background-color: #5266ff;`)
    addToCartButton.setAttribute('data-bs-toggle', `modal`)
    addToCartButton.setAttribute('data-bs-target', `#modal`)

    var cartIcon = document.createElement('i')
    cartIcon.setAttribute('class', 'bi bi-cart')
    addToCartButton.appendChild(cartIcon)
    var strong = document.createElement('strong')
    strong.innerHTML = "Add to Cart"
    addToCartButton.appendChild(strong)

}

var products = []


function searchProduct(type, val) {
    for (var i = 0; i < data.length; i++) {
        console.log(val, "first")
        if(type === 'esim'){
            if(val === 'true'){
                // if(data[i][type]){
                products.push(data[i]);
                // }
            }else {
                products.push(data[i]);
            }
        }else {
            for (var j = 0; j < data[i][type].length; j++){
                console.log(val, "vall")
                if(data[i][type][j] === val) {
                    products.push(data[i]);
                }
            }
        }
    }
}


function searchProductsCategory(selectTypes){
    for (var i = 0; i < selectTypes.length; i++){
        if (selectTypes.length === 1) {
            if (selectTypes[i]['region']){
                console.log(selectTypes[i]['region'], "region")
                searchProduct('rot', selectTypes[i]['region'])
            }
            if (selectTypes[i]['esim']){
                console.log(selectTypes[i]['esim'], "esim")
                searchProduct('esim', selectTypes[i]['esim'])
            }
            if (selectTypes[i]['formFactor']){
                console.log(selectTypes[i]['formFactor'], "formFactor")
                searchProduct('ff', selectTypes[i]['formFactor'])
            }
        }
    }
}

var selectFormTypes = []

var selectRegion = document.getElementById('region')
var selectEsim = document.getElementById('esim')
var selectFormFactor = document.getElementById('form-factor')

selectRegion.addEventListener('change', function() {
    clear();
    console.log('Value changed:', selectRegion.value);
    let temp = {}
    temp['region'] = selectRegion.value
    selectFormTypes.push(temp)
    console.log(products)
    console.log(selectFormTypes)

    searchProductsCategory(selectFormTypes)
  });

selectEsim.addEventListener('change', function() {
    console.log('Value changed:', selectEsim.value);
    let temp = {}
    temp['esim'] = selectEsim.value
    selectFormTypes.push(temp)
    console.log(products)
    console.log(selectFormTypes)

    searchProductsCategory(selectFormTypes)
  });

selectFormFactor.addEventListener('change', function() {
    console.log('Value changed:', selectFormFactor.value);
    let temp = {}
    temp['formFactor'] = selectFormFactor.value
    selectFormTypes.push(temp)
    console.log(products)
    console.log(selectFormTypes)
    searchProductsCategory(selectFormTypes)
  });

  var cartModal = document.getElementById('cart-modal');

  for (var i = 0; i < data.length; i++) {
      var p = document.createElement("p");
      p.setAttribute('id',data[i]['id'])
      cartModal.appendChild(p)
      p.innerHTML = data[i]['productname']

  }

  function clear(){
    for (let i = 0; i < data.length; i++) {
        let p = document.getElementById(data[i]['id']);
        element.remove(p)
    }
  }