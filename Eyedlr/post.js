/*
  NOTE: I can't feasibly write ALL of this on my own. 

  if i take popular tumblr posts, in some way link back to the original (wihout hiding. maybe a read more tag?)
*/


/*
   a post is a doubly linked list chain of reblogs

   TODO: if you have a parent, instead of keeping track of your own notes, you use the parents, recursively
*/

//used for finding a post to reblog or like or whatever
all_posts = [];




class Post {
  text; //can be html
  tags;
  notesEle;
  owner; //a character
  //next three are internal because they only work if you have no parent, otherwise its the root.
  internal_likes = 0; //array of profiles that liked this
  internal_numreblogs = 0;//instead of recursing across everything, just count
  internal_replies = []; //array of text and owner pairs cluttering up the notes
  parent; //a post
  timestamp;
  children = []; //posts
  //for the porn bots, how should they react when reblogging
  suggested_reblogs = [];
  suggested_tags = [];
  element;

  constructor(owner, text, parent, tags, suggested_reblogs, suggested_tags) {
    all_posts.push(this);
    this.owner = owner;
    this.text = text;
    this.parent = parent;
    this.setRoot();
    this.tags = tags;
    this.timestamp = Date.now();
    this.suggested_reblogs = suggested_reblogs;
    this.suggested_tags = suggested_tags;
    this.createElement();
  }

  //this isn't expected to change but readied reblogs needs to call it AFTER post creation (becasue we don't know the parent yet)
  setRoot = ()=>{
    if (this.parent) {
      this.root = this.getParent();
      this.root.internal_numreblogs++;
    }
  }

  //used for queing likes, rebogs, replies, etc. 
  //tumblr seems to store these in the root blindly
  getParent = () => {
    if (!this.parent) {
      return this;
    } else {
      return this.parent.getParent();
    }
  }

  getLikes = () => {
    if (!this.parent) {
      return this.internal_likes;
    } else {
      return this.root.internal_likes;
    }
  }

  syncNotes = () => {
    //won't get everything but at least goes all the way up the chain
    if (this.parent) {
      this.parent.syncNotes();
    }
    this.notesEle.innerText = this.getLikes() + this.getNumberReplies() + this.getNumberReblogs() + " notes";
  }

  likePost = () => {
    if (!this.parent) {
      this.internal_likes += 1;
    } else {
      return this.root.internal_likes += 1;
    }
    this.syncNotes();

  }

  unlikePost = () => {
    if (!this.parent) {
      this.internal_likes += -1;
    } else {
      return this.root.internal_likes += -1;
    }
    this.syncNotes();

  }

  getNumberReblogs = () => {
    if (!this.parent) {
      return this.internal_numreblogs;
    } else {
      return this.root.internal_numreblogs;
    }
  }

  getNumberReplies = () => {
    if (!this.parent) {
      return this.internal_replies.length;
    } else {
      return this.root.internal_replies.length;
    }
  }

  getReplies = () => {
    if (!this.parent) {
      return this.internal_replies;
    } else {
      return this.root.internal_replies;
    }
  }



  //adds own text to array, then parents, then that parents parents till it runs out of parents
  //then reverses the order so root goes first
  //needs to return owner, text pairs. (so i can grab name and etc)
  grabReblogChain = (so_far = []) => {
    so_far.push({ owner: this.owner, text: this.text });
    if (this.parent) {
      return this.parent.grabReblogChain(so_far);
    } else {
      return so_far;
    }
  }

  addChild = (child) => {
    this.children.push(child);
    this.syncNotes();

  }





  renderToScreen = (parent) => {
    parent.append(this.element);
    let bodyContent = this.element.querySelector(".post-body");
    bodyContent.scrollTop = bodyContent.scrollHeight

  }

 

