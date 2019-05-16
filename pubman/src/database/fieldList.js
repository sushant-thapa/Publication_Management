var  fieldList = [
    {
    bookFields:
        [{
            serial: 0,
            name: "Authors",
            description: "Full Name of Author/s",
            id: "authors",
            required: true,
        },
        {
            serial: 1,
            name: "Title",
            description: "Title of the Book",
            id: "title",
            required: true
        },
        {
            serial: 2,
            name: "Year",
            description: "Year of Publication",
            id: "year",
            required: true
        },
        {
            serial: 3,
            name: "Publisher",
            description: "Publisher of the Book",
            id: "publisher",
            required: true
        },
        {
            serial: 4,
            name: "City",
            description: "City of the publication",
            id: "city",
            required: false,
        },
        {
            serial: 5,
            name: "Country",
            description: "Country of Publication",
            id: "country",
            required: false
        },
        {
            serial: 6,
            name: "Editor",
            description: "Name of Editors",
            id: "editor",
            required: false
        },
        {
            serial: 7,
            name: "Volume",
            description: "Volume number of the book",
            id: "volume",
            required: false
        },
        {
            serial: 8,
            name: "ISBN",
            description: "ISBN number of the book",
            id: "isbn",
            required: false
        },
        {
            serial: 9,
            name: "DOI",
            description: "DOI of the book",
            id: "doi",
            required: false
        },
        {
            serial: 10,
            name: "Edition",
            description: "Edition number",
            id: "edition",
            required: false
        },
        {
            serial: 11,
            name: "Impact Factor",
            description: "Impact factor of the book",
            id: "impact_factor",
            required: false
        },
        {
            serial: 12,
            name: "Ranked",
            description: "Is the book ranked? [yes/no]",
            id: "ranked",
            required: false
        },
        {
            serial: 13,
            name: "Peer Reviewed",
            description: "Is the book peer reviewed? [yes/no]",
            id: "peer_reviewed",
            required: false
        }],
 
    bookChapterFields:
        [{
            serial: 0,
            name: "Authors",
            description: "Author/s of the Chapter",
            id: "authors",
            required: true
        },
        {
            serial: 1,
            name: "Chapter Title",
            description: "Title of the Chapter",
            id: "chapter_title",
            required: true
        },
        {
            serial: 2,
            name: "Book Title",
            description: "Title of the Book",
            id: "book_title",
            required: true
        },
        {
            serial: 3,
            name: "Year",
            description: "Year of Publication",
            id: "year",
            required: true
        },
        {
            serial: 4,
            name: "Pages",
            description: "Range of pages",
            id: "pages",
            required: true
        },
        {
            serial: 5,
            name: "Publisher",
            description: "Publisher of the Book",
            id: "publisher",
            required: true
        },
        {
            serial: 6,
            name: "Chapter Number",
            description: "Chapter number of the chapter",
            id: "chapter",
            required: false
        },
        {
            serial: 7,
            name: "Book Authors",
            description: "Author/s of the Book",
            id: "book_authors",
            required: false
        },
        {
            serial: 8,
            name: "City",
            description: "City of the publication",
            id: "city",
            required: false
        },
        {
            serial: 9,
            name: "Country/Region",
            description: "Country/Region of Publication",
            id: "country",
            required: false
        },
        {
            serial: 10,
            name: "Editor",
            description: "Name of Editors",
            id: "editor",
            required: false
        },
        {
            serial: 11,
            name: "Volume",
            description: "Volume number of the book",
            id: "volume",
            required: false
        },
        {
            serial: 12,
            name: "Edition",
            description: "Edition number of the book",
            id: "edition",
            required: false
        },
        {
            serial: 13,
            name: "ISBN",
            description: "ISSN number of chapter/book",
            id: "isbn",
            required: false
        },
        {
            serial: 14,
            name: "DOI",
            description: "DOI of chapter/book",
            id: "doi",
            required: false
        },
        {
            serial: 15,
            name: "Impact Factor",
            description: "Impact factor of the chapter/book",
            id: "impact_factor",
            required: false
        },
        {
            serial: 16,
            name: "Ranked",
            description: "Is the chapter/book ranked? [yes/no]",
            id: "ranked",
            required: false
        },
        {
            serial: 17,
            name: "Peer Reviewed",
            description: "Is the chapter/book peer reviewed? [yes/no]",
            id: "peer_reviewed",
            required: false
        }],
   
    journalArticleFields:
        [{
            serial: 0,
            name: "Authors",
            description: "Full Name of Author/s",
            id: "authors",
            required: true
        },
        {
            serial: 1,
            name: "Title",
            description: "Title of the publication",
            id: "title",
            required: true
        },
        {
            serial: 2,
            name: "Journal Name",
            description: "Name of the Journal",
            id: "journal_name",
            required: true
        },
 
        {
            serial: 3,
            name: "Year",
            description: "Year of Publication",
            id: "year",
            required: true
        },
        {
            serial: 4,
            name: "Pages",
            description: "Pages range",
            id: "pages",
            required: false
        },
        {
            serial: 5,
            name: "City",
            description: "City of Publication",
            id: "city",
            required: false
        },
        {
            serial: 6,
            name: "Month",
            description: "Month of Publication",
            id: "month",
            required: false
        },
        {
            serial: 7,
            name: "Day",
            description: "Day of Publication",
            id: "day",
            required: false
        },
        {
            serial: 8,
            name: "Editor",
            description: "Name of Editors",
            id: "editor",
            required: false
        },
        {
            serial: 9,
            name: "Volume",
            description: "Volume number of the Journal",
            id: "volume",
            required: false
        },
        {
            serial: 10,
            name: "Publisher",
            description: "Publisher of Journal",
            id: "publisher",
            required: false
        },
        {
            serial: 11,
            name: "Issue",
            description: "Issue of Journal",
            id: "issue",
            required: false
        },
        {
            serial: 12,
            name: "ISSN",
            description: "ISSN number of Journal",
            id: "issn",
            required: false
        },
        {
            serial: 13,
            name: "DOI",
            description: "DOI of Journal",
            id: "doi",
            required: false
        },
        {
            serial: 14,
            name: "Impact Factor",
            description: "Impact factor of the publication",
            id: "impact_factor",
            required: false
        },
        {
            serial: 15,
            name: "Ranked",
            description: "Is the publication ranked? [yes/no]",
            id: "ranked",
            required: false
        },
        {
            serial: 16,
            name: "Peer Reviewed",
            description: "Is the publication peer reviewed? [yes/no]",
            id: "peer_reviewed",
            required: false
        }
    ],
 
    proceedingFields:
        [{
            serial: 0,
            name: "Authors",
            description: "Full Name of Author/s",
            id: "authors",
            required: true
        },
        {
            serial: 1,
            name: "Title",
            description: "Title of the Paper",
            id: "title",
            required: true
        },
        {
            serial: 2,
            name: "Conference Publication Name",
            description: "Conference/Workshop/Seminar  Name",
            id: "conference_publication_name",
            required: true
        },
        {
            serial: 3,
            name: "Year",
            description: "Year of Publication",
            id: "year",
            required: true
        },
        {
            serial: 4,
            name: "Month",
            description: "Month of Publication",
            id: "month",
            required: true
        },
        {
            serial: 5,
            name: "City",
            description: "City of the publication",
            id: "city",
            required: false
        },
        {
            serial: 6,
            name: "Country",
            description: "Country of the publication",
            id: "country",
            required: false
        },
        {
            serial: 7,
            name: "Publisher",
            description: "Publisher of the proceeding",
            id: "publisher",
            required: false
        },
        {
            serial: 8,
            name: "Pages",
            description: "Range of Pages",
            id: "pages",
            required: false
        },
        {
            serial: 9,
            name: "Editor",
            description: "Name of Editors",
            id: "editor",
            required: false
        },
        {
            serial: 10,
            name: "ISSN",
            description: "ISSN number of proceeding",
            id: "issn",
            required: false
        },
        {
            serial: 11,
            name: "DOI",
            description: "DOI of proceeding",
            id: "doi",
            required: false
        },
        {
            serial: 12,
            name: "Impact Factor",
            description: "Impact factor of the publication",
            id: "impact_factor",
            required: false
        },
        {
            serial: 13,
            name: "Ranked",
            description: "Is the publication ranked? [yes/no]",
            id: "ranked",
            required: false
        },
        {
            serial: 14,
            name: "Peer Reviewed",
            description: "Is the publication peer reviewed? [yes/no]",
            id: "peer_reviewed",
            required: false
        }], 
 
    reportFields:
        [{
            serial: 0,
            name: "Authors",
            description: "Full Name of Author/s",
            id: "authors",
            required: true
        },
        {
            serial: 1,
            name: "Title",
            description: "Title of the Report",
            id: "title",
            required: true
        },
        {
            serial: 2,
            name: "Year",
            description: "Year of Publication",
            id: "year",
            required: true
        },
        {
            serial: 3,
            name: "Publisher",
            description: "Publisher of the Report",
            id: "publisher",
            required: false
        },
        {
            serial: 4,
            name: "City",
            description: "City of the publication",
            id: "city",
            required: false
        },
        {
            serial: 5,
            name: "Department",
            description: "Department of Publisher",
            id: "department",
            required: false
        },
        {
            serial: 6,
            name: "Institute",
            description: "Institute of Publisher",
            id: "institute",
            required: false
        },
        {
            serial: 7,
            name: "Report Type",
            description: "Type of report",
            id: "report_type",
            required: false
        },
        {
            serial: 9,
            name: "Pages",
            description: "Range of pages",
            id: "pages",
            required: false
        },
        {
            serial: 10,
            name: "ISSN",
            description: "ISSN number of Journal",
            id: "issn",
            required: false
        },
        {
            serial: 11,
            name: "DOI",
            description: "DOI of report",
            id: "doi",
            required: false
        },
        {
            serial: 12,
            name: "Impact Factor",
            description: "Impact factor of the report",
            id: "impact_factor",
            required: false
        },
        {
            serial: 13,
            name: "Ranked",
            description: "Is the report ranked? [yes/no]",
            id: "ranked",
            required: false
        },
        {
            serial: 14,
            name: "Peer Reviewed",
            description: "Is the report peer reviewed? [yes/no]",
            id: "peer_reviewed",
            required: false
        }],
    
    articleFields:
        [{
            serial: 0,
            name: "Authors",
            description: "Full Name of Author/s",
            id: "authors",
            required: true
        },
        {
            serial: 1,
            name: "Title",
            description: "Title of the Article",
            id: "title",
            required: true
        },
        {
            serial: 2,
            name: "Periodical Title",
            description: "Title of the Periodical/Journals/Others",
            id: "periodical_title",
            required: true
        },
        {
            serial: 3,
            name: "Year",
            description: "Year of Publication",
            id: "year",
            required: true
        },
        {
            serial: 4,
            name: "Month",
            description: "Month of Publication",
            id: "month",
            required: false
        },
        {
            serial: 5,
            name: "Day",
            description: "Day of Publication",
            id: "day",
            required: false
        },
        {
            serial: 6,
            name: "Pages",
            description: "Range of Pages",
            id: "pages",
            required: false
        },
        {
            serial: 7,
            name: "City",
            description: "City of Publication",
            id: "city",
            required: false
        },
        {
            serial: 8,
            name: "Editor",
            description: "Name of Editors",
            id: "editor",
            required: false
        },
        {
            serial: 9,
            name: "Publisher",
            description: "Publisher of Periodical",
            id: "publisher",
            required: false
        },
        {
            serial: 10,
            name: "Issue",
            description: "Issue of Periodical",
            id: "issue",
            required: false
        },
        {
            serial: 11,
            name: "Volume",
            description: "Volume number of the Journal",
            id: "volume",
            required: false
        },
        {
            serial: 12,
            name: "ISSN",
            description: "ISSN number of periodical",
            id: "issn",
            required: false
        },
        {
            serial: 13,
            name: "DOI",
            description: "DOI of periodical",
            id: "doi",
            required: false
        },
        {
            serial: 14,
            name: "Impact Factor",
            description: "Impact factor of the chapter/book",
            id: "impact_factor",
            required: false
        },
        {
            serial: 15,
            name: "Ranked",
            description: "Is the chapter/book ranked? [yes/no]",
            id: "ranked",
            required: false
        },
        {
            serial: 16,
            name: "Peer Reviewed",
            description: "Is the chapter/book peer reviewed? [yes/no]",
            id: "peer_reviewed",
            required: false
        }],   

    miscellaneousFields:
        [{
            serial: 0,
            name: "Authors",
            description: "Full Name of Author/s",
            id: "authors",
            required: true
        },
        {
            serial: 1,
            name: "Title",
            description: "Title of the publication",
            id: "title",
            required: true
        },
        {
            serial: 2,
            name: "Year",
            description: "Year of Publication",
            id: "year",
            required: true
        },
        {
            serial: 3,
            name: "Publisher",
            description: "Publisher's Name",
            id: "publisher",
            required: false
        },
        {
            serial: 4,
            name: "City",
            description: "City of the publication",
            id: "city",
            required: false
        },
        {
            serial: 5,
            name: "Type",
            description: "Type of publication",
            id: "type",
            required: false
        },
        {
            serial: 7,
            name: "Pages",
            description: "Range number of pages",
            id: "pages",
            required: false
        },
        {
            serial: 8,
            name: "ISSN",
            description: "ISSN number of publication",
            id: "issn",
            required: false
        },
        {
            serial: 9,
            name: "DOI",
            description: "DOI of publication",
            id: "doi",
            required: false
        },
        {
            serial: 10,
            name: "Impact Factor",
            description: "Impact factor of the publication",
            id: "impact_factor",
            required: false
        },
        {
            serial: 11,
            name: "Ranked",
            description: "Is the publication ranked? [yes/no]",
            id: "ranked",
            required: false
        },
        {
            serial: 12,
            name: "Peer Reviewed",
            description: "Is the publication peer reviewed? [yes/no]",
            id: "peer_reviewed",
            required: false
        }
    ]
    }
]
 
var compulsoryFields = {
    bookFields: [0,1,2,3],
    bookChapterFields : [0,1,2,3,4,5],
    journalArticleFields: [0,1,2,3],
    proceedingFields: [0,1,2,3,4],
    reportFields: [0,1,2],
    articleFields: [0,1,2,3],
    miscellaneousFields: [0,1,2]
}

 
export {fieldList, compulsoryFields};