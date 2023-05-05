/*
Given a URL like: http://farragofiction.com/Gopher/NORTH/

It grabs all links with sizes and then fetches their contents. 

It creates a post from these. 

Also, given a link like http://farragofiction.com/Gopher/NORTH/ it knows how to get the possible branch points and choose one (and then do the first step)

*/

const base_gopher_url = "http://farragofiction.com/Gopher/NORTH/";


let base_location = window.location.href.includes("index")? window.location.href.split("index.html")[0] : window.location.href.split("?")[0];

const getFileNameFromPath =(nameString)=>{
  return nameString.split("/").pop();
}

const turnGopherContentIntoHTML = async (url)=>{
  console.warn("JR NOTE: The Wanderer has reached ",url)
  let content = await fetchAllTextFromGopherHoleLocation(url);
  content = content.sort((a,b)=>b.name.charCodeAt(0)-a.name.charCodeAt(0))
  let ret = `<h2 class="gopher_url" data-path="${url}">> ${url.replaceAll("http://farragofiction.com/Gopher/",'').replaceAll("/","<wbr>/")}</h2>`;
  for(let c of content){
    ret += `<h3>>${c.name}</h3> <p>${c.text.replaceAll("\n","<br>")}</p>`;
  }
  return ret;

}

const fetchAllTextFromGopherHoleLocation = async(url)=>{
  //console.log("JR NOTE: url for fetchAllTextFromGopherHoleLocation is",url)
  const content = await findAllContentFromGopherHoleLocation(url);
  //console.log("JR NOTE: content retrieved is: ", content)

  let ret = [];
  for(let c of content){
    const rawText = await httpGetAsync(c);
    ret.push({name:getFileNameFromPath(c),text: rawText });

  }
  return ret;

}

const findAllContentFromGopherHoleLocation = async(url)=>{
  const data = await getGopherData(url);
  console.log("JR NOTE: findAllContentFromGopherHoleLocation  data is", data, "base_location is", base_location)
  let ret = [];
  for(let d of data){
    if(d.size && d.size.trim() !="-"){
      ret.push(url+ d.href.replaceAll(base_location,''))
    }
  } 
  return ret;
}


const findAllExitsFromGopherHoleLocation = async(url)=>{
  const data = await getGopherData(url);
  let ret = [];
  for(let d of data){
    if(d.size && d.size.trim() ==="-"){
      ret.push(url + d.href.replaceAll(base_location,''))
    }
  } 
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
  try {
    var req = new XMLHttpRequest();
    req.open("HEAD", url, false);
    req.send(null);
    if (req.status == 200) {
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