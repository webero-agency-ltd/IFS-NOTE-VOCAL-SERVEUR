<template>
	<div>
        <div style="display: flex; flex-wrap : wrap ;">
            <div style="width: 50%;  min-width: 250px ; margin-top: 1rem; flex: 1;">
                <a-avatar v-if="!record"  src="/assets/img/microphone.svg" />
                <a-avatar v-if="record" src="/assets/img/microphone.active.svg" /> 
                <span style="border: none;font-size: 20px; padding-left: 10px; "> {{time}} </span>
            </div>
            <a-button-group style="width: 50%; min-width: 250px ; margin-top: 1rem;  display: flex;  flex: 1;">
                <a-button v-bind:class="{ active: btn.recordButton }" :loading="btn.recordLoader" :disabled="!btn.recordButton" @click="startRecording" style="display: block; flex: 1;" class="btn-recorder">Record</a-button>
                <a-button v-bind:class="{ active: btn.stopButton }" :disabled="!btn.stopButton" @click="stopRecording" style="display: block; flex: 1;" ghost class="btn-stop">Stop</a-button>
                <a-button v-bind:class="{ active: btn.uploadButton }" :disabled="!btn.uploadButton" @click="startUpload" style="display: block; flex: 1;" ghost class="btn-upload">Télécharger</a-button>
            </a-button-group>
            <input @change="uploadFile" style="position: absolute; top: -30000px; left: -30000px;" type="file" id="audio-upload" name="avatar" accept="audio/*">
        </div>  
        <div id="vocale-listen"></div>    
    </div>
</template>
<script>

    import timer from '../libs/timer';
    import Recorder from '../libs/recoder';
    import { createNamespacedHelpers } from 'vuex';
    import store from '../store/';
    import listen from '../libs/listen';

	export default {
		props : ['placedata'], 
		data(){
            return {
                AudioContext : null , 
                audioContext : null , 
                chrono : null ,
                gumStream : null , 
                rec: null , 
                input : null ,
                time : '00m : 00s' ,
                record : false ,
                btn : {
                    stopButton : false , 
                    recordButton : true , 
                    uploadButton : true , 
                    recordLoader : false , 
                }
            }
        },
        watch : {
            placedata : function () {
                if ( this.placedata ) {
                    let url =  window.urlapplication+'/audio/'+this.placedata;
                    new listen( 'vocale-listen' , url , 'audio-liste-note-record' )
                }
            }
        },
        methods : {

            stopRecording() {
                console.log("stopButton clicked");
                this.record = false ;
                this.btn.stopButton = false;
                this.btn.recordButton = true;
                this.btn.uploadButton = true; 
                this.rec.stop();
                this.chrono.stop() ; 
                this.gumStream.getAudioTracks()[0].stop();
                this.rec.exportWAV(this.createDownloadLink);
            },

            startRecording() {
                console.log("recordButton clicked");
                var constraints = { audio: true, video:false }
                this.btn.recordButton = false;
                this.btn.stopButton = true;
                this.btn.uploadButton = false; 
                this.btn.recordLoader = true ;
                //pauseButton.disabled = false
                navigator.mediaDevices.getUserMedia(constraints).then( (stream) => {
                    console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
                    this.btn.recordLoader = false ;
                    this.audioContext = new this.AudioContext();
                    this.gumStream = stream;
                    this.input = this.audioContext.createMediaStreamSource(stream);
                    this.rec = new Recorder(this.input,{numChannels:1})
                    this.rec.record()
                    this.chrono.start() ;
                    this.record = true ;
                }).catch( (err) => {
                    console.log( err )
                    this.record = false ;
                    this.btn.recordButton = true;
                    this.btn.stopButton = false;
                    this.btn.uploadButton = true; 
                    this.btn.recordLoader = false ;
                });
            },

            createDownloadLink(blob) {
                if ( this.recorder ) {
                    this.recorder( blob )
                }
            },

            uploadFile( upload ){
                if ( this.recorder ) {
                    this.recorder( upload.target.files[0] )
                }
            },

            pauseRecording(){},

            async init(){
                await this.$nextTick() ; 
                listen.event() ; 
                this.InitRecorder() ; 
            },

            async recorder( blob ){
                console.log( blob )
                var url = URL.createObjectURL(blob);
                new listen( 'vocale-listen' , url , 'audio-liste-note-record' )
                this.emit('note-vocal-changed',blob)
            },

            async startUpload( ){
                document.getElementById("audio-upload").click();
            },

            async InitRecorder(){

                URL = window.URL || window.webkitURL;                   
                var rec;                           
                var input;  

                this.chrono = timer() ;
                this.chrono.setcallback( ( time ) => {
                    this.time = time ; 
                })

                this.AudioContext = window.AudioContext || window.webkitAudioContext;
                this.audioContext //audio context to help us record
            }
        },

		mounted(){
            this.init() ; 
		}

	}
</script>

<style>
    .btn-recorder{
        background-color: #ff0000 !important;
        border-color: #da1212 !important;
        color : #000 !important;
    }
    .btn-recorder:disabled {
        color: #404040 !important;
        background-color: #e7e8e8 !important;
        border-color: #b7b7b7 !important;
    }
    .btn-upload{
        background-color: #02bb07 !important;
        border-color: #037106  !important;
        color : #000 !important;
    }
    .btn-stop{
        background-color: #00a1ff !important;
        border-color: #0076bb;
        color : #000 !important;
    }
    .btn-upload:disabled  {
        color: #404040 !important;
        background-color: #e7e8e8 !important;
        border-color: #b7b7b7 !important;
    }
    .btn-stop:disabled {
        color: #404040 !important;
        background-color: #e7e8e8 !important;
        border-color: #b7b7b7 !important;
    }
    .ant-select-dropdown-menu-item{
        min-height: 32px;
    }
</style>