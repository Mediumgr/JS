import firebase from 'firebase/app';
import 'firebase/storage';
import { upload } from './upload.js';

const firebaseConfig = {
  apiKey: 'AIzaSyC2G7b31YUvLlutGYqqL_as_gcKVmTdUYc',
  authDomain: 'upload-images-with-progress.firebaseapp.com',
  projectId: 'upload-images-with-progress',
  storageBucket: 'upload-images-with-progress.appspot.com',
  messagingSenderId: '843942784204',
  appId: '1:843942784204:web:18c3f987cafb19d47d6669',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      const ref = storage.ref(`images/${file.name}`);
      const task = ref.put(file);

      task.on(
        'state_changed',
        (snapshot) => {
          const percentage =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(
              0
            ) + '%';
          const block = blocks[index].querySelector('.preview-info-progress');
          block.textContent = percentage;
          block.style.width = percentage;
        },
        (error) => {
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            console.log('Download URL', url);
          });
        }
      );
    });
  },
});
