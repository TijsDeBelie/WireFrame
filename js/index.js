var video = document.getElementById('video');

let images = [];


function cameraLoad() {
    loadSettings();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            video.srcObject = stream;
            video.play();
        });

        document.getElementById("snap").addEventListener("click", function () {
            capture();

        });
    }
}

function capture() {
    var canvas = document.getElementById('canvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;


    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    canvas.toBlob((blob) => {
        const img = new Image();
        img.src = window.URL.createObjectURL(blob)

        images.push(img)
        console.log(img)

        download(blob, "test", "img")
    })
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function loadImages() {
    var gallery = document.getElementById('gallery');
    console.log(images)
    images.forEach((element, id) => {

        console.log(element)
        var canvas = document.createElement('canvas');
        canvas.id = `img${id}`;
        canvas.width = 1224;
        canvas.height = 768;
        canvas.style.zIndex = 8;

        canvas.src = element;

        gallery.appendChild(canvas)
    });



}




let settings_screen = document.getElementById("settings_screen")


function loadSettings() {
    document.getElementById("settings").addEventListener("click", function () {
        settings_screen.classList.add("open_settings");
    })

    document.getElementById("close_settings").addEventListener("click", function () {
        settings_screen.classList.remove("open_settings");
    })
}
