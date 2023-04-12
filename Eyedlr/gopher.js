/*
Given a URL like: http://farragofiction.com/Gopher/NORTH/

It grabs all links with sizes and then fetches their contents. 

It creates a post from these. 

Also, given a link like http://farragofiction.com/Gopher/NORTH/ it knows how to get the possible branch points and choose one (and then do the first step)

*/

const base_gopher_url = "http://farragofiction.com/Gopher/NORTH/";


const base_location = window.location.href.replaceAll("index.html","")

const getFileNameFromPath =(nameString)=>{
  return nameString.split("/").pop();
}

const turnGopherContentIntoHTML = async (url)=>{
  const content = await fetchAllTextFromGopherHoleLocation(url);
  let ret = `<h2>> ${url.replaceAll("http://farragofiction.com/Gopher/",'')}</h2>`;
  for(let c of content){
    ret += `<h3>${c.name}</h3> <p>${c.text}</p>`;
  }
  return ret;

}

const fetchAllTextFromGopherHoleLocation = async(url)=>{
  const content = await findAllContentFromGopherHoleLocation(url);
  let ret = [];
  for(let c of content){
    const rawText = await httpGetAsync(c);
    ret.push({name:getFileNameFromPath(c),text: rawText });

  }
  return ret;

}

const findAllContentFromGopherHoleLocation = async(url)=>{
  const data = await getGopherData(url);
  let ret = [];
  for(let d of data){
    if(d.size && d.size.trim() !="-"){
      ret.push(base_gopher_url + d.href.replaceAll(base_location,''))
    }
  } 
  return ret;
}


const findAllExitsFromGopherHoleLocation = async(url)=>{
  const data = await getGopherData(url);
  let ret = [];
  for(let d of data){
    if(d.size && d.size.trim() ==="-"){
      ret.push(base_gopher_url + d.href.replaceAll(base_location,''))
    }
  } 
  console.log("JR NOTE: exits found are",ret)
  return ret;
}


const getGopherData = async (url) => {
  const rawText = await httpGetAsync(url);
  const virtualDom = document.createElement("div");
  virtualDom.innerHTML = rawText;
  const rows = virtualDom.querySelectorAll("tr");
  let ret = [];
  let index = 0;
  for (let row of rows) {
    const cells = row.querySelectorAll("td");
    if (cells && cells.length) {
      const href = cells[1].querySelector("a").href;
      if (href) {
        console.log("JR NOTE: href is",href)
        const size = cells[3].innerText;
        ret[index] = { href, size };
        index++;
      }
    }

  }
  return ret;

}

//useful for querying specific files.
//https://stackoverflow.com/questions/2313620/is-it-possible-to-retrieve-the-last-modified-date-of-a-file-using-javascript
gimmeFacts = (url) => {
  console.log("JR NOTE: getting facts for", url);
  try {
    var req = new XMLHttpRequest();
    req.open("HEAD", url, false);
    req.send(null);
    if (req.status == 200) {
      console.log("JR NOTE: it was 200")
      let date = req.getResponseHeader("Last-Modified");
      let size = req.getResponseHeader("Content-Length");
      if (!date) {
        date = null;
      }
      if (!size) {
        size = null;
      }
      return { date, size };

    }
    else return { date: null, size: null }
  } catch (err) {
    console.error(err);
    return { date: null, size: null }
  }
}