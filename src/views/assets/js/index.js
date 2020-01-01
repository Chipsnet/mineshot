const { dialog } = require('electron').remote
window.$ = require('./assets/js/jquery-3.4.1.min.js');

var status = false;

const OpenDirectory = () => dialog.showOpenDialog(null, {
    properties: ['openDirectory'],
    title: 'フォルダ選択',
    defaultPath: '.'
})

const ChangeStatus = () => {    
    if (this.status == 'true') {
        window.$('footer').css('background-color', 'cornflowerblue');
        this.status = false;
    } else {
        window.$('footer').css('background-color', 'darkgoldenrod');
        this.status = true;
    }
    console.log(`Status changed to ${this.status}`);
}

window.$('#start').on('click', () => {
    console.log('Button id start is pushed');
    ChangeStatus();
});

window.$('#test').on('click', () => {
    // alert(status)
    OpenDirectory().then(result => {
        console.log(result.filePaths);
    })
});