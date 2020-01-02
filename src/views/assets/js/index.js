const { dialog, clipboard, nativeImage } = require('electron').remote
var chokidar = require("chokidar");
window.$ = require('./assets/js/jquery-3.4.1.min.js');

var status = false;

const AddLog = (log_data) => {
    log = window.$('#log').val()
    window.$('#log').val(log+log_data+'\n')
    window.$("#log").scrollTop( window.$("#log")[0].scrollHeight );
}

window.$(() => {
    
    AddLog('準備完了')  
})

const OpenDirectory = () => dialog.showOpenDialog(null, {
    properties: ['openDirectory'],
    title: 'フォルダ選択',
    defaultPath: `${process.env.APPDATA}\\.minecraft\\screenshots`
})

const ChangeStatus = () => {    
    if (this.status == 'true') {
        window.$('footer').css('background-color', 'cornflowerblue');
        window.$('footer > p').text('待機中');
        this.status = false;
    } else {
        window.$('footer').css('background-color', 'darkgoldenrod');
        this.status = true;
        window.$('footer > p').text('監視中');
    }
    console.log(`Status changed to ${this.status}`);
}

const StartChokidar = (dir) => {
    AddLog(`${dir} の監視を開始しました`)
    chokidar.watch(dir, {ignoreInitial: true}).on('add', path => {
        AddLog(`新規ファイル ${path} を検知しました`)
        setTimeout(() => {
            let img = nativeImage.createFromPath(path)
            clipboard.writeImage(img)
            AddLog(`画像をクリップボードにコピーしました`)
        }, 1000)
    });
}

window.$('#start').click(() => {
    console.log('Button id start is pushed');
    ChangeStatus();
});

window.$('#test').click(() => {
    // alert(status)
    dialog.showMessageBox(null, {
        type: 'info',
        buttons: ['OK'],
        title: 'フォルダ選択',
        message: '監視対象のフォルダを選択します。',
        detail: 'デフォルトのフォルダから変更していない場合、そのままフォルダを選択します。'
    }).then(() => {
        OpenDirectory().then(result => {
            AddLog(`監視対象フォルダを ${result.filePaths[0]} に設定しました`);
            window.$('#path').val(result.filePaths);
            StartChokidar(result.filePaths[0])
        });
    });
});