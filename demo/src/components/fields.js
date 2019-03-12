/*
    This file contains the fields in a type of data that is to be entered.
    Along with the associated title and the type of the data it collects.
*/

var BookFields = {
    Title: { placeholder: "Name of publication", type: "string", holder:"title"},
    ISSN: { placeholder: "ISSN Number ", type: "string", holder:"issn"},
    // Authors: { placeholder: "Author List. ", type: "string", holder:"issn"},
    Date: {placeholder: "Date of Publication", type: "string", holder:"date"},
    ISBN: {placeholder: "ISBN Number", type:"number", holder:"isbn"},
    "Impact Factor": {placeholder: "Impact Factor (number)", type:"number", holder:"impact_factor"},
    "Volume": {placeholder: "Volume where this was published", type: "string", holder:"volume"},
    "Name of Journal" : {placeholder: "Journal where this was published", type: "string", holder:"name_of_journal"},
    "Page Number" : {placeholder: "Page Number", type :"string", holder:"page_number"},
    "Location of conference" :{placeholder : "Location of the conference ", type: "string", holder:"location_of_conference"},
    "Link for the article" : {placeholder : "URL", type : "string", holder:"link_for_article"},
    "Academic Level" : {placeholder: "Academic level.", type :"string", holder:"academic_level"},
    "DOI" : {placeholder: "DOI", type: "string", holder:"doi"},
}


var ResearchPaperFields = {    
    Title: { placeholder: "Name of publication", type: "string", holder:"title"},
    ISSN: { placeholder: "ISSN Number ", type: "string", holder:"issn"},
    // Authors: { placeholder: "Author List. ", type: "string", holder:"issn"},
    Date: {placeholder: "Date of Publication", type: "string", holder:"date"},
    ISBN: {placeholder: "ISBN Number", type:"number", holder:"isbn"},
    "Impact Factor": {placeholder: "Impact Factor (number)", type:"number", holder:"impact_factor"},
    "Volume": {placeholder: "Volume where this was published", type: "string", holder:"volume"},
    "Name of Journal" : {placeholder: "Journal where this was published", type: "string", holder:"name_of_journal"},
    "Page Number" : {placeholder: "Page Number", type :"string", holder:"page_number"},
    "Location of conference" :{placeholder : "Location of the conference ", type: "string", holder:"location_of_conference"},
    "Link for the article" : {placeholder : "URL", type : "string", holder:"link_for_article"},
    "Academic Level" : {placeholder: "Academic level.", type :"string", holder:"academic_level"},
    "DOI" : {placeholder: "DOI", type: "string", holder:"doi"},
}

export { BookFields, ResearchPaperFields };