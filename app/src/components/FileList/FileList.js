import React, { Component } from 'react';
import Firebase from '../../firebaseInit.js';
import './FileList.css';

const database = Firebase.database();

class FileList extends Component {
	state = {
		files: []
	};

	fetchFileList() {
		console.log('fetching list');
		database.ref('filesURL').once('value')
    		.then(function(snapshot) {
	      		//console.log(snapshot.val());
	      		const snap = snapshot.val();
	      		var files = [];
	      		for (var property in snap) {
	      			var file = {};
	        		file.fileName = snap[property].fileName;
	        		file.fileId = property;
	        		file.fileURL = snap[property].fileURL;
	        		files.push(file);
	      		}
	      		//console.log(files);
	      		return files;
    		})
    		.then((files) => 
      			this.setState({ files: files })
    		)
    };

	componentWillMount () {
		this.fetchFileList();
	};

	listUpdateHandler = () => {
		this.fetchFileList();
	}

	render () {
		//console.log(this.state.files);
    	
	    const updatedURL = this.state.files.map(file => {
	    	const uploadDate = new Date(Number(file.fileId)).toISOString().split('T')[0];
	    	return (
	    		<tr key={file.fileId}>
    				<td>
		        		<a href={file.fileURL} 
		        			target="_blank">{file.fileName}
		        		</a>
	        		</td>
	        		<td>{uploadDate}</td>
	        	</tr>
	      	);
	    });
    
		return (
			<div>
				<div className='card3'>
					<p> All the files in the directory. Fetch one by clicking the link.</p>
					<button id='file-list' onClick={this.listUpdateHandler}>Refresh</button>
					<table>
						<thead>
							<tr>
								<th>File Name</th>
								<th>Upload Time</th>
							</tr>
						</thead>
						<tbody>
	            			{updatedURL}
	            		</tbody>
	            	</table>
	          	</div>
          	</div>
		)
	}
}

export default FileList;