const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Giovanni Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Milestone 2
const postsContainer = document.getElementById("container");

posts.forEach(post => {
    // Crea elemento DOM
    const createdPost = createPostElement(post);

    // appende al container
    postsContainer.innerHTML += createdPost;
});

// **Milestone 3** - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. 
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like. 

// Al click sul tasto "Mi Piace"

// Bonus 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone. 

const likedPosts = [];
const likeButtons = document.querySelectorAll(".js-like-button");

likeButtons.forEach( (button, index) => {
    button.addEventListener("click", function(event) {
        event.preventDefault();

        // esempio dataset
        console.log(this.dataset.postid);

        // preleviamo il post cliccato dall'array di oggetti tramite l'indice del bottone nell'array
        const clickedPost = posts[index];
        // preleviamo l'id dell'oggetto cliccato
        const clickedPostId = clickedPost.id;
        // preleviamo dall'html l'elmento che contiene il numero di likes
        const likeCounter = document.getElementById(`like-counter-${clickedPostId}`);
        // da questo elmento preleviamo il numero dei likes e lo trasformiamo un number
        let likesNumber = parseInt(likeCounter.textContent);

        // Se il post cliccato non è presente nell'array
        if ( !likedPosts.includes(clickedPostId)) {
            //  - cambiare il colore al bottone
            this.classList.add("like-button--liked");
                    
            // incrementiamo il numero di likes
            likesNumber = likesNumber + 1;

            //  - salvare in un array separato gli id dei post ai quali l'utente mette mi piace
            likedPosts.push(clickedPostId);
        } else {
            // togliere il colore dal bottone
            this.classList.remove("like-button--liked");

            // decrementare il numero di likes
            likesNumber = likesNumber - 1;

            // togliere l'id del post dall'array likedPosts
            const idIndexInLikedPosts =  likedPosts.indexOf(clickedPostId);
            likedPosts.splice(idIndexInLikedPosts, 1);
        }

        // riscriviamo il contenuto dell'elmento HTML
        likeCounter.innerHTML = likesNumber;
        // salviamo il nuovo numero di likes all'interno dell'array
        clickedPost.likes = likesNumber;
    });
});


// FUNCTIONS
/**
 * Description -> La funzione che crea un elemento DOM per un post
 * @param {Object} postObject -> oggetto con i dati da inserire all'interno del DOM
 * @returns {any} elemento HTML
 */
function createPostElement(postObject) {
    const {id, content, author, media, likes, created} = postObject;
    const postElement = `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${ (author.image) ?  createAuthorImage(author) : createPlaceholderAuthorImage(author.name)}             
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${author.name}</div>
                    <div class="post-meta__time">${formatDate(created)}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${content}</div>
        <div class="post__image">
            <img src="${media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
    `;

    return postElement;
}

//  BONUS 1. Formattare le date in formato italiano (gg/mm/aaaa)
// yyyy-mm-dd -> [yyyy, mm, dd] -> [dd, mm, yyyy] -> dd/mm/yyyy
// dd/mm/yyyy
/**
 * Description La funzione che prende una stringa che rappresenta una data in formato americano e la trasfroma in una stringa in formato italiano
 * @param {String} originalDate -> la stringa della data in formato americano yyyy-mm-dd
 * @returns {String} -> la stringa che rappresenta una data in formato italiano 
 */
function formatDate(originalDate) {
    // const originalDateArray = originalDate.split("-");
    // console.log(originalDateArray);
    // const reversedDateArray = originalDateArray.reverse();
    // console.log(reversedDateArray);
    // const italianDateString = reversedDateArray.join("/");
    // console.log(italianDateString);
    const italianDateString = originalDate.split("-").reverse().join("/");
    // console.log(italianDateString);
    return italianDateString;
}

// 
// 2. BONUS 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Olga Demina > OD).

/**
 * Description Restituisce l'elemento dell'immagine in base ai dati passati
 * @param {Object} authorObject -> oggetto con i dati dell'autore
 * @returns {String} -> template string che rappresenta elmento dell'immagine d'autore
 */
function createAuthorImage(authorObject) {
    const {image, name} = authorObject;
    const authorImage = `<img class="profile-pic" src="${image}" alt="${name}">`
    return authorImage;
}


// Restituisce l'elemnto di placeholder
function createPlaceholderAuthorImage(authorName) {
    console.log(authorName);
    // Otteniamo la stringa di iniziali di autore
    const nameParts = authorName.split(" ");
    console.log(nameParts);
    // prepariamo la vaiabile che conterrà gli iniziali
    let initials = "";
    // Per ogni elemento di array 
    //  - prendiamo la prima lettera
    //  - la coincateniamo alla variabile di iniziali
    nameParts.forEach(name => {
        const firstLetter = name[0];
        initials += firstLetter;
    });

    console.log(initials);

    // creaiamo la stringa dell'elemento DOM 
    const placeholder = `
        <div class="profile-pic-default">
            <span>${initials}</span>
        </div>
    `;

    return placeholder;
}


