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
        .then(infoData => console.log(infoData.data))
}