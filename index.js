var addtodo = document.getElementById('addtodo')
var adddone = document.getElementById('adddone')
var submitbtn = document.getElementById('submit')
submitbtn.addEventListener('click', store)
window.addEventListener('DOMContentLoaded', refresh)

function store(e) {
    e.preventDefault();
    var task = document.getElementById('task').value
    var description = document.getElementById('description').value

    var arr = ({
        'TASK': task,
        'DESCRIPTION': description
    })
    axios.post('https://crudcrud.com/api/793d9bc0fd574b42a644c8b8459b8d85/Dashboard', arr)
        .then((response) => {
            var li = document.createElement('li')
            li.appendChild(document.createTextNode(task + '--' + description))
            li.className = response.data._id
            addtodo.appendChild(li)
            deleted(li)
            completed(li)
        })
        .catch((err) => {
            document.getElementById('resource').innerHTML += '<h3>Something went wrong Boss</h3>'
        })



}
function deleted(li) {
    var b1 = document.createElement('button')
    b1.appendChild(document.createTextNode('REMOVE'))
    b1.className = "btn btn-danger"
    li.appendChild(b1)
    b1.addEventListener('click', deletion)
}
function deletion(e) {
    var locate = e.target.parentElement
    axios.delete(`https://crudcrud.com/api/793d9bc0fd574b42a644c8b8459b8d85/Dashboard/${locate.className}`)
        .then((response) => {
            addtodo.removeChild(locate)
        })
        .catch((err) => {
            document.getElementById('todo').innerHTML += '<h3>ERROR!!</h3>'
        })
}
function completed(li) {
    var b2 = document.createElement('button')
    b2.appendChild(document.createTextNode('DONE'))
    b2.className = "btn btn-success"
    li.appendChild(b2)
    b2.addEventListener('click', (e) => {
        var f=e
        var locate = e.target.parentElement
        axios.get(`https://crudcrud.com/api/793d9bc0fd574b42a644c8b8459b8d85/Dashboard/${locate.className}`)
            .then((response) => {
                var arr = ({
                    'TASK': response.data.TASK,
                    'DESCRIPTION': response.data.DESCRIPTION
                })
                axios.post(`https://crudcrud.com/api/793d9bc0fd574b42a644c8b8459b8d85/Completed`, arr)
                    .then((response1) => {
                        adddone.appendChild(document.createTextNode(response1.data.TASK+'--'+response1.data.DESCRIPTION))

                    })

            })
        deletion(f)
    })
}


function refresh() {
    axios.get(`https://crudcrud.com/api/793d9bc0fd574b42a644c8b8459b8d85/Dashboard`)
        .then((response) => {
            for (i of response.data) {

                var li = document.createElement('li')
                li.className = i._id
                addtodo.appendChild(li)
                li.appendChild(document.createTextNode(i.TASK + '--' + i.DESCRIPTION))
                deleted(li)
                completed(li)

            }
        })
        .catch((err) => {
            document.getElementById('addtodo').innerHTML += "<h3>ERROR!!</h3>"
        })
    axios.get(`https://crudcrud.com/api/793d9bc0fd574b42a644c8b8459b8d85/Completed`)
        .then((response) => {
            for (i of response.data) {

                var li = document.createElement('li')
                li.className = i._id
                adddone.appendChild(li)
                li.appendChild(document.createTextNode(i.TASK + '--' + i.DESCRIPTION))
            }
        })
        .catch((err) => {
            document.getElementById('adddone').innerHTML += "<h3>ERROR!!</h3>"
        })
}