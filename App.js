import React, { Component } from 'react';
import * as jsPDF from 'jspdf';
import * as Blob from 'blob';
import './App.css';


class App extends Component {
  downloadpdf(){
    //this function is called when button 'Download PDF' is clicked
    //Client can download the PDF file after the button click     
    var authorsfname = ["Paulo", "Charles"];				//list of Authors first name
    var authorslname = ["Coelho", "Dickens"];				//list of Authors surname
    var titles = ["The Alchemist", "Great Expectations"];		//list of titles
    var places = ["San Francisco", "New York"];				//list of Publication Places
    var date = ["1998", "1942"];					//list of year of publication
    var str = "<html><body>";				//str is a html string
    for(var i=0; i<authorsfname.length; i++){				//This loop prepares required html string
      str += "<p align='center' style= 'font-family:Times New Roman'>";
      str += authorslname[i];
      str += ", ";
      str += authorsfname[i];
      str += ". <i>"+titles[i]+". </i>"
      str += places[i];
      str += ", "+date[i]+". Print.";
      str += "</p>";
    }
    str += "</body></html>"    
    var doc = new jsPDF();
    doc.fromHTML(str, 40, 10);						//Convert html string into jsPDF instances
    doc.save('MLA.pdf');						//Saves the doc instances as MLA.pdf, user can change the name of the 
									//file while downloading
  }

  downloadDocx(){
    //this function is called when button 'Download Docx' is clicked
    //Client can download the Docx file after the button click     
    var authorsfname = ["Paulo", "Charles"];
    var authorslname = ["Coelho", "Dickens"];
    var titles = ["The Alchemist", "Great Expectations"];
    var places = ["San Francisco", "New York"];
    var date = ["1998", "1942"];
    var str = "<html><body>";
    for(var i=0; i<authorsfname.length; i++){
      str += "<p align='center' style='font-family:Times New Roman'>";
      str += authorslname[i];
      str += ", ";
      str += authorsfname[i];
      str += ". <i>"+titles[i]+". </i>"
      str += places[i];
      str += ", "+date[i]+". Print.";
      str += "</p>";
    }
    str += "</body></html>";
    var blob = new Blob(['\ufeff', str], {				//converts html string into blob(Binary Large Object) of type msword
      type: 'application/msword'
    });
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(str);
    var filename = "MLA.docx";						//file is downloaded as MLA.docx, user can change it while downloading
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

  downloadHtml(){
    //this function is called when button 'Download HTML' is clicked
    //Client can download the HTML file after the button click     
    var authorsfname = ["Paulo", "Charles"];
    var authorslname = ["Coelho", "Dickens"];
    var titles = ["The Alchemist", "Great Expectations"];
    var places = ["San Francisco", "New York"];
    var date = ["1998", "1942"];
    var str = "<html><body>"
    for(var i=0; i<authorsfname.length; i++){
      str += "<p align='center' style='font-family:Times New Roman'>";
      str += authorslname[i];
      str += ", ";
      str += authorsfname[i];
      str += ". <i>"+titles[i]+". </i>"
      str += places[i];
      str += ", "+date[i]+". Print.";
      str += "</p>";
    }
    str += "</body></html>";
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
    element.setAttribute('download', "MLA.html");
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
          <button onClick={this.downloadpdf}>Download PDF </button><br/><br/>
          <button onClick={this.downloadDocx}>Download Docx </button><br/><br/>
          <button onClick={this.downloadHtml}>Download HTML </button><br/><br/>
      </div>
    );
  }
}

export default App;
