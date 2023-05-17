const button = document.getElementById('btn')
const input = document.getElementById('title')

button.addEventListener('click', () => {
    const title = input.value
    window.electronAPI.setTitle(title)
})

const addSiteButton = document.getElementById('add-site')
addSiteButton.addEventListener('click', () => {
    window.createWindow.createDialog(600, 300, 'addSite.html')
})

let files = []
const header = document.getElementById('upd')
header.addEventListener('click', () => {

    (async () => {
        await test.getValuesArray().then((values, rejection) => {
            files = values;
        })
    })();

    console.log(files)

    let div = document.getElementById('files-list-container');
    div.innerHTML = "";
    for (let i = 0; i < files.length; i++){
        let divName = files[i].objectName
        let divPath = files[i].objectPath
        let divLink = files[i].objectLink
        let newElement = document.createElement('div');
        div.appendChild(newElement);
        const header = document.getElementById('name-of-cite-main')
        const urlWindow = document.getElementById('urlWindow')
        div.addEventListener('click', () =>{
            header.textContent = divName;
            urlWindow.value = divLink;
        })
        newElement.id = 'id' + i;
        newElement.className = "file";
        let p = document.createElement('p')
        p.className = "filename";
        p.textContent = divName;
        newElement.appendChild(p);
    }
})













// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelector('.header-block').addEventListener('click', evt => {
//         let btnName = null;
//         if (evt.target.classList.contains('btn')) {
//             btnName = evt.target.getAttribute('class').substr(4);
//         } else if (evt.target.parentNode.classList.contains('btn')){
//             btnName = evt.target.parentNode.getAttribute('class').substr(4);
//         }
//
//         if(btnName){
//             globalThis.ctrls.wctrl(btnName).then((result) => {
//                 if (result.class === 'max-btn') {
//                     if (result.btn === 'MAX') {
//                         document.querySelector('.' + result.class).children[0].classList.remove('');
//                         document.querySelector('.' + result.class).children[0].classList.add('');
//                     } else if (result.btn === 'UNMAX') {
//                         document.querySelector('.' + result.class).children[0].classList.remove('');
//                         document.querySelector('.' + result.class).children[0].classList.add('');
//                     }
//                 }
//             })
//         }
//     })
// })
//
// window.addEventListener('resize', () => {
//     let btn = document.querySelector('.max-btn');
//     globalThis.ctrls.wctrl('resize').then((result) => {
//         if (result.btn === 'MAX') {
//             btn.children[0].classList.remove('');
//             btn.children[0].classList.add('');
//         } else if(result.btn === 'UNMAX') {
//             btn.children[0].classList.remove('');
//             btn.children[0].classList.add('');
//         }
//     })
// })

