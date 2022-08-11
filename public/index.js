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
                <input placeholder="username">
            </div>
            <div>
                <input placeholder="password">
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
                <input placeholder="username">
            </div>
            <div>
                <input placeholder="password">
            </div>
            <div>
                <button id="SubmitSignUpButton">Sign Up</button>
            </div>
            <p>Do you have an account?<span id="goToLogin"> Log in</span></p>
        </div>
    </div>
    `
}
const addEventLoginPageListener=()=>{
    const signupSwitchButton = document.getElementById('goToSignup')
    signupSwitchButton.addEventListener('click',()=>{
        makeSignUpPageUi()
        addEventSignUpPageListener()
    })
    const loginButton = document.getElementById("SubmitLoginButton")
    loginButton.addEventListener('click',()=>{
        
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

    })

    
}
const main =()=>{
    makeSignUpPageUi()
    addEventSignUpPageListener()
}
main()