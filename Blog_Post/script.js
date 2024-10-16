let posts = []
let currentPostIndex = null

document.getElementById('blogForm').addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = document.getElementById('title').value
    const content = document.getElementById('content').value

    if(currentPostIndex !== null){
        posts[currentPostIndex] = {title, content}
        currentPostIndex = null;
    }
    else{
         //add new post to the array
         posts.push( {title, content} )
    }
   
    //addPost(title, content)
    renderPost()
    document.getElementById('blogForm').reset()
})

function renderPost(){
   
    let postContainer = document.getElementById('posts')
    postContainer.innerHTML = ''
    posts.forEach((post, index) =>{
        let postElement = document.createElement('div')
        postElement.className = 'card mb-3'
    
        postElement.innerHTML = `
            <div class='card-body'>
                <h3 clss="card-title">${post.title}</h3>
                <p class="card-text">${post.content}</p>
                <button class="btn btn-secondary" onclick="editPost(${index})">Edit</button>
                <button class="btn btn-secondary" onclick="deletePost(${index})">Delete</button>
            </div>    
        `
        postContainer.appendChild(postElement)
    })
}

function editPost(index){
    currentPostIndex = index
    document.getElementById('title').value = posts[index].title
    document.getElementById('content').value = posts[index].content
}

function deletePost(index){
    posts.splice(index, 1)
    renderPost()
}

// The content should contain alteast 20 words

// add functionality to edit a post