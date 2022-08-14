let userData =''
const clearLayout =()=>{
    const root = document.getElementById('root')
    root.innerHTML=''
}
const giftPage=()=>{
    userData.toGift.forEach(x=>addGiftDetails(x))
}
const randomNumberToken=()=>{
    return Math.random()*10000000
}

const sendUpdateGiftItemFunction=async(x)=>{
    const token = localStorage.getItem('token')
    const Name = document.getElementById('giftNameInput').value
    const Budget = document.getElementById('giftBudgetInput').value
    const resp = await axios.post(`http://localhost:3001/api/giftData/${x._id}/update`,body,{headers:{'authorization':token}})
}
const addEventListenersToGiftPagePop=(x)=>{
    const button = document.getElementById("sendStuff")
    button.addEventListener('click',()=>{
        sendUpdateGiftItemFunction(x)
    })
}
const popUpForUpdatingGift=(x)=>{
    const groupPagePopUp = document.getElementById('groupPagePopUp')
    groupPagePopUp.innerHTML=`
    <div>
        <p>Enter Name: </p>
        <input id="giftNameInput">
        <p>Enter Budget: </p>
        <input id="giftBudgetInput">
        <button id="sendStuff">Send Stuff</button>
    </div>
    `
    addEventListenersToGiftPagePop(x)
}
const addGiftEventListener =(giftUuid,x)=>{
    const updateGiftItem = document.getElementById(`updateToken-${giftUuid}`)
    updateGiftItem.addEventListener('click',()=>{
        popUpForUpdatingGift(x)
        sendUpdateGiftItemFunction(x)
    })
}
const addGiftDetails=(x)=>{
    const giftUuid = randomNumberToken()
    const GiftPage = document.getElementById('GiftPage')
    const giftDiv= document.createElement('div')
    GiftPage.appendChild(giftDiv)
    giftDiv.innerHTML=`
    <div>
        <p id="username-${giftUuid}">To: ${x.to.username}</p>
        <p id="Group-${giftUuid}>Group: ${x.group.naP}</p>
        <p id="updateToken-${giftUuid}>Update Gift item</p>
    </div>
    `
    addGiftEventListener(giftUuid,x)
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
    <div id="GiftPage">
    </div>
</div>
    `
}
const getUserData =async()=>{
    return new Promise(async(resolve,reject)=>{
        const token = localStorage.getItem('token')
        const result = await axios.get('http://localhost:3001/api/userdata',{headers:{'authorization':token}})
        userData= result.data
        console.log(userData)
        return resolve(100)
    })
   
}
const appendTheGroupThingy=(x,groupsDiv)=>{
    const groupData = document.createElement('div')
    groupsDiv.appendChild(groupData)
    groupData.className="GameContent"
    groupData.innerHTML=`
        <p id="groupName-${x.roomId}">Group Name: ${x.name}</p>
        <p id="groupRoomId-${x.roomId}">Room Id: ${x.roomId}</p>
        <p id="visitGroupPage-${x.roomId}">Enter</p>
    `
    addEventListenersToGroup(x)
}
const getAdminText=async(x)=>{
    const token = localStorage.getItem('token')
    const resp = await axios.get(`http://localhost:3001/api/groupdata/${x._id}`,{headers:{'authorization':token}})
    let userData = resp.data.participants
    const admin = userData.find(y=>y.Details._id==x.creatorId)
    const getAdmin = document.getElementById(`Admin-${x.roomId}`)
    getAdmin.textContent=`Admin-${admin.Details.username}`
    return admin.username
}
const removePopUpPassword=()=>{
    document.getElementById('groupPagePopUp').innerHTML=''
}
const SubmitPasswordStuff=async(x)=>{
    const token = localStorage.getItem('token')
    const password = document.getElementById('inputForPassword').value
    const body ={password:password}
    const resp = await axios.post(`http://localhost:3001/api/groupdata/${x._id}/lockandshuffle`,body,{headers:{'authorization':token}})
    if(resp.status==200){
        removePopUpPassword()
        alert('Each member has been assigned a secret santa')
    }
}
const createPassWordPopUp=(x)=>{
    const groupPagePopUp = document.getElementById("groupPagePopUp")
    groupPagePopUp.innerHTML=`
        <div>
            <p>Lock Group and start secret Santa</p>
            <p>Password</p>
            <input id="inputForPassword"/>
            <p id="submitInputPass">Submit</p>
        </div>
    `
    const passWord= document.getElementById('submitInputPass')
    passWord.addEventListener('click',()=>{
        SubmitPasswordStuff(x)
    })
}  
const addEventListenersToGiftPage=(x)=>{
    const AdminFeatures = document.getElementById(`Features-${x.roomId}`)
    AdminFeatures.addEventListener('click',()=>{
        createPassWordPopUp(x)
    })
}
const createGiftPageLayout=(x)=>{
    const root = document.getElementById('TheMainContent')
    root.innerHTML=`
        <div>
            <div>
                <div>
                    <h2>${x.name}</h2>
                    <h3>${x.location}</h3>
                    <h3 id="Admin-${x.roomId}">Admin:</h3>
                    <h4>${x.roomId}</h4>
                </div>
                <div>
                    <p id="Features-${x.roomId}">Admin Features</p>
                </div>
            </div>
            <div>
                <h2>Participants</h2>
                <div id="ListOfParticipants">
                </div>
            </div>
            <div id="groupPagePopUp">
            </div>
        </div>
    `
    addEventListenersToGiftPage(x)

}
const updateParticipants = async(x) =>{
    const token = localStorage.getItem('token')
    const resp = await axios.get(`http://localhost:3001/api/groupdata/${x._id}`,{headers:{'authorization':token}})
    console.log(resp)
    let userData = resp.data.participants
    const ListOfParticipants = document.getElementById("ListOfParticipants")
    ListOfParticipants.innerHTML=''
    userData.forEach((x)=>{
        console.log(x)
        let nameContent = document.createElement('p')
        ListOfParticipants.appendChild(nameContent)
        nameContent.textContent=x.Details.username
    })
}
const GroupPageDisplay=async(x)=>{
    createGiftPageLayout(x)
    getAdminText(x)
    updateParticipants(x)
}
const addEventListenersToGroup=(x)=>{
    const EnterGroupPage = document.getElementById(`visitGroupPage-${x.roomId}`)
    EnterGroupPage.addEventListener('click',()=>{
        GroupPageDisplay(x)
    })
    
}

