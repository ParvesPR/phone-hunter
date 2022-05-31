const loadPhones = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';
    if (inputText == '') {
        const inputError = document.getElementById('error-input');
        inputError.innerText = 'Please search by phone name';
    } 
    else {
        const inputError = document.getElementById('error-input');
        inputError.innerText = '';
        const phoneUrl = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
        fetch(phoneUrl)
            .then(res => res.json())
            .then(phoneData => allPhones(phoneData.data.slice(0, 20)))
        const phoneInfo = document.getElementById('phone-info');
        phoneInfo.innerHTML = '';
    }
}
const allPhones = phones => {
    if (phones.length == 0) {
        const inputError = document.getElementById('error-input');
        inputError.innerText = 'No phone found';
    }
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
           <p class="card-text text-start"><h5>Main Features</h5>
           <h6>Sotrage: <span class="fw-normal">${phoneInfo.mainFeatures.storage}</span></h6>
           <h6>Display: <span class="fw-normal">${phoneInfo.mainFeatures.displaySize}</span></h6>
           <h6>Chipset: <span class="fw-normal">${phoneInfo.mainFeatures.chipSet ? phoneInfo.mainFeatures.chipSet:'Data not found' }</span></h6>
           <h6>Memory: <span class="fw-normal">${phoneInfo.mainFeatures.memory ? phoneInfo.mainFeatures.memory:'Data not found'}</span></h6>
           <h6>Sensors: <span class="fw-normal">${phoneInfo.mainFeatures.sensors}</span></h6>
           </p>
           <p><h5>Others</h5>
           <h6>WLAN: <span class="fw-normal">${phoneInfo?.others?.WLAN ? phoneInfo.others.WLAN:'N/A'}</span></h6>
           <h6>Bluetooth: <span class="fw-normal">${phoneInfo?.others?.Bluetooth ? phoneInfo.others.Bluetooth:'N/A'}</span></h6>
           <h6>GPS: <span class="fw-normal">${phoneInfo?.others?.GPS ? phoneInfo.others.GPS:'N/A'}</span></h6>
           <h6>NFC: <span class="fw-normal">${phoneInfo?.others?.NFC ? phoneInfo.others.NFC:'N/A'}</span></h6>
           <h6>Radio: <span class="fw-normal">${phoneInfo?.others?.Radio ? phoneInfo.others.Radio:'N/A'}</span></h6>
           <h6>USB: <span class="fw-normal">${phoneInfo?.others?.USB ? phoneInfo.others.USB:'N/A'}</span></h6>
           </p>
         </div>
        </div>
    `;
    phoneDetails.appendChild(div);
}
