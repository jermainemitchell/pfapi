sessionStorage.setItem('testAccessToken', JSON.stringify('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJYSFhsY2FhVUV2eFFLc1ZNN2w2NHAyWXBUMWMzYm9VZ1NBYnhRYnVSMUVCUmNyYUtjayIsImp0aSI6ImYyOTRiMTFlOTAwMTk1MTZkNmRmM2Y3MDYzMjJhNzVhNmNmNjY5MDZmNWI5MmFkMzQ4NWRkMTIyMzhiYWRlMDhmZWY4YjU5MjI5OWNhNDVmIiwiaWF0IjoxNjIxODMzNjYyLCJuYmYiOjE2MjE4MzM2NjIsImV4cCI6MTYyMTgzNzI2Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.I2SIVcWVW5hhimw1S0rKHTmantXuxq7_1LhalJ2XZRSTt7kHg3MOhW_QkxPwXUQqWvxru5nN7RM9QyGDC2PEeNOpTGUZtAygIIN0J4Cp82YqMBRJ-8pu7ZAkyvFLY3TGvZ8fma0loWX9RmaBED9QuyoZUMgnt8KAplNU3SL2wEzhxJYrsx4VSjven0dp_cpsFDk56b6EL4cjjzCx3aCEXQZVEZDEKszdMm5bjzXxjg8JRBoEUrEVCsN4heEh9YUyhrhOzcmavcbr4aYfMYSA-Q0rQvYpONboi4G0vfopiio1KF4lmwKJvSWHuicODgBqrmFLR7VvTfei1Bqv5fxARQ'))

let breed = document.querySelector('#api_breed')
let zipCode = document.querySelector('#api_location')
let searchForm = document.querySelector('.api_search_form_wrapper form')
let resultsDiv = document.querySelector('.api_results_container')
let pageCounter = 1
let resultsPerPage = 10
let loadMoreBtn = document.querySelector('#api_load_more')
let spinnerVisibility = false
let previousValue

searchForm.addEventListener('submit', fetchResults)

function fetchResults (e) {
    
    e.preventDefault()

    if ((breed.value !== previousValue) && (zipCode.value !== previousValue)) {

        if (!spinnerVisibility) {
            resultsDiv.innerHTML = '<div class="spinner-loader"></div>'
            spinnerVisibility = true
        }

        if (breed.value == '') {
            resultsDiv.innerHTML = ''
            spinnerVisibility = false
        } else {
            pageCounter = 1
            ajaxFetch(true)
            spinnerVisibility = false
            // breedPreviousValue = breed.value
            // zipPreviousValue = zipCode.value
        }
    }
}

loadMoreBtn.addEventListener('click', () => {
    pageCounter++
    ajaxFetch(false)
})

async function ajaxFetch(firstLoad) {  

  let url = 'https://api.petfinder.com/v2/animals?type=dog&sort=distance&distance=100&limit=' + resultsPerPage + '&page=' + pageCounter + '&breed=' + breed.value + '&location=' + zipCode.value
  let token = JSON.parse(sessionStorage.getItem('testAccessToken'))

  let h = new Headers()
  h.append('Authorization', `Bearer ${token}`);

  let req = new Request(url, {
      method: 'GET', 
      headers: h,
      mode: 'cors'
  })

  req = await fetch(req)
  let data = await req.json()

  data = data.animals

  console.log(data)

  if (firstLoad == true) {
    resultsDiv.innerHTML = ''
  }

  if ((data) && (data.length > 0)) {
      console.log(data.length)
    data.forEach((dog) => {
        
        resultsDiv.insertAdjacentHTML('beforeend', 
            `<div class="dog_profile_container">
                <div class="dog_profile_wrapper">
                    <div class="profile_pic">
                        <img src="${dog.primary_photo_cropped ? dog.primary_photo_cropped.small : 'img/placeholder.svg'}" alt="dog profile picture">
                    </div>
                    <ul class="profile_info">
                        <li><div class="icon_wrapper"><img src="img/name_icon.svg" alt="icon"></div><span>${dog.name}</span></li>
                        <li><div class="icon_wrapper"><img src="img/gender_icon_2.svg" alt="icon"></div><span>${dog.gender}</span></li>
                        <li><div class="icon_wrapper"><img src="img/age2.svg" alt="icon"></div><span>${dog.age}</span></li>
                        <li><div class="icon_wrapper"><img src="img/map_icon2.svg" alt="icon"></div><span>${dog.contact.address.city + ', ' + dog.contact.address.state}</span></li>
                    </ul>
                </div>
            </div>`
        )
    })

    if (data.length >= resultsPerPage) {
        loadMoreBtn.style.display = 'block'
    }


  } else {
      if (firstLoad == true) {
          resultsDiv.innerHTML = 'No animals match that search'
      } else {
        resultsDiv.insertAdjacentHTML('afterend', '<p>Sorry, no more results!</p>')
        loadMoreBtn.style.display = 'none' 
      }
  }
}
