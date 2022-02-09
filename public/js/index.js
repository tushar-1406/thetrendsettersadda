$('.carousel').carousel({
    interval: 3000
  })

  let productscontainer=document.getElementById("productscontainer");

 function productDetail(id){
    var url = "http://localhost:3000/productdetail1";
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
        window.location.href = "http://localhost:3000/detail";
                   
    })
    
    
}

function getProducts(){
    fetch("http://localhost:3000/getProducts").then((response)=>{
        return response.text();
    }).then((data)=>{
        let products=JSON.parse(data)
        
        let html=``;
        for(var i=0;i<4;i++)
        {
            html+=`<div class="col-lg-3 col-sm-6 col-xs-12 mt-5 mb-4 products" id="${products[i]._id}">
            <img src="uploads/${products[i].images[0].image}" class="image-fluid" width="230" height="230" alt="">
            <p class="mt-2 mb-0">${products[i].productName}</p>
            <p class="mt-0 mb-0">₹ ${products[i].price}</p>
            <p class="mt-0 mb-0" style="font-size: 2vh;">Free delievery</p>
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
    })
}
getProducts();
