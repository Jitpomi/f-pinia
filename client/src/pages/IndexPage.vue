<template>
  <div class="column items-center bg-blue-1" style="min-height: 100vh;">
    <!--    <section class="bg-pink full-width row q-ma-none" style="position: relative; min-height: 100vh">
          <video autoplay muted loop id="myVideo" >
            <source src="../assets/salon.mp4" type="video/mp4">
          </video>
          <div class="custom-shape-divider-bottom-1660364774">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="visual" viewBox="0 0 960 540" width="960" height="540" version="1.1"><path d="M449 540L442.2 525C435.3 510 421.7 480 459.2 450C496.7 420 585.3 390 639.8 360C694.3 330 714.7 300 660.8 270C607 240 479 210 454.8 180C430.7 150 510.3 120 567.3 90C624.3 60 658.7 30 675.8 15L693 0L960 0L960 15C960 30 960 60 960 90C960 120 960 150 960 180C960 210 960 240 960 270C960 300 960 330 960 360C960 390 960 420 960 450C960 480 960 510 960 525L960 540Z" fill="#0066FF" stroke-linecap="round" stroke-linejoin="miter"/></svg>
          </div>
        </section>-->
    <h3>Upload</h3>
<div  class="q-gutter-xs justify-center items-center ">
  <div>
    <j-file-pond
      @upload-error="failed"
      @revert-success="reverted"
      @upload-success="success"
    />
  </div>
  <q-card v-if="img" class=" my-card" dark>
    <q-card-section horizontal>
      <q-img
        class="col"
        :src="img"
      />

      <q-card-actions vertical class="justify-around">
        <q-btn flat round color="red" icon="favorite" />
        <q-btn flat round color="accent" icon="bookmark" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
    </q-card-section>
  </q-card>
</div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import {useQuasar} from 'quasar';
  import JFilePond from 'components/j-uploader/JFilePond';

  const $q = useQuasar();
  const img = ref(null);


  function reverted() {
    img.value =null;
    $q.notify({
      type: 'positive',
      message: 'Successfully reverted upload',
    });
  }

  function success(val) {
    console.log(val);
    img.value = val;
    $q.notify({
      type: 'positive',
      message: 'Successfully uploaded',
    });
  }

  function failed(e) {
    $q.notify({
      type: 'negative',
      message: `upload error ${e.message}`,
    });
  }

  /* function loadUpload (source, load, error, progress, abort,) {
     // Should request a file object from the server here
     // ...
     console.log({source,load,progress,abort});
     // Can call the error method if something is wrong, should exit after
     error('oh my goodness');

     // Can call the header method to supply FilePond with early response header string
     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
     // headers(headersString);

     // Should call the progress method to update the progress to 100% before calling load
     // (endlessMode, loadedSize, totalSize)
     progress(true, 0, 1024);

     // Should call the load method with a file object or blob when done
     // load(file);

     // Should expose an abort method so the request can be cancelled
     return {
       abort: () => {
         // User tapped cancel, abort our ongoing actions here

         // Let FilePond know the request has been cancelled
         abort();
       },
     };
   }*/
</script>
<style lang="scss" scoped>
 .my-card{
   width: 100%;
   max-width: 350px;
 }
</style>
