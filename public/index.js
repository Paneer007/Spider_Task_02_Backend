let userData =''
const clearLayout =()=>{
    const root = document.getElementById('root')
    root.innerHTML=''
}
const makeLoginPageUi =()=>{
    clearLayout()
    const root = document.getElementById('root')
    root.innerHTML=`
    <div id="SignUp">
        <div id="LoginCard">
            <div>
                <p>Secret Santa</p>
            </div>
            <div>
                <p>Login</p>
            </div>
            <div>
                <input placeholder="username" id="loginUsername">
            </div>
            <div>
                <input placeholder="password" id="loginPassword">
            </div>
            <div>
                <button id="SubmitLoginButton">Login</button>
            </div>
            <p>Don't have an account?<span id="goToSignup"> Sign up</span></p>
        </div>
    </div>
    `
}

const makeSignUpPageUi =()=>{
    clearLayout()
    const root = document.getElementById('root')
    root.innerHTML=`
    <div id="SignUp">
        <div id="LoginCard">
            <div>
                <p>Secret Santa</p>
            </div>
            <div>
                <p>Sign up</p>
            </div>
            <div>
                <input id="signupUsername" placeholder="username">
            </div>
            <div>
                <input id="signupPassword" placeholder="password">
            </div>
            <div>
                <button id="SubmitSignUpButton">Sign Up</button>
            </div>
            <p>Do you have an account?<span id="goToLogin"> Log in</span></p>
        </div>
    </div>
    `
}
const homePage=()=>{
    clearLayout()
    const root = document.getElementById('root')
    root.innerHTML=`
    <div>
    <div id="theSideBarContent">
        <div id="sideBarContentDiv">
            <p id="HomePageButton">Home Page</p>
            <p id="newGroupButton">New Group</p>
            <p id="joinGroupButton">Join Group</p>
        </div>
    </div>
    <div id="TheMainContent">
        <div id="TitleOfHomePage">
            <div>
                <p>Greeting</p>
            </div>
        </div>
        <div id="mainContentOfThisPage">
        </div>
    </div>
</div>
    `
}
const getUserData =async()=>{
    const result = await axios.get('http://localhost:3001/api/userData')

}
const sendLoginDetails =async()=>{
    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value
    const body={username:username,password:password}
    const result = await axios.post("http://localhost:3001/api/login",body)
    if(result.status==200){
        localStorage.setItem('token',result.data.token)
        getUserData()
        homePage()
    }
}
const addEventLoginPageListener=()=>{
    const signupSwitchButton = document.getElementById('goToSignup')
    signupSwitchButton.addEventListener('click',()=>{
        makeSignUpPageUi()
        addEventSignUpPageListener()
    })
    const loginButton = document.getElementById("SubmitLoginButton")
    loginButton.addEventListener('click',()=>{
        sendLoginDetails()
    })

}
const addEventSignUpPageListener =()=>{
    const loginSwitchButton = document.getElementById('goToLogin')
    loginSwitchButton.addEventListener('click',()=>{
        makeLoginPageUi()
        addEventLoginPageListener()
    })
    const signupButton = document.getElementById("SubmitSignUpButton")
    signupButton.addEventListener('click',()=>{
        sendSignUpDetails()
    })
}
const sendSignUpDetails = async()=>{
    const username = document.getElementById("signupUsername").value
    const password = document.getElementById("signupPassword").value
    const body={username:username,password:password}
    const result = await axios.post("http://localhost:3001/api/signup",body)
    if(result.status == 200){
        alert("Account made successfully ")
        makeLoginPageUi()
        addEventLoginPageListener()
    }

}
const main =()=>{
    makeSignUpPageUi()
    addEventSignUpPageListener()
}
main()