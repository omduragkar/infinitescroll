
async function fetchData() {
    const getData = await fetch(
        `https://api.javascripttutorial.net/v1/quotes/?page=${pageData}&limit={50}`
    );

    const finalData = await getData.json();
    finalData.data.map((values, index)=>{
        const dataSet = makeCard(values.author, values.quote);
        if(index == finalData.data.length - 1){
            dataSet.classList.toggle("LastElement");
            observe.observe(dataSet);
        }else{
            
            observe.unobserve(dataSet);
        }
        root.appendChild(dataSet);
    })

    pageData++;
}
const card = document.getElementById("maincard");


function makeCard(author, quote){
    let newCard = card.cloneNode(true);
    newCard.classList.toggle("hidden");
    let authorElement = newCard.querySelector('.author');
    let thoughtElement = newCard.querySelector('.thought');

    // Set the author and quote values for the new card
    authorElement.textContent = author;
    thoughtElement.textContent = quote;
    return newCard;
}
let pageData = 1; // Initialize page data
const root = document.querySelector(".card-container")


const intersectionCallback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            observe.unobserve(entry.target);
            fetchData();

        }
    });
};
fetchData();

const observe = new IntersectionObserver(intersectionCallback, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
});

// console.log(root.lastChild.previousSibling);
// observe.observe(root.lastChild.previousSibling)