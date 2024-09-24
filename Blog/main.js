var blogPosts = "blogPosts"
var accountName = "Liam"
var date = 2024

function reset(){
    document.getElementById("form").reset()
    document.getElementById("postId").value = ""
}
function save(){   
    postList = JSON.parse(localStorage.getItem(blogPosts)) ?? []
    var id 
    postList.length != 0 ? postList.findLast((item)=> id = item.id) : id = 0        
    if(document.getElementById('postId').value){
        postList.forEach(value => {
            if(document.getElementById('postId').value == value.id){
                value.title = document.getElementById('postTitle').value,
                value.author = accountName,
                value.year = date,
                value.post = document.getElementById('post').value
            }
        })
    }
    else{
        var item = {
            id: id +1,
            title:document.getElementById('postTitle').value,
            author:accountName,
            year:date,
            post:document.getElementById('post').value
        }
        postList.push(item)
    }
    localStorage.setItem(blogPosts, JSON.stringify(postList))

    showData()
    document.getElementById('form').reset()
}

function showData(){
    var table = document.getElementById('postTable')
    table.innerHTML=``
    postList = JSON.parse(localStorage.getItem(blogPosts)) ?? []
    reversedPostList = []
    for (let i = postList.length - 1;
        i >= 0; i--) {
        reversedPostList.push(postList[i]);
    }
    reversedPostList.forEach(function(value, i) {
        table.innerHTML += 
        `
        <table class="table table-striped">
        <tr>
            <td>${value.author}</td>
            <td colspan="11">${value.title}</td>                               
        </tr>
        <tr>
            <td colspan="12">${value.post}</td>
        </tr>
        <tr>
            <td><small>Post no. ${value.id}</small></td>
            <td><small>${value.year}</small></td>
            <td><button class="btn btn-sm btn-success"
                 onclick="find(${value.id})" >
                    <i class="fa fa-edit"></i>
                </button>
            </td>
            <td><button class="btn btn-sm btn-danger" 
                onclick = "removeData(${value.id})">
                     <i class="fa fa-trash"></i>
                </button>
            </td>
            <td></td>
            <td></td>
            <td></td> 
            <td></td>
            <td></td>
            <td></td>
            <td></td> 
            <td></td>   
        </tr>   
        </table>
        <br>
        <br>
        `
    })   
}

function find(id1){
    postList = JSON.parse(localStorage.getItem(blogPosts)) ?? []
    postList.forEach(value => {
        if(value.id == id1){
            document.getElementById('postId').value = id1
            document.getElementById('postTitle').value = value.title
            document.getElementById('postAuthor').value = value.author
            document.getElementById('postYear').value = value.year
            document.getElementById('post').value = value.post
        }
    })
}

function removeData(id1){
    postList = JSON.parse(localStorage.getItem(blogPosts)) ?? []
    postList = postList.filter(value => {
        return value.id != id1
    })
    localStorage.setItem(blogPosts , JSON.stringify(postList))
    showData()
}