import * as jsPDF from 'jspdf';
import * as Blob from 'blob';

function downloader(JsonData, bibFormat, fileFormat){
    console.log(JsonData, bibFormat, fileFormat);
    if(bibFormat === 'mla'){
         var mlastr       = "<html><body style= 'font-family:Times New Roman font-size: 12px'>";	
		for(var i=0; i<JsonData.length; i++){				                    			
            mlastr += "<p>";
            mlastr += '['+(i+1).toString()+"] ";
            var authorsList = JsonData[i].authors.split(",");
			for(var j= 0; j<authorsList.length; j++){
                var authorstr = authorsList[j];
                var authorstrList = authorstr.split(' ');
                mlastr += authorstrList[authorstrList.length -1]+", ";
                for(var abc = 0; abc < authorstrList.length -2 ; abc ++){
                    mlastr += authorstrList[abc]+' ';
                }
                if(authorstrList.length >= 2){
                    mlastr += authorstrList[authorstrList.length - 2]
                }
				if(j == authorsList.length - 2){
					mlastr += ", and ";
				}
				else if(j < authorsList.length - 2){
					mlastr += ", ";
				}
			}
			mlastr += ". <i>"+JsonData[i].title+". </i>";
			mlastr += JsonData[i].city + ": " + JsonData[i].publisher;
			mlastr += ". "+JsonData[i].year;
			mlastr += "</p>";                     
		}
        mlastr += "</body></html>";
        if(fileFormat === 'pdf'){
            var doc = new jsPDF('p', 'pt', 'letter');
		    doc.fromHTML(mlastr, 45, 30, {width: 517});					                  	         		//Convert html string into jsPDF instances
		    doc.save('MLA.pdf');
        }
        if(fileFormat === 'docx'){
            var blob = new Blob(['\ufeff', mlastr], {				                    		//converts html string into blob(Binary Large Object) of type msword
                type: 'application/msword'
                });
                var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(mlastr);
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
        if(fileFormat === 'html'){
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(mlastr));
            element.setAttribute('download', "MLA.html");
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
    if(bibFormat == 'apa'){
        var apastr       = "<html><body style= 'font-family:Times New Roman font-size: 12px'>";	//apa formatted html string
		for(var i=0; i<JsonData.length; i++){				                    			//This loop prepares required html string
            apastr += "<p>";
            apastr += '['+(i+1).toString()+"] ";
            var authorsList = JsonData[i].authors.split(",");
			for(var j= 0; j<authorsList.length; j++){
                var authorstr = authorsList[j];
                var authorstrList = authorstr.split(' ');
                apastr += authorstrList[authorstrList.length -1]+", ";
                for(var abc = 0; abc < authorstrList.length -2 ; abc ++){
                    if(authorstr[0] == ' ' && abc == 0)
                        continue;
                  apastr +=   authorstrList[abc][0]+'. ';
                }
                  if(authorstrList.length >= 2){
                        apastr += authorstrList[authorstrList.length - 2][0]+'.';
                    }
                    if(j == authorsList.length - 2){
                        apastr += ", & ";
                    }
                    else if(j < authorsList.length - 2){
                        apastr += ", ";
                    }
                }
	        apastr += ". ("+JsonData[i].year+")";
            apastr += ". <i>"+JsonData[i].title+". </i>"
	        apastr += JsonData[i].city + ": " + JsonData[i].publisher;
            apastr += "</p>";
        }
        apastr += "</body></html>";
        if(fileFormat === 'pdf'){
            var doc = new jsPDF('p', 'pt', 'letter');
		    doc.fromHTML(apastr, 45, 30, {width: 517});					                  	         		//Convert html string into jsPDF instances
		    doc.save('APA.pdf');
        }
        if(fileFormat === 'docx'){
            var blob = new Blob(['\ufeff', apastr], {				                    		//converts html string into blob(Binary Large Object) of type msword
                type: 'application/msword'
                });
                var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(apastr);
                var filename = "APA.docx";						                                 		//file is downloaded as MLA.docx, user can change it while downloading
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
        if(fileFormat === 'html'){
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(apastr));
            element.setAttribute('download', "APA.html");
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
    if(bibFormat === 'ieee'){
        var ieeestr      = "<html><body style= 'font-family:Times New Roman; font-size: 11px'>";   //ieee formatted html string                                                                       //str is a html string
        for(var i=0; i<JsonData.length; i++){
            ieeestr+= "<p>"  
            ieeestr += '['+(i+1).toString()+"] ";
            var authorsList = JsonData[i].authors.split(",");
			for(var j= 0; j<authorsList.length; j++){
                var authorstr = authorsList[j];
                var authorstrList = authorstr.split(' ');
                if(authorstrList.length > 1){
                    if(authorstr[0] != ' '){
                        ieeestr += authorstrList[0][0]+". ";
                        var star = 1; 
                    }               
                    else{
                        ieeestr += authorstrList[1][0]+". ";
                        var star = 2;
                    }
                }
                else
                    ieeestr += authorstrList[0]+". ";
                for(var abc = star; abc <= authorstrList.length -2 ; abc++){
                    ieeestr += authorstrList[abc][0]+'. ';
                }
                ieeestr += authorstrList[authorstrList.length - 1];
				if(j == authorsList.length - 2){
					ieeestr += ", and ";
				}
				else if(j < authorsList.length - 2){
					ieeestr += ", ";
				}
			}
            ieeestr += ", <i>"+JsonData[i].title+", </i>";
            ieeestr += JsonData[i].city + ": " + JsonData[i].publisher;
            ieeestr += ", "+JsonData[i].year;
            ieeestr += "</p>";
        }
        ieeestr += "</body></html>" ;
        if(fileFormat === 'pdf'){
            var doc = new jsPDF('p', 'pt', 'letter');
		    doc.fromHTML(ieeestr, 45, 30, {width: 517});					                  	         		//Convert html string into jsPDF instances
		    doc.save('IEEE.pdf');
        }
        if(fileFormat === 'docx'){
            var blob = new Blob(['\ufeff', ieeestr], {				                    		//converts html string into blob(Binary Large Object) of type msword
                type: 'application/msword'
                });
                var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(ieeestr);
                var filename = "IEEE.docx";						                                 		//file is downloaded as MLA.docx, user can change it while downloading
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
        if(fileFormat === 'html'){
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ieeestr));
            element.setAttribute('download', "IEEE.html");
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
}

export default downloader;