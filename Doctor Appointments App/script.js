let posts = []
let currentPostIndex = null
 
let date = new Date();
let year = date.getFullYear();
let month = String(date.getMonth()+1).padStart(2,'0');
let todayDate = String(date.getDate()).padStart(2,'0');
let datePattern = year + '-' + month + '-' + todayDate;
document.getElementById("date").min = datePattern;

document.getElementById('appointmentsForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log("Submit was pressed")
    const name = document.getElementById('name').value
    const ailment = document.getElementById('ailment').value
    const date = document.getElementById('date').value
    const content = document.getElementById('content').value

    if(currentPostIndex !== null){
        posts[currentPostIndex] = {name, ailment, date, content}
        currentPostIndex = null;
    }
    else{
         //add new post to the array
         posts.push( {name, ailment, date, content} )

         console.log(posts)
    }
    renderPost()
    document.getElementById('appointmentsForm').reset()
})

function renderPost(){
   
    let postContainer = document.getElementById('posts')
    postContainer.innerHTML = ''
    posts.forEach((post, index) =>{
        let postElement = document.createElement('div')
        postElement.className = 'card mb-3'
    
        postElement.innerHTML = `
            <div class='card-body'>
                <h3 clss="card-title">${post.name}</h3>
                <p class="card-text">${post.ailment}</p>
                <p class="card-text">${post.date}</p>
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
    document.getElementById('name').value = posts[index].name
    document.getElementById('ailment').value = posts[index].ailment
    document.getElementById('date').value = posts[index].date
    document.getElementById('content').value = posts[index].content
}

function deletePost(index){
    posts.splice(index, 1)
    renderPost()
}