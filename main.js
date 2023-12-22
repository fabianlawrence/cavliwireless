var cart = []

var cartLength = 0;
// var cartLength = cart.length

var nameContainer = document.getElementById('cart-button');
var cartButtonI = document.getElementById('cart-button-i')

const data = [{id:1,productname:" C10GS -A1",rot:["APAC"],esim:true,ff:["M.2","MiniPCI","LGA"]},{id:2,productname:" C10GS -A2",rot:["APAC"],esim:true,ff:["M.2","LGA"]},{id:3,productname:" C10GS -A3",rot:["APAC","NAM"],esim:false,ff:["MiniPCI","LGA"]},{id:4,productname:" C10GS -A4",rot:["APAC","SAM"],esim:true,ff:["M.2","MiniPCI","LGA"]},{id:5,productname:" C10GS -A5",rot:["NUM","SAM","EU","GLOBAL"],esim:false,ff:["M.2","MiniPCI","LGA"]}]

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
    temp = []
    for (var i = 0; i < data.length; i++) {
        if(type === 'esim'){
            if(val == 'true'){
                if (data[i].esim == true){
                    console.log(val, "first")
                    // products.push(data[i]);
                    temp.push(data[i])
                }
            }else if(val == 'false') {
                if (data[i].esim == false){
                    console.log("second")
                    // products.push(data[i]);
                    temp.push(data[i])
                }
            }
        }else {
            for (var j = 0; j < data[i][type].length; j++){
                console.log(val, "vall", data[i][type][j])
                if(data[i][type][j] === val) {
                    // products.push(data[i]);
                    temp.push(data[i])
                }
            }
        }
    }
    if(temp){
        // modalData(products)
        return temp
    }
}

function clear(clearData){
    for (let i = 0; i < clearData.length; i++) {
        console.log(clearData[i]['id'], "clearing .....")
        const p = document.getElementById(`${clearData[i]['id']}-tr`);
        p.remove()
    }
  }


function searchProductsCategory(selectTypes){
    if (selectTypes.length === 1) {
        for (var i = 0; i < selectTypes.length; i++){
            if (selectTypes[i]['region']){
                console.log(selectTypes[i]['region'], "region")
                let searchProductVal = searchProduct('rot', selectTypes[i]['region'])
                if (searchProductVal) {
                    products = searchProductVal
                }
            }
            if (selectTypes[i]['esim']){
                console.log(selectTypes[i]['esim'], "esim")
                let searchProductVal = searchProduct('esim', selectTypes[i]['esim'])
                if  (searchProductVal){
                    products = searchProductVal
                }
            }
            if (selectTypes[i]['formFactor']){
                console.log(selectTypes[i]['formFactor'], "formFactor")
                let searchProductVal = searchProduct('ff', selectTypes[i]['formFactor'])
                if (searchProductVal){
                    products = searchProductVal
                }
            }
        }
        modalData(products)
    }
    else if (selectTypes.length === 2) {
        clear(products)
        console.log('clearing products....')
        for (var i = 0; i < selectTypes.length; i++){
            // let temp_flag = false
            if (selectTypes[i]['region'] && selectTypes[i+1]['esim']){
                console.log(selectTypes[i]['region'], "region")
                let searchProductVal = searchProduct('rot', selectTypes[i]['region'])
                console.log(searchProductVal)
                for (var j = 0; j < products.length; j++){
                    if(products[i]['esim'] === selectTypes[i+1]['esim']){
                        // products.push(searchProductVal[0])
                        console.log(products[i]['esim'], selectTypes[i+1]['esim'], 'find')
                    }else {
                        let index = products.findIndex((id) => id === products.id)
                        delete products[index]
                    }
                }
            }
            // else if (selectTypes[i]['esim']){
            //     console.log(selectTypes[i]['esim'], "esim")
            //     let searchProductVal = searchProduct('esim', selectTypes[i]['esim'])
            //     if  (searchProductVal){
            //         products.push(searchProductVal[0])
            //         if(flag1){
            //             flag2 = true
            //         }
            //         flag1 = true
            //     }else {
            //         flag1 = false
            //     }
            // }
            // else if (selectTypes[i]['formFactor']){
            //     console.log(selectTypes[i]['formFactor'], "formFactor")
            //     let searchProductVal = searchProduct('ff', selectTypes[i]['formFactor'])
            //     if (searchProductVal){
            //         products.push(searchProductVal[0])
            //         if(flag1){
            //             flag2 = true
            //         }
            //         flag1 = true
            //     } else {
            //         flag1 = false
            //     }
            // }
        }

        // if (flag1 && flag2) {
        modalData(products)
        // }
    }
}

