let productscontainer=document.getElementById("productscontainer");
let sort=document.getElementById("sort");
let high=document.getElementById("high");
let low=document.getElementById("low");

 function productDetail(id){
    var url = "/productdetail1";
    var data = {productID:id};
    data=JSON.stringify(data);
    var params = {
        method:'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:data
    }
    fetch(url, params).then(response=> response.json())
    .then((data)=>{
        window.location.href = "/detail";
                   
    })
    
    
}
function deleteProduct(id){
    var url = "/deleteProduct";
    var data = {productID:id};
    data=JSON.stringify(data);
    var params = {
        method:'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:data
    }
    fetch(url, params).then(response=> response.json())
    .then((data)=>{
        // window.location.href = "http://localhost:3000/detail";
        window.location.reload(true);
                   
    })
    
    
}


function getProducts(a){
    if(a==undefined)
    {

        
        fetch("/getProducts").then((response)=>{
            return response.text();
        }).then((data)=>{
            let products=JSON.parse(data);
            // console.log(products);
            
            let html=``;
            for(var i=0;i<products.length;i++)
            {
                html+=`<div class="col-lg-3 col-sm-6 col-xs-12 mt-5 mb-4" id="${products[i]._id}">
                <img src="uploads/${products[i].images[0].image}" class="image-fluid products" width="230"  style="cursor: pointer;" height="230" alt="">
                <p class="mt-2 mb-0">${products[i].productName}</p>
                <p class="mt-0 mb-0">₹ ${products[i].price}</p>
                <p class="mt-0 mb-0" style="font-size: 2vh;">Free delievery</p>
                <button class="btn btn-secondary" id="${products[i]._id}">Edit</button>
<button class="btn btn-secondary delete" id="${products[i]._id}">Delete</button>
                
                </div>
                
                `
            }
            productscontainer.innerHTML=html;
            let allproducts=document.querySelectorAll(".products");
            for(var i=0;i<allproducts.length;i++)
            {
                allproducts[i].addEventListener("click",function(product){     
                    
                    productDetail(product.path[1].id);
                    
                    
                })
                
            }
            let deleteproducts=document.querySelectorAll(".delete");
            for(var i=0;i<allproducts.length;i++)
            {
                deleteproducts[i].addEventListener("click",function(delete1){     
                    
                    deleteProduct(delete1.path[0].id);

                    
                    
                })
                
            }
            

        })
    }
    else if(a=="sort")
    {
       
        fetch("/getProductsSorted").then((response)=>{
            return response.text();
        }).then((data)=>{
            let products=JSON.parse(data);
            // console.log(products);
            
            let html=``;
            for(var i=0;i<products.length;i++)
            {
                html+=`<div class="col-lg-3 col-sm-6 col-xs-12 mt-5 mb-4 " id="${products[i]._id}">
                <img src="uploads/${products[i].images[0].image}"  style="cursor: pointer;" class="image-fluid products" width="230" height="230" alt="">
                <p class="mt-2 mb-0">${products[i].productName}</p>
                <p class="mt-0 mb-0">₹ ${products[i].price}</p>
                <p class="mt-0 mb-0" style="font-size: 2vh;">Free delievery</p>
                <button class="btn btn-secondary" id="${products[i]._id}">Edit</button>
<button class="btn btn-secondary delete" id="${products[i]._id}">Delete</button>
                
                </div>
                
                `
            }
            productscontainer.innerHTML=html;
            let allproducts=document.querySelectorAll(".products");
            for(var i=0;i<allproducts.length;i++)
            {
                allproducts[i].addEventListener("click",function(product){     
                    
                    productDetail(product.path[1].id);
                    
                    
                })
                
            }
            let deleteproducts=document.querySelectorAll(".delete");
            for(var i=0;i<allproducts.length;i++)
            {
                deleteproducts[i].addEventListener("click",function(delete1){     
                    
                    deleteProduct(delete1.path[0].id);

                    
                    
                })
                
            }

        })


    }
    else if (a=="high"){
        
        fetch("/getProductsHigh").then((response)=>{
            return response.text();
        }).then((data)=>{
            let products=JSON.parse(data);
            // console.log(products);
            
            let html=``;
            for(var i=0;i<products.length;i++)
            {
                html+=`<div class="col-lg-3 col-sm-6 col-xs-12 mt-5 mb-4" id="${products[i]._id}">
                <img src="uploads/${products[i].images[0].image}"  style="cursor: pointer;" class="image-fluid products" width="230" height="230" alt="">
                <p class="mt-2 mb-0">${products[i].productName}</p>
                <p class="mt-0 mb-0">₹ ${products[i].price}</p>
                <p class="mt-0 mb-0" style="font-size: 2vh;">Free delievery</p>
                <button class="btn btn-secondary" id="${products[i]._id}">Edit</button>
<button class="btn btn-secondary delete" id="${products[i]._id}">Delete</button>
                
                </div>
                
                `
            }
            productscontainer.innerHTML=html;
            let allproducts=document.querySelectorAll(".products");
            for(var i=0;i<allproducts.length;i++)
            {
                allproducts[i].addEventListener("click",function(product){     
                    
                    productDetail(product.path[1].id);
                    
                    
                })
                
            }
            let deleteproducts=document.querySelectorAll(".delete");
            for(var i=0;i<allproducts.length;i++)
            {
                deleteproducts[i].addEventListener("click",function(delete1){     
                    
                    deleteProduct(delete1.path[0].id);

                    
                    
                })
                
            }

        })

    }
    else{
        fetch("/getProductsLow").then((response)=>{
            return response.text();
        }).then((data)=>{
            let products=JSON.parse(data);
            // console.log(products);
            
            let html=``;
            for(var i=0;i<products.length;i++)
            {
                html+=`<div class="col-lg-3 col-sm-6 col-xs-12 mt-5 mb-4" id="${products[i]._id}">
                <img src="uploads/${products[i].images[0].image}"  style="cursor: pointer;" class="image-fluid products" width="230" height="230" alt="">
                <p class="mt-2 mb-0">${products[i].productName}</p>
                <p class="mt-0 mb-0">₹ ${products[i].price}</p>
                <p class="mt-0 mb-0" style="font-size: 2vh;">Free delievery</p>
                <button class="btn btn-secondary" id="${products[i]._id}">Edit</button>
<button class="btn btn-secondary delete" id="${products[i]._id}">Delete</button>
                
                </div>
                
                `
            }
            productscontainer.innerHTML=html;
            let allproducts=document.querySelectorAll(".products");
            for(var i=0;i<allproducts.length;i++)
            {
                allproducts[i].addEventListener("click",function(product){     
                    
                    productDetail(product.path[1].id);
                    
                    
                })
                
            }
            let deleteproducts=document.querySelectorAll(".delete");
            for(var i=0;i<allproducts.length;i++)
            {
                deleteproducts[i].addEventListener("click",function(delete1){     
                    
                    deleteProduct(delete1.path[0].id);

                    
                    
                })
                
            }

        })
    }
    }
    getProducts();
    sort.addEventListener("click",function(){
        getProducts("sort");
})
high.addEventListener("click",function(){
    getProducts("high");
})
low.addEventListener("click",function(){
    getProducts("low");
})
