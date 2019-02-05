import React, { Component } from 'react';
import * as jsPDF from 'jspdf';
import * as Blob from 'blob';
import './App.css';


class App extends Component {
  	constructor(props){
		super(props);
		//this data will be obtained from database
		this.authorsfname = [["Paulo"], ["Charles"], ["Thomas John", "Gerald R."]];					//list of Authors first name, there can be multiple authors so it is list of list
		this.authorslname = [["Coelho"],["Dickens"], ["Crowley", "North"]];			       			//list of Authors surname, there can be multiple authors so it is list of list
		this.titles       = ["The Alchemist", "Great Expectations", "Paleoclimatology"];			//list of titles
		this.places       = ["San Francisco", "New York", "London"];			    	   			//list of Publication Places
		this.date         = ["1998", "1942", "1991"];                                       		//list of year of publication
		this.publisher    = ["Harper Collins","Chapman & Hall", "Oxford University Press"]			//list of publisher

		//html string for MLA, APA and IEEE respectively.
		this.mlastr       = "<html><body style= 'font-family:Times New Roman font-size: 12px'>";	//mla formatted html string
		this.apastr       = "<html><body style= 'font-family:Times New Roman font-size: 12px'>";	//apa formatted html string
		this.ieeestr      = "<html><body style= 'font-family:Times New Roman; font-size: 11px'>"; 	//ieee formatted html string                                                                       //str is a html string
		for(var i=0; i<this.authorsfname.length; i++){				                    			//This loop prepares required html string
			this.mlastr += "<p align='center'>";
			this.apastr += "<p align='center'>";
			this.ieeestr+= "<p align='center'>"  
			for(var j= 0; j<this.authorsfname[i].length; j++){										//this loop is required because there can be multiple authors
				this.mlastr += this.authorslname[i][j]+", "+this.authorsfname[i][j];
				this.apastr += this.authorslname[i][j]+", "+this.authorsfname[i][j][0];
				this.ieeestr += this.authorsfname[i][j][0]+". "+this.authorslname[i][j];
				if(j == this.authorsfname[i].length - 2){
					this.mlastr += ", and ";
					this.apastr += "., & ";
					this.ieeestr += " and ";
				}
				else if(j < this.authorsfname[i].length - 2){
					this.mlastr += ", ";
					this.apastr += "., ";
					this.ieeestr += ", "
				}
			}

			this.mlastr += ". <i>"+this.titles[i]+". </i>";
			this.apastr += ". ("+this.date[i]+")";
			this.ieeestr += ", <i>"+this.titles[i]+", </i>";

			this.mlastr += this.places[i] + ": " + this.publisher[i];
			this.apastr += ". <i>"+this.titles[i]+". </i>"
			this.ieeestr += this.places[i] + ": " + this.publisher[i];


			this.mlastr += ". "+this.date[i]+". Print.";
			this.apastr += this.places[i] + ": " + this.publisher[i]+". Print.";
			this.ieeestr += ", "+this.date[i]+". Print."

			this.mlastr += "</p>";                     
			this.apastr += "</p>";  
			this.ieeestr += "</p>"          
		}
		this.mlastr += "</body></html>"
		this.apastr += "</body></html>"    
		this.ieeestr += "</body></html>"    
  	}

  	downloadPdfMla = () => {
		//function name is self contained     
		var doc = new jsPDF();
		doc.fromHTML(this.mlastr, 40, 10);					                  	         		//Convert html string into jsPDF instances
		doc.save('MLA.pdf');					          	                             		//Saves the doc instances as MLA.pdf, user can change the name of the 
																								//file while downloading
  	}


	downloadDocxMla = () => {
		//function name is self contained        
		var blob = new Blob(['\ufeff', this.mlastr], {				                    		//converts html string into blob(Binary Large Object) of type msword
		type: 'application/msword'
		});
		var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(this.mlastr);
		var filename = "MLA.docx";						                                 		//file is downloaded as MLA.docx, user can change it while downloading
		var downloadLink = document.createElement("a");			
		document.body.appendChild(downloadLink);
		if(navigator.msSaveOrOpenBlob ){
			navigator.msSaveOrOpenBlob(blob, filename);
		}else{
			downloadLink.href = url;
			downloadLink.download = filename;
			downloadLink.click();
		}
		document.body.removeChild(downloadLink);  
	}

	downloadHtmlMla = () => {
		//function name is self contained     
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.mlastr));
		element.setAttribute('download', "MLA.html");
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	downloadPdfApa = () => {
		//function name is self contained     
		var doc = new jsPDF();
		doc.fromHTML(this.apastr, 40, 10);					                  	               
		doc.save('APA.pdf');					          	                                  
	}


	downloadDocxApa = () => {
		//function name is self contained        
		var blob = new Blob(['\ufeff', this.apastr], {				                          
		type: 'application/msword'
		});
		var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(this.apastr);
		var filename = "APA.docx";						                                      
		var downloadLink = document.createElement("a");			
		document.body.appendChild(downloadLink);
		if(navigator.msSaveOrOpenBlob ){
			navigator.msSaveOrOpenBlob(blob, filename);
		}else{
			downloadLink.href = url;
			downloadLink.download = filename;
			downloadLink.click();
		}
		document.body.removeChild(downloadLink);  
	}

	downloadHtmlApa = () => {
		//function name is self contained     
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.apastr));
		element.setAttribute('download', "APA.html");
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	downloadPdfIeee = () => {
		//function name is self contained     
		var doc = new jsPDF();
		doc.fromHTML(this.ieeestr, 40, 10);					                  	             
		doc.save('IEEE.pdf');					          	                                  
	}


	downloadDocxIeee = () => {
		//function name is self contained        
		var blob = new Blob(['\ufeff', this.ieeestr], {				                          
		type: 'application/msword'
		});
		var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(this.ieeestr);
		var filename = "IEEE.docx";						                                      
		var downloadLink = document.createElement("a");			
		document.body.appendChild(downloadLink);
		if(navigator.msSaveOrOpenBlob ){
			navigator.msSaveOrOpenBlob(blob, filename);
		}else{
			downloadLink.href = url;
			downloadLink.download = filename;
			downloadLink.click();
		}
		document.body.removeChild(downloadLink);  
	}

	downloadHtmlIeee = () => {
		//function name is self contained     
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.ieeestr));
		element.setAttribute('download', "IEEE.html");
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}


	render() {
		return (
		<div className="App">
			<br/><br/>
			Coelho, Paulo. <i>The Alchemist.</i> San Francisco, 1998. Print.<br /><br/>
			Dickens, Charles. <i>Great Expectations.</i> New York, 1942. Print.<br /><br />
			<button onClick={this.downloadPdfMla}>Download MLA PDF </button><br/><br/>
			<button onClick={this.downloadDocxMla}>Download MLA Docx </button><br/><br/> 
			<button onClick={this.downloadHtmlMla}>Download MLA HTML </button><br/><br/> 
			<button onClick={this.downloadPdfApa}>Download APA PDF </button><br/><br/>
			<button onClick={this.downloadDocxApa}>Download APA Docx </button><br/><br/> 
			<button onClick={this.downloadHtmlApa}>Download APA HTML </button><br/><br/>
			<button onClick={this.downloadPdfIeee}>Download IEEE PDF </button><br/><br/>
			<button onClick={this.downloadDocxIeee}>Download IEEE Docx </button><br/><br/> 
			<button onClick={this.downloadHtmlIeee}>Download IEEE HTML </button><br/><br/> 
		</div>
		);
  	}
}

export default App;
