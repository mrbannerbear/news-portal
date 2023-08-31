async function loadCategoryData(){
    try{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json()
    let categories = data.data.news_category;
    displayCategoryData(categories)
    }
    catch(err){
        console.log("ERR: " + err)
        return "ERR: " + err
    }
}

loadCategoryData()

let displayCategoryData = (categories) => {
    categories.forEach(category => {
        let button = document.createElement('button')
        button.classList = `btn btn-sm text-[#858585] text-sm hover:text-blue-500 focus:ring-0 hover:bg-blue-300 focus:text-blue-500 focus:bg-blue-300`
        button.innerHTML =`${category.category_name}`
        menuButtonClick(button, category)
        document.getElementById('menu-section').appendChild(button)
    });
}

let menuButtonClick = (button, category) => {
    button.onclick = function(){
       document.getElementById('items-found-category').innerText = category.category_name;
       document.getElementById('items-found-section').style.display = "block"
    loadEachCategoryData(category.category_id)
    }
}

async function loadEachCategoryData(category_id){
    try{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    const data = await res.json();
    let cards = data.data;
    document.getElementById('items-found-number').innerText = cards.length;
    document.getElementById('news-section').innerHTML = "";
    displayEachCategoryData(cards);
    // loadModal(cards)
    }
    catch(err){
        console.log("ERR: " + err)
        return "ERR: " + err
    }
}

let  displayEachCategoryData = (cards) => {

   cards.forEach(card => {

    let div = document.createElement('div');
    div.classList = "hero bg-[#F6F6F6] rounded-md shadow-sm mb-6";
    div.innerHTML = `
                <div class="hero-content flex-col lg:flex-row gap-12 lg:max-h-54">
                <img src="${card.image_url}" class="h-60 rounded-lg shadow-sm" />
                <div class="px-3">
                    <h1 class="text-xl font-bold">${card.title}</h1>
                    <p class="pt-4 pb-6 text-[#686767] overflow">${card.details}</p>
                    <div class="flex justify-between pr-10 text-grey items-center">
                        <div>
                            <p class="text-[#686767]">${card.author.name !== "system" ? card.author.name : "Local Correspondent"}</p>
                            <p id="date" class="text-xs text-[#807c7c]">${card.author.published_date}</p>
                        </div>
                        <div class="text-[#686767]"><i class="far fa-eye"></i><span> ${card.total_view?card.total_view : "No views"}</span></div>
                        <div class="rating rating-sm">
                            <input type="radio" name="rating-1" class="mask mask-star" />
                            <input type="radio" name="rating-1" class="mask mask-star"/>
                            <input type="radio" name="rating-1" class="mask mask-star" />
                            <input type="radio" name="rating-1" class="mask mask-star" checked/>
                            <input type="radio" name="rating-1" class="mask mask-star" />
                        </div>
                        <div><button onclick="loadModal('${card._id}'); my_modal_3.showModal()" class="btn bg-blue-500 text-[#F6F6F6] focus:ring-0 hover:bg-blue-300 rounded-full"><i class="fas fa-arrow-right"></i></button></div>
                    </div>
            </div>
            </div>
    `

    document.getElementById('news-section').appendChild(div)
    
   }); 
}

loadEachCategoryData("01")

let loadModal = async (news_id) => {

    const res = await fetch (`https://openapi.programming-hero.com/api/news/${news_id}`);
    const data = await res.json();
    let modal = data.data[0]
    displayModal(modal)

}

function displayModal(modal){

    document.getElementById('modal-box').innerHTML = `
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <div class="hero-content flex-col gap-12 lg:max-h-54">
                <img src="${modal.image_url}" class="h-60 rounded-lg shadow-sm" />
                <div class="px-3">
                    <h1 class="text-xl font-bold">${modal.title}</h1>
                    <p class="pt-4 pb-6 text-[#686767] overflow">${modal.details}</p>
                    <div class="flex justify-between pr-10 text-grey items-center">
                        <div>
                            <p class="text-[#686767]">${modal.author.name !== "system" ? modal.author.name : "Local Correspondent"}</p>
                            <p id="date" class="text-xs text-[#807c7c]">${modal.author.published_date}</p>
                        </div>
                        <div class="text-[#686767]"><i class="far fa-eye"></i><span> ${modal.total_view?modal.total_view : "No views"}</span></div>
                        <div class="rating rating-sm">
                            <input type="radio" name="rating-1" class="mask mask-star" />
                            <input type="radio" name="rating-1" class="mask mask-star"/>
                            <input type="radio" name="rating-1" class="mask mask-star" />
                            <input type="radio" name="rating-1" class="mask mask-star" checked/>
                            <input type="radio" name="rating-1" class="mask mask-star" />
                        </div>
    `
}