  //looking at this, you really can get the feeling for why react and other frameworks were invented
  //this is *miserable* to read
  //future me is gonna HATE this.
  //oh well future me
  //you can refactor it to make it more readable if you like
  //but im basically half dead from moving
  //and am allowed to be lazy
  createElement = () => {
    const post = document.createElement("div");
    post.className = "post";
    this.element = post;
    const postIcon = createElementWithClassAndParent("div", post, "post-icon");
    const postIconImg = createElementWithClassAndParent("img", postIcon);
    postIconImg.src = this.owner.icon;


    const container = createElementWithClassAndParent("div", post, "post-container");
    const header = createElementWithClassAndParent("div", container, "post-header");
    const myName = createElementWithClassAndParent("span", header);
    myName.innerText = this.owner.name;
    if (this.parent) {
      const reblogArrow = createElementWithClassAndParent("span", header, "reblog-arrow");
      reblogArrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="12px" viewBox="0 0 24 24" width="12px" fill="#000000"><g><rect fill="none" height="24" width="24" x="0"/></g><g><g><polygon points="18,12 22,8 18,4 18,7 3,7 3,9 18,9"/><polygon points="6,12 2,16 6,20 6,17 21,17 21,15 6,15"/></g></g></svg>`;
      const theirName = createElementWithClassAndParent("span", header);
      theirName.innerText = this.parent.owner.name;
    }

    const body = createElementWithClassAndParent("div", container, "post-body");

    const bodyContent = createElementWithClassAndParent("div", body, "post-body-content");

    if (this.parent) {
      let postData = this.grabReblogChain([]);
      postData.reverse();
      for (let p of postData) {
        const reblog_ele = createElementWithClassAndParent("div", bodyContent, "reblog-post");
        const reblog_header = createElementWithClassAndParent("div", reblog_ele, "reblog-header");

        const reblogIcon = createElementWithClassAndParent("img", reblog_header, "reblog-icon");
        const reblog_name = createElementWithClassAndParent("div", reblog_header, "reblog-name");
        reblog_name.innerText = p.owner.name;
        reblogIcon.src = p.owner.icon;
        const reblog_text = createElementWithClassAndParent("div", reblog_ele, "reblog-text");
        reblog_text.innerHTML = p.text;
      }
    } else {
      bodyContent.innerHTML = this.text;
    }

    const tags = createElementWithClassAndParent("div", container, "post-tags");
    for (let tag of this.tags) {
      const ele = createElementWithClassAndParent("span", tags, "tag");
      ele.innerText = "#" + tag;
    }

    const footer = createElementWithClassAndParent("div", container, "post-footer");
    this.notesEle = createElementWithClassAndParent("div", footer, "notes-count");
    this.notesEle.innerText = this.getLikes() + this.getNumberReplies() + this.getNumberReblogs() + " notes";

    const notesIcons = createElementWithClassAndParent("div", footer, "notes-icons");

    const shareIcon = createElementWithClassAndParent("div", notesIcons, "broken");
    shareIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>`;

    const replyIcon = createElementWithClassAndParent("div", notesIcons, "");
    replyIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
  </svg>`;
    const reblogIcon = createElementWithClassAndParent("div", notesIcons, "");
    reblogIcon.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px"
    viewBox="0 0 24 24" width="24px" fill="#ff0000">
    <g>
      <rect fill="none" height="24" width="24" x="0" />
    </g>
    <g>
      <g>
        <polygon points="18,12 22,8 18,4 18,7 3,7 3,9 18,9" />
        <polygon points="6,12 2,16 6,20 6,17 21,17 21,15 6,15" />
      </g>
    </g>
  </svg>`;
    //https://fonts.google.com/icons?selected=Material+Icons:create:
    const likeIcon = createElementWithClassAndParent("div", notesIcons, "unliked");
    likeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
  </svg>`;

    likeIcon.onclick = () => {
      if (observer.liked_posts.indexOf(this) === -1) {
        likeIcon.classList = ["liked"];
        observer.likePost(this);

        likeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      } else {
        likeIcon.classList = ["unliked"];
        observer.unlikePost(this);
        likeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
      </svg>`;
      }
    }





  }
}
