const { dialog, clipboard, nativeImage } = require('electron').remote
const chokidar = require("chokidar");
const $ = require('./assets/js/jquery-3.4.1.min.js');

const AppendLog = (log_data) => $('#log').append(log_data + "\n").scrollTop(9e9);

let status = false;

$(() => AppendLog('準備完了'));

const OpenDirectory = () => dialog.showOpenDialog(null, {
    properties: ['openDirectory'],
    title: 'フォルダ選択',
    defaultPath: `${process.env.APPDATA}\\.minecraft\\screenshots`
});

const ToggleStatus = () => {
    $('footer').css('background-color', this.status ? 'cornflowerblue' : 'darkgoldenrod');
    $('footer > p').text(this.status ? '待機中' : '監視中');
    this.status = !this.status;
    console.log(`Status changed to ${this.status}`);
}

const StartChokidar = (dir) => {
    AppendLog(`${dir} の監視を開始しました`);
    chokidar.watch(dir, {ignoreInitial: true}).on('add', path => {
        AppendLog(`新規ファイル ${path} を検知しました`);
        setTimeout(() => {
            let img = nativeImage.createFromPath(path);
            clipboard.writeImage(img);
            AppendLog(`画像をクリップボードにコピーしました`);
        }, 1000);
    });
}

$('#start').click(() => {
    console.log('Button id start is pushed');
    ToggleStatus();
});

$("#test").click(() => {
    // alert(status);
    dialog.showMessageBox(null, {
        type: 'info',
        buttons: ['OK'],
        title: 'フォルダ選択',
        message: '監視対象のフォルダを選択します。',
        detail: 'デフォルトのフォルダから変更していない場合、そのままフォルダを選択します。'
    }).then(() => OpenDirectory().then(result => {
        AppendLog(`監視対象フォルダを ${result.filePaths[0]} に設定しました`);
        $('#path').val(result.filePaths);
        StartChokidar(result.filePaths[0]);
    }));
});