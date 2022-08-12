const { default: axios } = require("axios")

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
            <p id="NewGroupButton">New Group</p>
            <p id="JoinGroupButton">Join Group</p>
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
    <div id="PopUp">

    </div>
</div>
    `
}
const getUserData =async()=>{
    const token = localStorage.getItem('token')
    console.log(token)
    const result = await axios.get('http://localhost:3001/api/userdata',{headers:{'authorization':token}})
    userData= result.data
}
const FillTheGroups =()=>{

}
const addGroupPopUp =()=>{
    const popUp = document.getElementById("PopUp")
    popUp.innerHTML=`
    <div>
        <p>Enter Room ID</p>
        <input id="groupRoomIDInput">
        <p id="sendGroupIDInput">Send</p>
        <p id="cancelGroupInput">Cancel</p>
    </div>
    `
}
const newGroupPopUp=()=>{
    const popUp = document.getElementById("PopUp")
    popUp.innerHTML=`
    <div>
        <p>Enter Group name</p>
        <input id="groupNameInput">
        <p>Enter location</p>
        <input id="groupLocationInput">
        <p>Enter Budget </p>
        <input id="groupBudgetInput">
        <p id="sendGroupInput">Send</p>
        <p id="cancelGroupInput">Cancel</p>
    </div>
    `
}
const removePopUp =()=>{
    const popUp = document.getElementById("PopUp")
    popUp.innerHTML=``
}
const sendMakeGroupData=async ()=>{
    const groupNameInput = document.getElementById("groupNameInput").value
    const groupLocationInput = document.getElementById("groupLocationInput").value
    const groupBudgetInput = document.getElementById("groupBudgetInput").value
    const body = {groupNameInput, groupLocationInput,groupBudgetInput}
    const token = localStorage.getItem('token')
    const response = await axios.post("http://localhost:3001/api/groupdata",body,{headers:{'authorization':token}})
    if(response.status==200){
        removePopUp()
    }
}
const addMakeGroupPopUpEventListeners=()=>{
    const sendGroupInput = document.getElementById('sendGroupInput')
    sendGroupInput.addEventListener('click',()=>{
        sendMakeGroupData()
    })
    const cancelGroupInput= document.getElementById("cancelGroupInput")
    cancelGroupInput.addEventListener('click',()=>{
        removePopUp()
    })
}
const sendJoinGroupData=()=>{
    const roomID= document.getElementById("groupRoomIDInput").value
    const body ={roomID}
    const token = localStorage.getItem('token')
    const response = await axios.post("http://localhost:3001/api/groupdata/joinGroup")
}
const addJoinGroupPopUpEventListeners=()=>{
    const sendGroupInput = document.getElementById('sendGroupInput')
    sendGroupInput.addEventListener('click',()=>{
        sendJoinGroupData()
    })
    const cancelGroupInput= document.getElementById("cancelGroupInput")
    cancelGroupInput.addEventListener('click',()=>{
        removePopUp()
    })
}
const addEventListenerToMainContentSideBar=()=>{
    const homePageButton = document.getElementById('HomePageButton')
    homePageButton.addEventListener('click',()=>{
        homePageAfterLogin()
    })
    const newGroupButton = document.getElementById('NewGroupButton')
    newGroupButton.addEventListener('click',()=>{
        newGroupPopUp()
        addMakeGroupPopUpEventListeners()
    })
    const JoinGroupButton = document.getElementById("JoinGroupButton")
    JoinGroupButton.addEventListener('click',()=>{
        addGroupPopUp()
        addJoinGroupPopUpEventListeners()
    })
}
const homePageAfterLogin=()=>{
    getUserData()
    homePage()
    FillTheGroups()
    addEventListenerToMainContentSideBar()
}
const sendLoginDetails =async()=>{
    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value
    const body={username:username,password:password}
    const result = await axios.post("http://localhost:3001/api/login",body)
    if(result.status==200){
        localStorage.setItem('token','bearer '+result.data.token)
        homePageAfterLogin()
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