var selectFormTypes = []

var selectRegion = document.getElementById('region')
var selectEsim = document.getElementById('esim')
var selectFormFactor = document.getElementById('form-factor')

selectRegion.addEventListener('change', function() {
    console.log('Value changed:', selectRegion.value);
    let temp = {}

    let formType = selectFormTypes.filter(function(data){
    return data.hasOwnProperty('region')})
    console.log(formType)

    if (formType.length !== 0){
        console.log(formType)
        let index = selectFormTypes.findIndex((id) => id === formType.id)
        // temp['region'] = selectRegion.value
        console.log(index, "index")
        selectFormTypes[index + 1]['region'] = selectRegion.value
        clear(products)

        // selectFormTypes.push(temp)
        searchProductsCategory(selectFormTypes)     
    }else{
        console.log("cathig....")
        temp['region'] = selectRegion.value
        selectFormTypes.push(temp)
        searchProductsCategory(selectFormTypes)
    }
    console.log(products)
    console.log(selectFormTypes)

  });

selectEsim.addEventListener('change', function() {
    console.log('Value changed:', selectEsim.value);
    let temp = {}
    let formType = selectFormTypes.filter(function(data){
        return data.hasOwnProperty('esim')})
        console.log(formType)
    
        if (formType.length !== 0){
            console.log(formType)
            let index = selectFormTypes.findIndex((id) => id === formType.id)
            // temp['region'] = selectRegion.value
            console.log(index, "esim")
            selectFormTypes[index + 1]['esim'] = selectEsim.value
            clear(products)
    
            // selectFormTypes.push(temp)
            searchProductsCategory(selectFormTypes)     
        }else{
            console.log("cathig....")
            temp['esim'] = selectEsim.value
            selectFormTypes.push(temp)
            searchProductsCategory(selectFormTypes)
        }
    // temp['esim'] = selectEsim.value
    // selectFormTypes.push(temp)
    console.log(products)
    console.log(selectFormTypes)
  });

selectFormFactor.addEventListener('change', function() {
    console.log('Value changed:', selectFormFactor.value);
    let temp = {}
    let formType = selectFormTypes.filter(function(data){
    return data.hasOwnProperty('formFactor')})
    console.log(formType)

    if (formType.length !== 0){
        console.log(formType)
        let index = selectFormTypes.findIndex((id) => id === formType.id)
        // temp['region'] = selectRegion.value
        console.log(index, "formFactor")
        selectFormTypes[index + 1]['formFactor'] = selectFormFactor.value
        clear(products)

        // selectFormTypes.push(temp)
        searchProductsCategory(selectFormTypes)     
    }else{
        console.log("cathig....")
        temp['formFactor'] = selectFormFactor.value
        selectFormTypes.push(temp)
        searchProductsCategory(selectFormTypes)
    }
    console.log(products)
    console.log(selectFormTypes)
    // searchProductsCategory(selectFormTypes)
  });


function modalData(loopData) {
    var cartModal = document.getElementById('product-table');
    for (let i = 0; i < loopData.length; i++) {
        var tableTr = document.createElement('tr')
        cartModal.appendChild(tableTr)
        tableTr.setAttribute('id', `${loopData[i]['id']}-tr`)
        tableTr.setAttribute('class', 'm-2')
        let productName = document.createElement("td");
        tableTr.appendChild(productName);
        productName.setAttribute('id', `${loopData[i]['id']}-product-name`)
        console.log(loopData[i]['productname'], "pridcut name");
        productName.innerText = loopData[i]['productname'];

        let reg_Char = ""
        for (let index = 0; index < loopData[i]['rot'].length; index++){
            reg_Char += `${loopData[i]['rot'][index]} `
        }

        let productRegion = document.createElement("td");
        tableTr.appendChild(productRegion)
        productRegion.innerHTML = reg_Char

        let productEsim = document.createElement("td");
        tableTr.appendChild(productEsim)
        productEsim.innerHTML = loopData[i]['esim']

        let ff_Char = ""
        for (let index = 0; index < loopData[i]['ff'].length; index++){
            ff_Char += `${loopData[i]['ff'][index]} `
        }

        let productFormFactor = document.createElement("td");
        tableTr.appendChild(productFormFactor)
        productFormFactor.innerHTML = loopData[i]['ff']

        let productQntButtonTd = document.createElement("td");
        tableTr.appendChild(productQntButtonTd)
        let productQntButton = document.createElement("button");
        productQntButtonTd.appendChild(productQntButton)
        productQntButtonTd.setAttribute('class', 'btn btn-secondary')
        productQntButtonTd.innerHTML = 'Pre Order'
    }
}


