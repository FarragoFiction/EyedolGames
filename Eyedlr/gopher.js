/*
Given a URL like: http://farragofiction.com/Gopher/NORTH/

It grabs all links with sizes and then fetches their contents. 

It creates a post from these. 

Also, given a link like http://farragofiction.com/Gopher/NORTH/ it knows how to get the possible branch points and choose one (and then do the first step)

*/

const base_gopher_url = "http://farragofiction.com/Gopher/NORTH/";


const test = async () => {
  const rawText = await httpGetAsync(base_gopher_url);
  const virtualDom = document.createElement("div");
  virtualDom.innerHTML = rawText;
  const rows = virtualDom.querySelectorAll("tr");
  let ret = [];
  let index = 0;
  for (let row of rows) {
    console.log("JR NOTE: row is", row);
    const cells = row.querySelectorAll("td");
    console.log("JR NOTE: cells are", cells);
    if (cells && cells.length) {
      const href = cells[1].querySelector("a").href;
      if (href) {
        const size = cells[3].innerText;
        ret[index] = { href, size };
        index++;
      }
    }

  }
  console.log("JR NOTE: ret is",ret)
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