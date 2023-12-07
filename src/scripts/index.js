import { getUser } from "/src/scripts/services/user.js"
import { getRepositories } from "/src/scripts/services/repositories.js"

import { user } from "/src/scripts/objects/user.js"
import { screen } from "/src/scripts/objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value 
        if(validateEmptyInput(userName)) return  
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (event) => {
    const userName = event.target.value
    const key = event.which || event.keyCode
    const isEnterKeyPress = key === 13

    if(isEnterKeyPress){
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
    
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert("Preencha o campo com o nome de usuário do Github")
        return true
    }
}

async function getUserData(userName){

    const userResponse = await getUser(userName)

    if(userResponse.message === "API rate limit exceeded for 45.188.121.65. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
    
}

