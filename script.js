const flags = document.querySelector('#flags');
const filter = document.querySelector('#filter');
const filterBox = document.querySelector('#searchFilter select');
const country = document.querySelector('#name');
const options = document.querySelectorAll('option');
const modeSwitch = document.querySelector('#modeSwitch');
const root = document.querySelector(':root');
const moon = document.querySelector('header label');
const details = document.querySelector('#details');
const allFlags = document.querySelector('#allFlags');
//display on start
fetch(`data.json`)
.then(response => response.json())
.then(data=>show(data))

//filter changes
filter.addEventListener('input',()=>{
    country.value = "";
    if(filter.value ==="all"){
        fetch(`data.json`)
        .then(response => response.json())
        .then(data=>show(data))
    }else{
        fetch(`data.json`)
        .then(response => response.json())
        .then(data=>showFiltered(data))
    } 
})

//input changes
country.addEventListener('input',()=>{
    if(country.value === ''){
        fetch(`data.json`)
        .then(response => response.json())
        .then(data=>show(data)) 
    }else{
        options[0].setAttribute('selected', true)
        fetch(`data.json`)
        .then(response => response.json())
        .then(data=>showSearch(data))
    }  
})
//function for filter
function showFiltered(data){
    flags.innerHTML='';
    for(let i=0; i<data.length; i++){
        if(data[i].region === filter.value){
            let flag = document.createElement('div');
            let countryFlag = data[i].flags.png;
            let countryName = data[i].name;
            let countryPopulation = data[i].population.toLocaleString('en-GB');
            let countryRegion = data[i].region;
            let countryCapital = data[i].capital;

            flag.classList.add('flag');

            flag.innerHTML = 
            `<div class="top">
                <img src="${countryFlag}" alt="flag">
            </div>
            <div class="bottom">
                <h2>${countryName}</h2>
                <p><strong>Population:</strong> ${countryPopulation}</p>
                <p><strong>Region:</strong> ${countryRegion}</p>
                <p><strong>Capital:</strong> ${countryCapital}</p>
            </div>`;

            flags.appendChild(flag);

            flag.addEventListener('click',(e)=>{
                const clickedCountryName = e.target.offsetParent.children[1].children[0].innerHTML
                fetch(`data.json`)
                .then(response => response.json())
                .then(data=>showDetails(data,clickedCountryName,''))

                allFlags.style.display='none';
                details.style.display='flex';
            })
        }
    }
}
//function for search
function showSearch(data){
    flags.innerHTML='';
    
    for(let i=0; i<data.length; i++){
        let first = data[i].name[0];
        let smallFirst = first.toLowerCase();
        let name = data[i].name.replace(first,smallFirst)

        if(name.includes(country.value) ){
            let flag = document.createElement('div');
            let countryFlag = data[i].flags.png;
            let countryName = data[i].name;
            let countryPopulation = data[i].population.toLocaleString('en-GB');
            let countryRegion = data[i].region;
            let countryCapital = data[i].capital;

            flag.classList.add('flag');

            flag.innerHTML = 
            `<div class="top">
                <img src="${countryFlag}" alt="flag">
            </div>
            <div class="bottom">
                <h2>${countryName}</h2>
                <p><strong>Population:</strong> ${countryPopulation}</p>
                <p><strong>Region:</strong> ${countryRegion}</p>
                <p><strong>Capital:</strong> ${countryCapital}</p>
            </div>`;

            flags.appendChild(flag);

            flag.addEventListener('click',(e)=>{
                const clickedCountryName = e.target.offsetParent.children[1].children[0].innerHTML
                fetch(`data.json`)
                .then(response => response.json())
                .then(data=>showDetails(data,clickedCountryName,''))

                allFlags.style.display='none';
                details.style.display='flex';
            })
        }
    }
}
// function for create and display country
function show(data) {
    //create all flags
    flags.innerHTML = "";
    data.forEach(country =>{
        let flag = document.createElement('div');
        let countryFlag = country.flags.png;
        let countryName = country.name;
        let countryPopulation = country.population.toLocaleString('en-GB');
        let countryRegion = country.region;
        let countryCapital = country.capital;

        flag.classList.add('flag');

        flag.innerHTML = 
        `<div class="top">
            <img src="${countryFlag}" alt="flag">
        </div>
        <div class="bottom">
            <h2>${countryName}</h2>
            <p><strong>Population:</strong> ${countryPopulation}</p>
            <p><strong>Region:</strong> ${countryRegion}</p>
            <p><strong>Capital:</strong> ${countryCapital}</p>
        </div>`;

        flags.appendChild(flag);

        flag.addEventListener('click',(e)=>{
            const clickedCountryName = e.target.offsetParent.children[1].children[0].innerHTML
            fetch(`data.json`)
            .then(response => response.json())
            .then(data=>showDetails(data,clickedCountryName,''))

            allFlags.style.display='none';
            details.style.display='flex';
        })
    })
}        

