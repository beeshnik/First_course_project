const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
})

/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

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

