async function getDataOfUser(url, val){
    let error = document.getElementById('error')
    let resultc = document.getElementById('result')
    let successc = document.getElementById('success')
    let container = document.querySelector('.container')
    let result = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    resultc.style.display = 'block'
    if(result.status !== 404){
        error.style.display = 'none'
        result = await result.json()
        document.getElementById('userImg').setAttribute('src', result.avatar_url)       
        document.getElementById('userName').innerText = '@'+ result.login      
        document.getElementById('fullName').innerText = result.name
        document.getElementById('bio').innerText = result.bio
        let repos = await fetch(result.repos_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        repos = await repos.json()
        let example = document.getElementById('example').querySelector('.repo').innerHTML
        let reposContainer = document.getElementById('reposContainer')
        reposContainer.innerHTML = ''
        for(let i in repos){
            let row = repos[i]
            let ourline = document.createElement('div')
            ourline.classList.add('repo')
            ourline.innerHTML = example
            ourline.querySelector('h3').innerText = row.name
            ourline.querySelector('.stars span').innerText = row.stargazers_count
            ourline.querySelector('.fork span').innerText = row.forks_count
            reposContainer.appendChild(ourline)
        }
        successc.style.display = 'block'
        container.style.borderRadius = '15px'

    }else{
        successc.style.display = 'none'
        error.style.display = 'block'
        container.style.borderRadius = '5px'
    }
}
function checkUser(e){
    e.preventDefault()
    let action = e.target.getAttribute('action')
    let val = e.target.querySelector('input').value
    let url = action + val
    getDataOfUser(url, val)
}
var form = document.getElementById('search_form')
form.addEventListener('submit', checkUser)