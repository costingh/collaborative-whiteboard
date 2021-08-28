import React, {useState} from 'react'
import styles from '../styles/FileUploader.module.scss'


function FileUploader({setShowFileUploader, setTextReadFromFile}) {
    const [message, setMessage] = useState('Please upload a file!');

    const showFile = () => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var preview = document.getElementById('show-text');
            var file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader()

            var textFile = /text.*/;

            if (file.type.match(textFile)) {
                reader.onload = function (event) {
                    preview.innerHTML = event.target.result;
                }
            } else {
                preview.innerHTML = "<span class='error'>No file!</span>";
            }
            reader.readAsText(file);

            reader.onload = function(e) {
                setTextReadFromFile(e.target.result);
                setMessage('File uploaded successfully!');
                setShowFileUploader(false);
            };

        } else {
            setMessage('There was an error uploading your file. Please try again!');
        }
    }

    const closeFileUploader = () => {
        setShowFileUploader(false);
    }

    return (
        <div className={styles.fileUploader}>
            <input type="file" onChange={showFile}/>
            <div id="show-text">{message}</div>
            <div className={styles.icon} onClick={closeFileUploader}>Cancel</div>
        </div>
    );
}

export default FileUploader
