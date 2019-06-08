"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var timer_1 = __importDefault(require("../libs/timer"));
var recoder_1 = __importDefault(require("../libs/recoder"));
var Vocale = /** @class */ (function () {
    function Vocale(content) {
        URL = window.URL || window.webkitURL;
        var gumStream;
        var rec;
        var input;
        var chrono;
        chrono = timer_1.default();
        chrono.setcallback(function (time) {
            document.getElementById('counter-recorded').value = time;
        });
        //.reset() ;         
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext; //audio context to help us record
        var recordButton = document.getElementById("recordButton");
        var stopButton = document.getElementById("stopButton");
        var pauseButton = document.getElementById("pauseButton");
        var logoRecorder = document.getElementById("logo-recorded");
        var recorderInfo = document.getElementById("recorder-info");
        var uploadButton = document.getElementById("uploadButton");
        var audioUpload = document.getElementById("audio-upload");
        recordButton.addEventListener("click", startRecording);
        stopButton.addEventListener("click", stopRecording);
        uploadButton.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById("audio-upload").click();
        });
        audioUpload.addEventListener("change", uploadFile);
        //pauseButton.addEventListener("click", pauseRecording);
        var $this = this;
        //ici on veut faire l'upload de fichier 
        function uploadFile(upload) {
            if ($this.recorder) {
                $this.recorder(upload.target.files[0]);
            }
        }
        function startRecording() {
            console.log("recordButton clicked");
            var constraints = { audio: true, video: false };
            recordButton.disabled = true;
            stopButton.disabled = false;
            //pauseButton.disabled = false
            navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
                audioContext = new AudioContext();
                //document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"
                gumStream = stream;
                input = audioContext.createMediaStreamSource(stream);
                rec = new recoder_1.default(input, { numChannels: 1 });
                rec.record();
                chrono.start();
                recorderInfo.style.display = 'block';
                //logoRecorder.addClass('active') ;
                // element.classList.add("mystyle"); 
            }).catch(function (err) {
                console.log(err);
                recordButton.disabled = false;
                stopButton.disabled = true;
                //pauseButton.disabled = true
            });
        }
        function pauseRecording() {
            console.log("pauseButton clicked rec.recording=", rec.recording);
            if (rec.recording) {
                //pause
                rec.stop();
                pauseButton.innerHTML = "Resume";
            }
            else {
                //resume
                rec.record();
                pauseButton.innerHTML = "Pause";
            }
        }
        function stopRecording() {
            console.log("stopButton clicked");
            stopButton.disabled = true;
            recordButton.disabled = false;
            //pauseButton.disabled = true;
            //pauseButton.innerHTML="Pause";
            rec.stop();
            chrono.stop();
            gumStream.getAudioTracks()[0].stop();
            rec.exportWAV(createDownloadLink);
            recorderInfo.style.display = 'none';
        }
        function createDownloadLink(blob) {
            if ($this.recorder) {
                $this.recorder(blob);
            }
            return;
            var li = document.createElement('div');
            var link = document.createElement('a');
            var filename = new Date().toISOString();
            link.href = url;
            link.download = filename + ".wav";
            //li.appendChild(document.createTextNode(filename+".wav "))
            li.appendChild(link);
            var upload = document.createElement('a');
            upload.href = "#";
            upload.innerHTML = "Upload";
            upload.addEventListener("click", function (event) {
                console.log('--- UPLOAD');
                var xhr = new XMLHttpRequest();
                xhr.onload = function (e) {
                    if (this.readyState === 4) {
                        console.log("Server returned: ", e.target.responseText);
                    }
                };
                var fd = new FormData();
                fd.append("audio_data", blob, filename);
                xhr.open("POST", "upload.php", true);
                xhr.send(fd);
            });
            recordingsList.appendChild(li);
        }
    }
    Vocale.init = function (content) {
        var tpl = "<div id=\"recorder-info\" style=\"display: none;\">\n            <div style=\"display: flex;\">\n                <div id=\"logo-recorded\" class=\"recorder-style active \"></div>\n            <input id=\"counter-recorded\" style=\"width: 100px; margin-left: 6px;\" disabled=\"disabled\" name=\"timer\" type=\"text\" value=\"00 : 00\" />\n            </div>\n        </div>\n        <div id=\"controls\" style=\"display:flex;\">\n            <button class=\"btn btn-info btn-block\" id=\"recordButton\">Record</button>\n            <!--<button id=\"pauseButton\" disabled>Pause</button>-->\n            <button class=\"btn btn-info btn-block\" id=\"stopButton\" disabled>Stop</button>\n            <!--<button id=\"deleteButton\" disabled>Effacer</button>-->\n            <button class=\"btn btn-info btn-block\" id=\"uploadButton\">T\u00E9l\u00E9charger</button>\n            <input style=\"position: absolute; top: -30000px; left: -30000px;\" type=\"file\" id=\"audio-upload\" name=\"avatar\" accept=\"audio/*\">\n        </div>\n        <style>\n            .btn-info.disabled, .btn-info:disabled {\n                color: #191919 !important;\n                background-color: #b3d1e0 !important;\n                border-color: #191919 !important;\n            }\n        </style>\n        <div id=\"recordingsList\"></div>";
        var c = document.getElementById(content);
        if (c) {
            c.innerHTML = tpl;
            return true;
        }
        return false;
    };
    return Vocale;
}());
exports.Vocale = Vocale;
exports.default = Vocale;