//function for show details
function showDetails(data, clickedCountryName, clickedCountryCode){
    for(let i=0; i<data.length; i++){         
        //main page click
        if(data[i].name ===`${clickedCountryName}`){
        
            //variables
            let countryFlag = data[i].flags.png;
            let countryName = data[i].name;
            let nativeName = data[i].nativeName;
            let countryPopulation = data[i].population.toLocaleString('en-GB');
            let countryRegion = data[i].region;
            let countrySubregion = data[i].subregion;
            let countryCapital = data[i].capital;
            let tld = data[i].topLevelDomain[0];
            //currency array to string
            let currencies = data[i].currencies;
            let currency = Object.values(currencies);
            let countryCurrency = [];
            currency.forEach(currency=>{
                countryCurrency.push(currency.name);
            })
            countryCurrency.join('');
            //language array to string
            let languages = data[i].languages;
            let language = Object.values(languages);
            let countryLanguages =[]
            language.forEach(language=>{
                countryLanguages.push(language.name);
            })
            countryLanguages.join('');

            //details html code to display
            details.innerHTML =
            `<button class="back">
                 <i class="fas fa-arrow-left"></i>
                 <span>Back</span>
             </button>
             <div class="details-content">
                 <div class="details-flag">
                     <img src="${countryFlag}" alt="flag">
                 </div>
                 <div class="details-data">
                     <div class="details-info">
                         <h2>${countryName}</h2>
                         <div class="country-info">
                             <div class="first-section">
                                 <p><span>Native Name: </span>${nativeName}</p>
                                 <p><span>Population: </span>${countryPopulation}</p>
                                 <p><span>Region: </span>${countryRegion}</p>
                                 <p><span>Sub Region: </span>${countrySubregion}</p>
                                 <p><span>Capital: </span>${countryCapital}</p>
                             </div>
                             <div class="second-section">
                                 <p><span>Top Level Domain: </span> ${tld}</p>
                                 <p><span>Currencies: </span> ${countryCurrency}</p>
                                 <p><span>Languages: </span> ${countryLanguages}</p>
                             </div>
                         </div>
                     </div>
                     <div class="details-borders">
                         <strong>Border Countries: </strong>
                         <div class="boxes"></div>
                     </div>
                 </div>
             </div>`;

            //bordes country (if no border country script doesn't stop)
            const bordesBoxes = document.querySelector('.boxes')
            let borders = data[i].borders
            if(!borders){
                borders = '';
            }else{
                borders.forEach(border=>{
                    let borderBox = document.createElement('div')
                    borderBox.classList.add('borderBox');
                    borderBox.innerHTML = border
                    bordesBoxes.appendChild(borderBox)
                    borderBox.addEventListener('click',(e)=>{
                        const clickedCountryCode = e.target.innerHTML;
                        fetch(`data.json`)
                        .then(response => response.json())
                        .then(data=>showDetails(data,'',clickedCountryCode))
                    })
                })
            } 
        }
        //clicked from borders 
        if(data[i].alpha3Code ===`${clickedCountryCode}`){
                        //variables
            let countryFlag = data[i].flags.png;
            let countryName = data[i].name;
            let nativeName = data[i].nativeName;
            let countryPopulation = data[i].population.toLocaleString('en-GB');
            let countryRegion = data[i].region;
            let countrySubregion = data[i].subregion;
            let countryCapital = data[i].capital;
            let tld = data[i].topLevelDomain[0];
            //currency array to string
            let currencies = data[i].currencies;
            let currency = Object.values(currencies);
            let countryCurrency = [];
            currency.forEach(currency=>{
                countryCurrency.push(currency.name);
            })
            countryCurrency.join('');
            //language array to string
            let languages = data[i].languages;
            let language = Object.values(languages);
            let countryLanguages =[]
            language.forEach(language=>{
                countryLanguages.push(language.name);
            })
            countryLanguages.join('');

            //details html code to display
            details.innerHTML =
            `<button class="back">
                 <i class="fas fa-arrow-left"></i>
                 <span>Back</span>
             </button>
             <div class="details-content">
                 <div class="details-flag">
                     <img src="${countryFlag}" alt="flag">
                 </div>
                 <div class="details-data">
                     <div class="details-info">
                         <h2>${countryName}</h2>
                         <div class="country-info">
                             <div class="first-section">
                                 <p><span>Native Name: </span>${nativeName}</p>
                                 <p><span>Population: </span>${countryPopulation}</p>
                                 <p><span>Region: </span>${countryRegion}</p>
                                 <p><span>Sub Region: </span>${countrySubregion}</p>
                                 <p><span>Capital: </span>${countryCapital}</p>
                             </div>
                             <div class="second-section">
                                 <p><span>Top Level Domain: </span> ${tld}</p>
                                 <p><span>Currencies: </span> ${countryCurrency}</p>
                                 <p><span>Languages: </span> ${countryLanguages}</p>
                             </div>
                         </div>
                     </div>
                     <div class="details-borders">
                         <strong>Border Countries: </strong>
                         <div class="boxes"></div>
                     </div>
                 </div>
             </div>`;
            //bordes country (if no border country script doesn't stop)
            const bordesBoxes = document.querySelector('.boxes')
            let borders = data[i].borders
            if(!borders){
                borders = '';
            }else{
                borders.forEach(border=>{
                    let borderBox = document.createElement('div')
                    borderBox.classList.add('borderBox');
                    borderBox.innerHTML = border
                    bordesBoxes.appendChild(borderBox)
                    borderBox.addEventListener('click',(e)=>{
                        const clickedCountryCode = e.target.innerHTML;
                        fetch(`data.json`)
                        .then(response => response.json())
                        .then(data=>showDetails(data,'',clickedCountryCode))
                    })
                })
            }
        }
    }
    //back button
    const back = document.querySelector('button.back');
    console.log(back)
    back.addEventListener('click',()=>{
            fetch(`data.json`)
            .then(response => response.json())
            .then(data=>show(data))

            allFlags.style.display='block';
            details.style.display='none';
    })  
}

// theme switch
modeSwitch.addEventListener('input',()=>{
    if(modeSwitch.checked){
        root.style.setProperty('--element','hsl(209, 23%, 22%)')
        root.style.setProperty('--background','hsl(207, 26%, 17%)')
        root.style.setProperty('--text','hsl(0, 0%, 100%)')
        root.style.setProperty('--input','hsl(0, 0%, 100%)')
        moon.innerHTML = '<i class="fas fa-moon"></i>'
        filterBox.style.setProperty('background-image','url("./images/chevron-down-solid.svg")')

    }else{
        root.style.setProperty('--element','hsl(0, 0%, 100%)')
        root.style.setProperty('--background','hsl(0, 0%, 98%)')
        root.style.setProperty('--text','hsl(200, 15%, 8%)')
        root.style.setProperty('--input','hsl(0, 0%, 52%)')
        moon.innerHTML = '<i class="far fa-moon"></i>'
        filterBox.style.setProperty('background-image','url("./images/chevron-down-solid-dark.svg")')
    }
})
