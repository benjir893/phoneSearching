const phoneDataLoad = async(search, isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data =await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll);
}

// const phoneDataLoad2 = async()=>{
//     const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
//     const data =await res.json();
//     const phones = data.data;
//     // console.log(phones);
//     displayPhone(phones);
// }

const displayPhone = (phones, isShowAll)=>{
    const phoneContainer = document.getElementById('cardContainer')
    phoneContainer.textContent='';
// ==show All button hidding and displaying 
    const showbtn = document.getElementById('showbtnContainer');
    // console.log('is show all', isShowAll);
    if(phones.length > 12 && !isShowAll){
      showbtn.classList.remove('hidden');
    }
    else{
      showbtn.classList.add('hidden');
    }

    if(!isShowAll){
      phones = phones.slice(0,12);
    }
//    for(const phone of phones){
//     console.log(phone);
//     const displayCard = document.createElement('div');
//     displayCard.classList=`card card-compact w-96 bg-base-200 shadow-xl my-4`;
//     displayCard.innerHTML=`
//     <figure><img src="${phone.image}" alt="Shoes" /></figure>
//     <div class="card-body">
//       <h2 class="card-title">${phone.brand}</h2>
//       <p>${phone.phone_name}</p>
//       <div class="card-actions justify-end">
//         <button class="btn btn-primary">Buy Now</button>
//       </div>
//     </div>`;
//     phoneContainer.appendChild(displayCard);
//    }
phones.forEach(phone => {
    // console.log(phone);
    const displayCard = document.createElement('div');
    displayCard.classList=`card card-compact w-96 bg-base-200 shadow-xl my-4`;
    displayCard.innerHTML=`
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="w-full items-center text-center text-xl font-bold">${phone.brand}</h2>
      <p class="text-center">${phone.phone_name}</p>
      <div class="card-actions justify-center">
        <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>`;
    phoneContainer.appendChild(displayCard);
});
toggleLoadingBalls(false);
}

// show detail button function
const showDetails = async(id)=>{
  const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`) ;
  const data = await res.json();
  // console.log(data);
  const phone = data.data;
  showSingleDetails(phone);
} 

const showSingleDetails =(phone)=>{
  console.log(phone)
// show single phone details
  // const phoneDetails = document.getElementById('phoneName');
  // const phonedetails = phone.name;
  // phoneDetails.innerText = phonedetails;
  const detailsContainer = document.getElementById('detailContainer');
  detailsContainer.innerHTML=`
      <h3 id="phoneName" class="font-bold text-lg">${phone.name}</h3>
      <img src="${phone.image}" alt="">
      <p class="py-4">${phone.mainFeatures.storage}</p>
      <p class="py-4">${phone.brand}</p>
      <p class="py-4">${phone.releaseDate}</p>
      <p class="py-4">${phone.mainFeatures.displaysize}</p>
      <div class="modal-action">
          <form method="dialog">
              <button class="btn">Close</button>
          </form>
      </div>`

  detailsModal.showModal();
}
// =============================
//=== search box=======

const searchHandle = (isShowAll)=>{
  toggleLoadingBalls(true);
    const searchtxt = document.getElementById('searchBox');
    const searchtxtvalue = searchtxt.value;
    phoneDataLoad(searchtxtvalue, isShowAll);
    
}
// ========2nd searchhandle button====
const searchHandle2 = (isShowAll)=>{
  toggleLoadingBalls(true);
  const searchtxt2 = document.getElementById('searchBox2');
  const searchtxtValue2 = searchtxt2.value;
  phoneDataLoad(searchtxtValue2, isShowAll);
  
}
// ===================
// phoneDataLoad()
// phoneDataLoad2();

// loading bubbles...
const toggleLoadingBalls=(isloading)=>{
  const loadingBalls = document.getElementById('loadingBalls');
  if(isloading){
      loadingBalls.classList.remove('hidden');
  }
  else{
    loadingBalls.classList.add('hidden');
  }
}

// show All button function
const showAllPhones=()=>{
  searchHandle(true);
  searchHandle2(true);
}