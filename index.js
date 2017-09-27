var TXT = "QWERTYUIOASDFGHJKLXCVBNMQWERTYUIODFGHJCVBNWERTYUISDFGHJ#$%^&*(ERTYUIDFGHJKCVBNFGHJ#$%^&DFGHJ#$%^&*(ERTYUIFDFGHJHGCCVBNNBFDDFGHJIUYTREERTYU&^%$#$%^UYDFGHGFCVB";
var MAX = 5000;
var server;
function saveToIndexedDB(times) {
  if (server) {
    save(times);
  } else {
    db.open({
      server: 'my-app',
      version: 1,
      schema: {
        people: {
          key: {keyPath: 'id', autoIncrement: true}
        }
      }
    }).then(function (s) {
      server = s;
      save(times);
    });
  }


  function save(times, saved) {
    var p = [];
    saved = saved || 0;
    for (let i = 0; i <= MAX && saved <= times; ++i) {
      p.push(server.people.add({
        timestamp: Date.now(),
        txt: TXT
      }));
      saved++;
    }

    Promise.all(p).then(function () {
      if (times > saved) {
        setTimeout(function () { save(times, saved); }, 0);
        console.log("Saving to indexedDB...");
      } else {
        console.log("Save to indexedDB ", saved, "times done!");
      }
    })
  };
}

function saveToLocalstorage(times, saved) {
  saved = saved || 0;
  for (let i = 0; i < MAX && saved <= times; ++i) {
    localStorage.setItem(Date.now() + i, TXT);
    saved++;
  }
  if (times > saved) {
    setTimeout(function () { saveToLocalstorage(times, saved); }, 50);
    console.log("Saving to localStorage...");
  } else {
    console.log("Save to localStorage ", saved, "times done!");
  }
}

function writeCookie() {
  document.cookie = "username" + writeCookie.count++ + "=John Smith; expires=Thu, 18 Dec 2113 12:00:00 UTC; path=/";
  console.log("document.cookie =", document.cookie);
}
writeCookie.count = 0;

var dexieIndexedDB = {
  db: null,
  
  async save(times, txt) {
    if (!this.db) {
      this.db = new Dexie("Dexie-MyFriendDB");
      this.db.version(1).stores({
        friends: '++id,name,age'
      });
      await this.db.open();
    }
    for (let i = 0; i < times; i++) this.db.friends.add({name: Date.now() + ("Foo" || txt), age: 42});
    console.log(`Done with saving dexie indexedDB for ${times} times`);
  }
};
function testDebugger() {
  let i = 1 + 100;
  let j = i - 1;
  let k = j * 10;
  let l = k / 5;
  let bool = i == j;
  let bool1 = j > k;
  let bool2 = k < l; 
  let bool3 = j >= k;
  let bool4 = k <= l;
}
testDebugger();
