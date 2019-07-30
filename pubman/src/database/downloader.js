import * as jsPDF from 'jspdf';
import * as Blob from 'blob';
 
 
 
function downloader(JsonData, bibFormat, fileFormat){
    if(bibFormat === 'mla'){
         var mlastr       = "<html><body style= 'font-family:Times New Roman font-size: 12px'>";   
        for(var i=0; i<JsonData.length; i++){                                              
            mlastr += "<p>";
            mlastr += '['+(i+1).toString()+"] ";
            var authorsList = JsonData[i].authors.split(",");
            for(var j= 0; j<authorsList.length; j++){
                var authorstr = authorsList[j];
                var authorstrList = authorstr.split(' ');
                mlastr += authorstrList[authorstrList.length -1].charAt(0).toUpperCase() + authorstrList[authorstrList.length -1].slice(1)+", ";
                for(var abc = 0; abc < authorstrList.length -2 ; abc ++){
                    mlastr += authorstrList[abc]+' ';
                }
                if(authorstrList.length >= 2){
                    mlastr += authorstrList[authorstrList.length - 2].charAt(0).toUpperCase() + authorstrList[authorstrList.length - 2].slice(1);
                }
                if(j == authorsList.length - 2){
                    mlastr += ", and ";
                }
                else if(j < authorsList.length - 2){
                    mlastr += ", ";
                }
            }
            if(JsonData[i].hasOwnProperty("chapter_title")){
                mlastr += `. "`+JsonData[i].chapter_title+`." `;
                mlastr += "<i>"+JsonData[i].book_title + '.</i>';
            }
            else{
                mlastr += ". <i>"+JsonData[i].title+". </i>";
            }
 
            if(JsonData[i].hasOwnProperty("journal_name"))
                mlastr += "In "+ JsonData[i].journal_name + ", ";
 
            if(JsonData[i].hasOwnProperty("conference_publication_name"))
                mlastr += "In "+ JsonData[i].conference_publication_name + ", ";
 
            if(JsonData[i].hasOwnProperty("chapter"))
                mlastr += ", chap."+ JsonData[i].chapter + ", ";    
 
            if(JsonData[i].hasOwnProperty("issn"))
                mlastr += "ISSN: "+ JsonData[i].issn + ", ";

            if(JsonData[i].hasOwnProperty("isbn"))
                mlastr += "ISBN: "+ JsonData[i].isbn + ", ";

            if(JsonData[i].hasOwnProperty("doi"))
                mlastr += "DOI: "+ JsonData[i].doi + ", ";  
 
            if(JsonData[i].hasOwnProperty("city")){
                mlastr += JsonData[i].city;
                if(JsonData[i].hasOwnProperty("country"))
                mlastr += ", "+JsonData[i].country + ": ";    
                else
                    mlastr += ": " ;        
            }
            if(JsonData[i].hasOwnProperty("publisher"))
                mlastr +=  JsonData[i].publisher + ", ";  
       
            if(JsonData[i].hasOwnProperty("pages"))
                mlastr += "pp. "+ JsonData[i].pages + ", ";  
 
            mlastr += "(";
            if(JsonData[i].hasOwnProperty("month"))
                mlastr +=  JsonData[i].month + " ";  
 
            if(JsonData[i].hasOwnProperty("day"))
                mlastr +=  JsonData[i].day + ", ";  
           
            mlastr += JsonData[i].year +")";
            mlastr += "</p>";                    
        }
        mlastr += "</body></html>";
        if(fileFormat === 'pdf'){
            var doc = new jsPDF('p', 'pt', 'letter');
            doc.fromHTML(mlastr, 45, 30, {width: 517});                                                     //Convert html string into jsPDF instances
            doc.save('MLA.pdf');
        }
        if(fileFormat === 'docx'){
            var blob = new Blob(['\ufeff', mlastr], {                                           //converts html string into blob(Binary Large Object) of type msword
                type: 'application/msword'
                });
                var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(mlastr);
                var filename = "MLA.docx";                                                              //file is downloaded as MLA.docx, user can change it while downloading
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
        var apastr       = "<html><body style= 'font-family:Times New Roman font-size: 12px'>"; //apa formatted html string
        for(var i=0; i<JsonData.length; i++){                                               //This loop prepares required html string
            apastr += "<p>";
            apastr += '['+(i+1).toString()+"] ";
            var authorsList = JsonData[i].authors.split(",");
            for(var j= 0; j<authorsList.length; j++){
                var authorstr = authorsList[j];
                var authorstrList = authorstr.split(' ');
                apastr += authorstrList[authorstrList.length -1].charAt(0).toUpperCase() + authorstrList[authorstrList.length -1].slice(1) + ", ";
                for(var abc = 0; abc < authorstrList.length -2 ; abc ++){
                    if(authorstr[0] == ' ' && abc == 0)
                        continue;
                  apastr +=   authorstrList[abc][0].toUpperCase()+'. ';
                }
                  if(authorstrList.length >= 2){
                        apastr += authorstrList[authorstrList.length - 2][0].toUpperCase()+'.';
                    }
                    if(j == authorsList.length - 2){
                        apastr += ", & ";
                    }
                    else if(j < authorsList.length - 2){
                        apastr += ", ";
                    }
            }
 
            apastr += "(" + JsonData[i].year ;
            if(JsonData[i].hasOwnProperty("month"))
                apastr += ", " + JsonData[i].month + " ";  
 
            if(JsonData[i].hasOwnProperty("day"))
                apastr +=  JsonData[i].day;  
           
            apastr += ")";
 
 
           
            if(JsonData[i].hasOwnProperty("chapter_title")){
                apastr += `. "`+JsonData[i].chapter_title+`." `;
                apastr += "<i>"+JsonData[i].book_title + '.</i>';
            }
            else{
                apastr += ". <i>"+JsonData[i].title+". </i>";
            }
 
            if(JsonData[i].hasOwnProperty("city")){
                apastr += JsonData[i].city;
                if(JsonData[i].hasOwnProperty("country"))
                    apastr += ", "+JsonData[i].country + ": ";  
                else
                    apastr += ": " ;          
            }
            if(JsonData[i].hasOwnProperty("publisher"))
                apastr +=  JsonData[i].publisher + ", ";  
 
            if(JsonData[i].hasOwnProperty("journal_name"))
                apastr += "In "+ JsonData[i].journal_name + ", ";
 
            if(JsonData[i].hasOwnProperty("conference_publication_name"))
                apastr += "In "+ JsonData[i].conference_publication_name + ", ";
 
            if(JsonData[i].hasOwnProperty("chapter"))
                apastr += ", chap."+ JsonData[i].chapter + ", ";    
 
            if(JsonData[i].hasOwnProperty("issn"))
                apastr += "ISSN: "+ JsonData[i].issn + ", ";

            if(JsonData[i].hasOwnProperty("isbn"))
                apastr += "ISBN: "+ JsonData[i].issn + ", ";

            if(JsonData[i].hasOwnProperty("doi"))
                apastr += "DOI: "+ JsonData[i].doi + ", ";  
 
            if(JsonData[i].hasOwnProperty("pages"))
                apastr += "pp. "+ JsonData[i].pages ;  
           
            apastr += "</p>";
        }
        apastr += "</body></html>";
        if(fileFormat === 'pdf'){
            var doc = new jsPDF('p', 'pt', 'letter');
            doc.fromHTML(apastr, 45, 30, {width: 517});                                                     //Convert html string into jsPDF instances
            doc.save('APA.pdf');
        }
        if(fileFormat === 'docx'){
            var blob = new Blob(['\ufeff', apastr], {                                           //converts html string into blob(Binary Large Object) of type msword
                type: 'application/msword'
                });
                var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(apastr);
                var filename = "APA.docx";                                                              //file is downloaded as MLA.docx, user can change it while downloading
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
                var authorstr = authorsList[j].charAt(0).toUpperCase() + authorsList[j].slice(1);
                var authorstrList = authorstr.split(' ');
                if(authorstrList.length > 1){
                    if(authorstr[0] != ' '){
                        ieeestr += authorstrList[0][0].toUpperCase()+". ";
                        var star = 1;
                    }              
                    else{
                        ieeestr += authorstrList[1][0].toUpperCase()+". ";
                        var star = 2;
                    }
                }
                else
                    ieeestr += authorstrList[0].charAt(0).toUpperCase() + authorstrList[0].slice(1)+". ";
                for(var abc = star; abc <= authorstrList.length -2 ; abc++){
                    ieeestr += authorstrList[abc][0].toUpperCase()+'. ';
                }
                ieeestr += authorstrList[authorstrList.length - 1];
                if(j == authorsList.length - 2){
                    ieeestr += ", and ";
                }
                else if(j < authorsList.length - 2){
                    ieeestr += ", ";
                }
            }
           
            if(JsonData[i].hasOwnProperty("chapter_title")){
                ieeestr += `. "`+JsonData[i].chapter_title+`." `;
                ieeestr += "<i>"+JsonData[i].book_title + '.</i>';
            }
            else{
                ieeestr += ". <i>"+JsonData[i].title+". </i>";
            }
 
            if(JsonData[i].hasOwnProperty("city")){
                ieeestr += JsonData[i].city;
                if(JsonData[i].hasOwnProperty("country"))
                    ieeestr += ", "+JsonData[i].country + ": ";    
                else
                    ieeestr += ": " ;      
            }
            if(JsonData[i].hasOwnProperty("publisher"))
                ieeestr +=  JsonData[i].publisher + ", ";  
 
            if(JsonData[i].hasOwnProperty("journal_name"))
                ieeestr += "In "+ JsonData[i].journal_name + ", ";
 
            if(JsonData[i].hasOwnProperty("conference_publication_name"))
                ieeestr += "In "+ JsonData[i].conference_publication_name + ", ";
           
            ieeestr += "(" + JsonData[i].year ;
            if(JsonData[i].hasOwnProperty("month"))
                ieeestr += ", " + JsonData[i].month + " ";  
 
            if(JsonData[i].hasOwnProperty("day"))
                ieeestr +=  JsonData[i].day;  
           
            ieeestr += ").";
 
            ieeestr += "</p>";
        }
        ieeestr += "</body></html>" ;
        if(fileFormat === 'pdf'){
            var doc = new jsPDF('p', 'pt', 'letter');
            doc.fromHTML(ieeestr, 45, 30, {width: 517});                                                        //Convert html string into jsPDF instances
            doc.save('IEEE.pdf');
        }
        if(fileFormat === 'docx'){
            var blob = new Blob(['\ufeff', ieeestr], {                                          //converts html string into blob(Binary Large Object) of type msword
                type: 'application/msword'
                });
                var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(ieeestr);
                var filename = "IEEE.docx";                                                             //file is downloaded as MLA.docx, user can change it while downloading
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
 
    if(bibFormat === 'ugc'){
        var ugcstr = "<html><body style= 'font-family:Times New Roman; font-size: 12px'>";   //ugc table formatted html string
        ugcstr += "<table style='width:100%; table-layout=fixed; border: 1px solid black; border-collapse: collapse'>";        
        var nonugc = "";
        ugcstr += "<tr><td style = 'border: 1px solid black; border-collapse: collapse' colspan='3'>Major Research Publication in <strong>Ranked Journals/Proceedings</strong></td></tr>";                  //str is a html string
        nonugc += "<tr><td style = 'border: 1px solid black; border-collapse: collapse' colspan='3'>Major Research Publication in <strong>Non-Ranked Peer-Reviewed Journals</strong></td></tr>";                  //str is a html string
        ugcstr += "<tr><td></td><td style = 'border: 1px solid black; border-collapse: collapse'>Format: Authors, Title, Journal, Volume(Number), First page-Last page, (Year)</td> <td style = 'border: 1px solid black; border-collapse: collapse'>Rank*/IF</td></tr>";        
        nonugc += "<tr><td></td><td style = 'border: 1px solid black; border-collapse: collapse'>Format: Authors, Title, Journal, Volume(Number), First page-Last page, (Year)</td> <td style = 'border: 1px solid black; border-collapse: collapse'>Country</td></tr>";        
        for(var i=0; i<JsonData.length; i++){
            if(JsonData.hasOwnProperty("ranked") && (JsonData.ranked === "yes" || JsonData.ranked === "Yes" || JsonData.ranked === "YES")){
                ugcstr += "<tr><td style = 'border: 1px solid black; border-collapse: collapse'>";
                ugcstr += (i+1).toString();
                ugcstr += "</td><td style = 'border: 1px solid black; border-collapse: collapse'>";
                var authorsList = JsonData[i].authors.split(",");
                for(var j= 0; j<authorsList.length; j++){
                    var authorstr = authorsList[j];
                    var authorstrList = authorstr.split(' ');
                    if(authorstrList.length > 1){
                        if(authorstr[0] != ' '){
                            ugcstr += authorstrList[0][0]+". ";
                            var star = 1;
                        }              
                        else{
                            ugcstr += authorstrList[1][0]+". ";
                            var star = 2;
                        }
                    }
                    else
                        ugcstr += authorstrList[0]+". ";
                    for(var abc = star; abc <= authorstrList.length -2 ; abc++){
                        ugcstr += authorstrList[abc][0]+'. ';
                    }
                    ugcstr += authorstrList[authorstrList.length - 1] ;
                    if(j == authorsList.length - 2){
                        ugcstr += ", and ";
                    }
                    else if(j < authorsList.length - 2){
                        ugcstr += ", ";
                    }
                }
               
                if(JsonData[i].hasOwnProperty("chapter_title")){
                    ugcstr += `, "`+JsonData[i].chapter_title+`." `;
                    ugcstr += "<i>"+JsonData[i].book_title + ', </i>';
                }
                else{
                    ugcstr += ", <i>"+JsonData[i].title+", </i>";
                }
 
 
                if(JsonData[i].hasOwnProperty("journal_name"))
                    ugcstr += JsonData[i].journal_name + ", ";
 
 
                else if(JsonData[i].hasOwnProperty("conference_publication_name"))
                    ugcstr += JsonData[i].conference_publication_name + ", ";
               
                else ugcstr += "- , ";
 
                if(JsonData[i].hasOwnProperty("volume"))
                    ugcstr += "vol. "+ JsonData[i].volume ;    
               
                else ugcstr += "- , ";
               
 
                if(JsonData[i].hasOwnProperty("pages"))
                    ugcstr += "pp. "+ JsonData[i].pages ;    
 
                else ugcstr += "- , ";
                   
                ugcstr += "(" + JsonData[i].year + ").";
                ugcstr += "</td><td style = 'border: 1px solid black; border-collapse: collapse'>";
                if(JsonData[i].hasOwnProperty("rank")){
                    ugcstr += JsonData.rank + "/";
                }
                else ugcstr += "- /";
 
                if(JsonData[i].hasOwnProperty("impact_factor")){
                    ugcstr += JsonData.impact_factor + "/";
                }
                else ugcstr += "-";
                ugcstr += "</td>";
                ugcstr +="</tr>";
            }
            else{
                nonugc += "<tr><td style = 'border: 1px solid black; border-collapse: collapse'>";
                nonugc += (i+1).toString();
                nonugc += "</td><td style = 'border: 1px solid black; border-collapse: collapse'>";
                var authorsList = JsonData[i].authors.split(",");
                for(var j= 0; j<authorsList.length; j++){
                    var authorstr = authorsList[j];
                    var authorstrList = authorstr.split(' ');
                    if(authorstrList.length > 1){
                        if(authorstr[0] != ' '){
                            nonugc += authorstrList[0][0]+". ";
                            var star = 1;
                        }              
                        else{
                            nonugc += authorstrList[1][0]+". ";
                            var star = 2;
                        }
                    }
                    else
                        nonugc += authorstrList[0]+". ";
                    for(var abc = star; abc <= authorstrList.length -2 ; abc++){
                        nonugc += authorstrList[abc][0]+'. ';
                    }
                    nonugc += authorstrList[authorstrList.length - 1] ;
                    if(j == authorsList.length - 2){
                        nonugc += ", and ";
                    }
                    else if(j < authorsList.length - 2){
                        nonugc += ", ";
                    }
                }
               
                if(JsonData[i].hasOwnProperty("chapter_title")){
                    nonugc += `"`+JsonData[i].chapter_title+`." `;
                    nonugc += "<i>"+JsonData[i].book_title + ', </i>';
                }
                else{
                    nonugc += ", <i>"+JsonData[i].title+", </i>";
                }
 
                if(JsonData[i].hasOwnProperty("journal_name"))
                    nonugc += JsonData[i].journal_name + ", ";
 
                else if(JsonData[i].hasOwnProperty("conference_publication_name"))
                    nonugc += JsonData[i].conference_publication_name + ", ";
               
                else nonugc += "- , ";
 
                if(JsonData[i].hasOwnProperty("volume"))
                    nonugc += "vol. "+ JsonData[i].volume ;    
               
                else nonugc += "- , ";
               
                if(JsonData[i].hasOwnProperty("pages"))
                    nonugc += "pp. "+ JsonData[i].pages ;    
 
                else nonugc += "- , ";
                   
                nonugc += "(" + JsonData[i].year + ").";
                nonugc += "</td><td style = 'border: 1px solid black; border-collapse: collapse'>";
                if(JsonData[i].hasOwnProperty("country")){
                    nonugc += JsonData[i].country;
                }
                else{
                    nonugc += "-"
                }
            }
        }
        ugcstr += nonugc;
        ugcstr += "</table>";
        ugcstr += "</body></html>" ;
    //     if(fileFormat === 'pdf'){
    //         // var doc = new jsPDF('p', 'pt', 'letter');
    //      // doc.fromHTML(ugcstr, 45, 30, {width: 517});                                                      //Convert html string into jsPDF instances
    //         // doc.save('UGC.pdf');
    //         var doc = new jsPDF('p', 'pt', 'a4');
    //         var source = ugcstr;
    //        var margins = {
    //          top: 10,
    //          bottom: 10,
    //          left: 10,
    //          width: 595
    //        };
           
    //        doc.fromHTML(
    //          source, // HTML string or DOM elem ref.
    //          margins.left,
    //          margins.top, {
    //            'width': margins.width,
    //          },
         
    //          function(dispose) {
    //            doc.save('Test.pdf');
    //          }, margins);
         
    // }
        if(fileFormat === 'docx' || fileFormat === 'pdf'){
            var blob = new Blob(['\ufeff', ugcstr], {                                           //converts html string into blob(Binary Large Object) of type msword
                type: 'application/msword'
                });
                var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(ugcstr);
                var filename = "UGC.docx";                                                              //file is downloaded as MLA.docx, user can change it while downloading
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
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ugcstr));
            element.setAttribute('download', "UGC.html");
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
 
}
    export default downloader;

