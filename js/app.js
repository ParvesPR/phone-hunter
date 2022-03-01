const loadPhones = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';
    if (inputText == '') {
        const inputError = document.getElementById('error-input');
        inputError.innerText = 'Please Search Phone Name';
    } else {
        const inputError = document.getElementById('error-input');
        inputError.innerText = '';
        const phoneUrl = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
        fetch(phoneUrl)
            .then(res => res.json())
            .then(phoneData => allPhones(phoneData.data))
    }


}

const allPhones = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    for (const phone of phones) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto p-3" alt="...">
                <div class="card-body">
                  <h4 class="card-title">Brand: ${phone.brand}</h4>
                  <h6 class="card-text">Model: ${phone.phone_name}</h6>
                  <button onclick="phoneInfo('${phone.slug}')" class="btn bg-success text-white">Phone Info</button>
                </div>
              </div>
        `;
        searchResult.appendChild(div)
    }
}

const phoneInfo = info => {
    const infoUrl = `https://openapi.programming-hero.com/api/phone/${info}`
    fetch(infoUrl)
        .then(res => res.json())
        .then(infoData => showPhoneInfo(infoData.data))
}

const showPhoneInfo = phoneInfo => {
    const phoneDetails = document.getElementById('phone-info');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100">
         <img src="${phoneInfo.image}" class="card-img-top w-50 p-3 mx-auto" alt="...">
         <div class="card-body card_bg">
           <h5 class="card-title">Phone Name: ${phoneInfo.name}</h5>
           <small class="text-muted">${phoneInfo.releaseDate ? phoneInfo.releaseDate:'Released date not found'}</small>
           <p class="card-text text-start">
           <h6>Sotrage: <span class="fw-normal">${phoneInfo.mainFeatures.storage}</span></h6>
           <h6>Display: <span class="fw-normal">${phoneInfo.mainFeatures.displaySize}</span></h6>
           <h6>Chipset: <span class="fw-normal">${phoneInfo.mainFeatures.chipSet ? phoneInfo.mainFeatures.chipSet:'Data not found' }</span></h6>
           <h6>Memory: <span class="fw-normal">${phoneInfo.mainFeatures.memory ? phoneInfo.mainFeatures.memory:'Data not found'}</span></h6>
           <h6>Sensors: <span class="fw-normal">${phoneInfo.mainFeatures.sensors}</span></h6>
           </p>
         </div>
        </div>
    `;
    phoneDetails.appendChild(div);

}