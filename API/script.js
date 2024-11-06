// Web Services - One application makes a call to another application through internet
// types: Xml based: SOAP web service
//                 : RESTful Web service : json/xml/text/html

//let users = []

function getData() {
    const url = 'http://localhost:5002/data' // need to run app.py in python folder
    fetch(url)
    .then(response => response.json())
     .then(data => {
         if(data.length > 0){
            const newTable = document.createElement("table")
            newTable.innerHTML = "<thead><th>User Name</th><th>Age</th></thead>"
             data.forEach((user) =>{
                const newRow = document.createElement("tr")
                const tdName = document.createElement("td")
                const tdAge = document.createElement("td")
                tdName.textContent = user.stud_name
                tdAge.textContent = user.stud_age
                newRow.appendChild(tdName)
                newRow.appendChild(tdAge)
                newTable.appendChild(newRow)
            })
            let userContainer = document.getElementById('posts')
             userContainer.appendChild(newTable)
         }
     })
    .catch(error => {
        console.log(error)
    })
    //renderPost()
   // renderTable()
}    

// function renderTable(){
//     const newTable = document.createElement("table")
//     newTable.innerHTML = "<thead><th>User Name</th><th>Email</th></thead>"
//     users.forEach((user) =>{
//         const newRow = document.createElement("tr")
//         const tdName = document.createElement("td")
//         const tdEmail = document.createElement("td")
//         tdName.textContent = user.name
//         tdEmail.textContent = user.email
//         newRow.appendChild(tdName)
//         newRow.appendChild(tdEmail)
//         newTable.appendChild(newRow)
//     })
//     let userContainer = document.getElementById('users')
//     userContainer.appendChild(newTable)
// }

// function getData() {
//     const url = "https://jsonplaceholder.typicode.com/users"
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             posts = data
//         })
//         .catch(error => {
//             console.log(error)
//         })

//     renderPost()
// }

// function renderPost() {

//     let postContainer = document.getElementById('posts')
//     postContainer.innerHTML = ''
//     posts.forEach((post) => {
//         let postElement = document.createElement('div')
//         postElement.className = 'card mb-3'

//         postElement.innerHTML = `
//             <div class='card-body'>
//                 <h3 clss="card-title">${post.name}</h3>
//                 <p class="card-text">${post.email}</p>       
//             </div>    
//         `
//         postContainer.appendChild(postElement)
//     })
// }