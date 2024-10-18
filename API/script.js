let posts = []

function getData(){
    const url = "https://jsonplaceholder.typicode.com/users"
    fetch(url)
        .then(res => res.json)
        .then(data => {
        posts = data
        })
    .catch(error => {
        console.log(error)
    })

    renderPost()
}

function renderPost(){
   
    let postContainer = document.getElementById('posts')
    postContainer.innerHTML = ''
    posts.forEach((post) =>{
        let postElement = document.createElement('div')
        postElement.className = 'card mb-3'
    
        postElement.innerHTML = `
            <div class='card-body'>
                <h3 clss="card-title">${post.name}</h3>
                <p class="card-text">${post.email}</p>       
            </div>    
        `
        postContainer.appendChild(postElement)
    })
}