const FillTheGroups = async()=>{
    const groupsDiv = document.getElementById('mainContentOfThisPage')
    console.log(userData)
    groupsDiv.innerHTML=``
    userData.groups.forEach(x=>appendTheGroupThingy(x,groupsDiv))
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
        <p>Enter Budget</p>
        <input id="groupBudgetInput">
        <p>Enter password</p>
        <input id="groupPasswordInput">
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
    const groupPasswordInput = document.getElementById("groupPasswordInput").value
    const body = {groupNameInput, groupLocationInput,groupBudgetInput,groupPasswordInput}
    const token = localStorage.getItem('token')
    const response = await axios.post("http://localhost:3001/api/groupdata",body,{headers:{'authorization':token}})
    if(response.status==200){
        removePopUp()
        await getUserData()
        FillTheGroups()
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
const sendJoinGroupData=async()=>{
    try{
        const roomID= document.getElementById("groupRoomIDInput").value
        const body ={roomID}
        const token = localStorage.getItem('token')
        const resp = await axios.post("http://localhost:3001/api/groupdata/joingroup",body,{"headers":{"authorization":token}})
        if(resp.status==200){
            removePopUp()
            await getUserData()
            FillTheGroups()
        }
    }catch(e){
        alert(e.response.data.message)
    }
    
}
const addJoinGroupPopUpEventListeners=()=>{
    const sendGroupInput = document.getElementById('sendGroupIDInput')
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
const homePageAfterLogin=async()=>{
    await getUserData()
    homePage()
    FillTheGroups()
    FillTheGifts()
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
const removeTokenIfAny=()=>{
    window.onbeforeunload = function() {
        localStorage.removeItem('token');
      };
}
const main =()=>{
    removeTokenIfAny()
    makeSignUpPageUi()
    addEventSignUpPageListener()
}
main()