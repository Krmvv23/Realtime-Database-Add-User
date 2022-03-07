const firebaseConfig = {
    apiKey: "AIzaSyAgOzExFcB7zLkpM4yBYDWH9hiyo0L-ce0",
    authDomain: "add-person-66dc3.firebaseapp.com",
    databaseURL: "https://add-person-66dc3-default-rtdb.firebaseio.com",
    projectId: "add-person-66dc3",
    storageBucket: "add-person-66dc3.appspot.com",
    messagingSenderId: "711773892002",
    appId: "1:711773892002:web:4f1799e8c7490955ef56fb"
};

firebase.initializeApp(firebaseConfig);

console.log('%c Hello I am a string!','font-size: 50px;text-align:center')

const nameInp = document.querySelector('#name')
const surnameInp = document.querySelector('#surname')
const professionInp = document.querySelector('#profession')
const phoneInp = document.querySelector('#phone')
const photoInp = document.querySelector('#photo')
const savebtn = document.querySelector('.save-btn')
const searchInp = document.querySelector('[type=search]')
const delAllBtn = document.querySelector('.delAll')

const database = firebase.database()
const rootRef = database.ref('/users/')

var users = []
var bt;

document.querySelector('thead').addEventListener('click',()=>{
    users.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase(); 
        if (nameA < nameB ) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        return 0;
    });
    start()
})

rootRef.orderByKey().on('value',snapshot=>{
    users = [];
    document.querySelector('tbody').innerHTML = ''
    if(snapshot.exists()){
        snapshot.forEach(data=>{
            users.push(data.val()) 
        })
    }
    start()
})
savebtn.addEventListener('click',()=>{
    rootRef.child(surnameInp.value+nameInp.value).set({
        name: nameInp.value,
        surname: surnameInp.value,
        profession: professionInp.value,
        phone: phoneInp.value
        // photo: photoInp.value
    });
    // uploadImage()

   
    document.querySelectorAll('.modal-body input').forEach(inp => {
        inp.value = ''
    });
})

function start() {
    document.querySelector('tbody').innerHTML = ''
    users.forEach(user=>{
        bt = new Mati(user.name,user.surname,user.phone,user.profession,user.photo)
        bt.addFuckingRow()
        bt.delFuckingRow()
    })
    findFuckingRow()
    updateData()
    
}

function findArray(value,arr){
    return arr.filter(user =>{
        var regex = new RegExp(value, 'gi')
        return user.name.match(regex) || user.surname.match(regex) || user.profession.match(regex) ||user.phone.match(regex)
    })
}

function findFuckingRow(){
    searchInp.addEventListener('keyup',e=>{
        document.querySelector('tbody').innerHTML =''

        var matchArray = findArray(searchInp.value,users)
        matchArray.map((user,i)=>{
            bt = new Mati(user.name,user.surname,user.phone,user.profession,user.photo)
            bt.addFuckingRow()
            bt.delFuckingRow()
        })
        updateData()
    })
   
}

class Mati{
    constructor(name,surname,phone,profession,photo){
        this.name = name,
        this.surname = surname,
        this.phone = phone,
        this.profession = profession,
        this.photo = photo,
        this.id = this.surname+this.name
    }

    addFuckingRow(){

        var row = `
        <tr id=${this.id}>
            
            <td class="border-0">${this.name}</td>
            <td class="border-0">${this.surname}</td>
            <td class="border-0">${this.profession}</td>
            <td class="border-0">${this.phone}</td>
            <td class="border-0 text-center upgrade-btns">
                <button class="btn text-dark editRow" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${this.id}"><i class="fas fa-pen"></i></button>
                <button class="btn text-dark delRow" id="${this.id}"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
        
        `

        document.querySelector('tbody').innerHTML +=row

    }
    delFuckingRow(){
        document.querySelectorAll('.delRow').forEach(btn=>{
            btn.addEventListener('click',(e)=>{
                btn.parentElement.parentElement.classList.add('trn')
                setTimeout(()=>{
                    rootRef.child(btn.getAttribute('id')).remove()
                },300)
            })
        })
        document.querySelector('.delAll').addEventListener('click',()=>{
            rootRef.child(this.id).remove()            
        })
    }
   
}

function updateData(){
    document.querySelectorAll('.editRow').forEach(btn=>{
        btn.addEventListener('click',e=>{
            document.querySelectorAll('.modal-body input').forEach(inp => {
                inp.value = ''
            });

            users.forEach(user=>{
                if (btn.getAttribute('id') === user.surname+user.name) {
                    nameInp.value = user.name
                    surnameInp.value = user.surname
                    professionInp.value = user.profession
                    phoneInp.value = user.phone
    
                    rootRef.child(user.surname+user.name).remove()
                    
                }
            })
            
        })
    })
}




