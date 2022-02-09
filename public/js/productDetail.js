let category=document.getElementById("category");
let productName=document.getElementById("productName");
let description=document.getElementById("description");
let price=document.getElementById("price");
let ol=document.getElementById("ol");
let productphotos=document.getElementById("productphotos");

$('.carousel').carousel({
    interval: 2000
  })


function getdetail(){
    fetch("/getclickedproduct").then((response)=>{
        return response.text();
    }).then((data)=>{
        let details=JSON.parse(data);
        let html="";
       
        if(details.category=="Shoes")
        {
            
            html=` <select required class="form-select border-danger p-2" id="shoes" aria-label="Default select example" name="size">
            <option value="8" selected>Select Size</option>
            <option value="7">7 <span>UK</span></option>
            <option value="8">8 <span>UK</span></option>
            <option value="9">9 <span>UK</span></option>
            <option value="10">10 <span>UK</span></option>
            <option value="11">11 <span>UK</span></option>
            
        </select>`;
        }
        else if(details.category=="Sports" || details.category=="Clothing")
        {
            
            html=`   <select required class="form-select border-danger p-2" id="clothing" aria-label="Default select example" name="size">
            <option value="M" selected>Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">Xl</option>
            <option value="XL">XXl</option>
        </select>`;
        }
        else
        {
            
            html=` <select required class="form-select border-danger p-2"  id="accessory" aria-label="Default select example" name="size">
            <option value="Free Size" selected>Free Size</option>
            
        </select>`;
        }
        select.innerHTML=html;
        category.innerHTML=details.category;
        description.innerHTML=details.description;
        price.innerHTML=details.price;
        productName.innerHTML=details.productName;
        let images="";
        let list="";


        for(var i=0;i<details.images.length;i++)
        {
            if(i==0)
            {
                images+=` <div class="carousel-item active">
                <img class="d-block w-100" src="uploads/${details.images[i].image}">
            </div>`
            list+=`<li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>`;
            
            }
            else{
            images+=` <div class="carousel-item">
            <img class="d-block w-100" src="uploads/${details.images[i].image}">
        </div>`
        list+=`<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
           
        }
    }
        productphotos.innerHTML=images;
        ol.innerHTML=list;
    })
}
getdetail();