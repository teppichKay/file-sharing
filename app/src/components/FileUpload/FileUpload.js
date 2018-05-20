import React, { Component } from 'react';
import  './FileUpload.css';
import Firebase from '../../firebaseInit.js';

const database = Firebase.database();

class FileUpload extends Component {

	state = {
		warningOpen: false,
		fileToUpload: null,
		successOpen: false
	};


	handleClose = (label) => {
		if (label === 'warning') 
			this.setState({ warningOpen: false });
		else if (label === 'success') 
			this.setState({ successOpen: false });
	};

	fileChangedHandler = (event) => {
	    event.preventDefault();

	    const file = event.target.files[0];
	    console.log(file);
	    this.setState({ fileToUpload: file });
	};

	fileSubmitHandler = () => {
		// handle error
		//console.log(this.state.fileToUpload);

		if (this.state.fileToUpload === null || this.state.fileToUpload === undefined) {
			this.setState({ warningOpen: true });
		}
		else {
			// create a root reference of firebase storage
		    const storageRef = Firebase.storage().ref();

		    const fileID = +(new Date());
		    const name = fileID + '-' + this.state.fileToUpload.name;
		    const metadata = { contentType: this.state.fileToUpload.type };

		    // write data to firebase storage and write metadata to firebase realtime database
		    const task = storageRef.child(name).put(this.state.fileToUpload, metadata);
		    task.then(() => {
		    	storageRef.child(name).getDownloadURL()
		    	.then((url) => {
		        	console.log(url);
		        	database.ref('filesURL/'+ fileID).set({
		          		fileURL: url,
		          		fileName: name
		        	})

		      	})
		      	.then(() => {
		      		// if everything's fine, update states
				    this.setState({ 
				    	successOpen: true,
				    	fileToUpload: null 
				    });
		      	})
		      	.catch((err) => {
		        	console.log('here ', err);
		      	}) 
		    });

		   
		}
		
	};

	render () {
		let modal = null;
		if (this.state.warningOpen) {
			//console.log('hi');
			modal = (
				<div id="warning-info" onClick={() => this.handleClose('warning')}>
					Please Selecte a File.
				</div>
			)
		}
		if (this.state.successOpen) {
			console.log('success modal open');
			modal = (
				<div id="success-info" onClick={() => this.handleClose('success')}>
					Upload Success!
				</div>
			)
		}
		
		return (
			<div>
				{modal}
				<div className="card">
					<p>Choose a file to upload</p>
		          	<input type="file" onChange={this.fileChangedHandler} />
		          	<button id='file-upload' onClick={this.fileSubmitHandler}>Save</button>
		        </div>
			</div>
		);
		
	}
}

export default FileUpload;