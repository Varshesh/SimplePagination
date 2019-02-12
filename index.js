var paginationInfo = {
    totalNoOfRecords: 102,
    recordsPerPage: 10,
    currentPage: 1,
};



function makePaging(totalNoOfRecords, recordsPerPage, currentPage, visiblePages) {
    var totalPages = Math.ceil(totalNoOfRecords / recordsPerPage);
    var pageObj = getPages(currentPage, visiblePages, totalPages);
    console.log(pageObj.numeric);
    document.getElementById('numberlist').innerHTML = '';
    for (var i = 0; i < pageObj.numeric.length; i++) {
        var ele = document.createElement('a');
        ele.setAttribute('class', 'numLinks');
        ele.setAttribute('href', 'javascript:void(0);');
        ele.innerHTML = '&nbsp;' + pageObj.numeric[i] + '&nbsp;';
		if(currentPage === pageObj.numeric[i]){
			ele.setAttribute('style', 'background-color:#fba2a2;');
		}
		console.log(currentPage,pageObj.numeric[i]);
        ele.onclick = function (e) {
            // console.log(e.target.innerText);
            paginationInfo.currentPage = parseInt(e.target.innerText);			
            makePaging(paginationInfo.totalNoOfRecords, paginationInfo.recordsPerPage, paginationInfo.currentPage, 5);
        };
        document.getElementById('numberlist').appendChild(ele);
    }
}

function gotoPage(val) {
    // this.firstDisabled = false;
    // this.lastDisabled = false;
	document.getElementById('first').setAttribute('disabled','')
	document.getElementById('last').setAttribute('disabled','')
    const totalPages = Math.ceil(paginationInfo.totalNoOfRecords / paginationInfo.recordsPerPage);
    let currpage = 1;
    switch (val) {
      case 'first':
        currpage = 1;
        break;
      case 'previous':
        currpage = ((paginationInfo.currentPage - 1) < 1) ? 1 : paginationInfo.currentPage - 1;
        break;
      case 'next':
        currpage = (paginationInfo.currentPage + 1) >= totalPages ? totalPages : paginationInfo.currentPage + 1;
        break;
      case 'last':
        currpage = totalPages;
        break;
      default:
        currpage = +val;
        break;
    }
    // For enable/disable buttons on first/last record respectively
    if (currpage === 1) {
      // this.firstDisabled = true;
	  document.getElementById('first').setAttribute('disabled','disabled')
    } else if (currpage === totalPages) {
      // this.lastDisabled = true;
	  document.getElementById('last').setAttribute('disabled','disabled')
    }
    const pages = getPages(currpage, paginationInfo.visiblePages, totalPages);
    // this.setState({ currentPage: currpage });
	paginationInfo.currentPage = currpage;
	makePaging(paginationInfo.totalNoOfRecords, paginationInfo.recordsPerPage, paginationInfo.currentPage, 5);    
  } 

function getPages(currentPage, visiblePages, totalPages) {
    var pages = [];

    var half = Math.floor(visiblePages / 2);
    var start = currentPage - half + 1 - visiblePages % 2;
    var end = currentPage + half;

    // handle boundary case
    if (start <= 0) {
        start = 1;
        end = visiblePages;
    }
    if (end > totalPages) {
        start = (totalPages - visiblePages + 1) > 1 ? (totalPages - visiblePages + 1) : 1;
        end = totalPages;
    }

    var itPage = start;
    while (itPage <= end) {
        pages.push(itPage);
        itPage++;
    }

    return { "currentPage": currentPage, "numeric": pages };
}

function onFirstClick(){
	gotoPage('first');
}
function onPrevClick(){
gotoPage('previous');
}
function onNextClick(){
gotoPage('next');
}
function onLastClick(){
gotoPage('last');
}

document.getElementById('totalArticles').innerText = (paginationInfo.totalNoOfRecords + ' items');
makePaging(paginationInfo.totalNoOfRecords, paginationInfo.recordsPerPage, paginationInfo.currentPage, 5);
