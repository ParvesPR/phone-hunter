const loadPhones = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';

    const phoneUrl = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
    fetch(phoneUrl)
        .then(res => res.json())
        .then(phoneData => allPhones(phoneData.data))
}

const allPhones = phones => {
    const searchResult = document.getElementById('search-result');
    for (const phone of phones) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto p-3" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Brand: ${phone.brand}</h5>
                  <p class="card-text">${phone.phone_name}</p>
                </div>
              </div>
        `;
        searchResult.appendChild(div)
    }
}