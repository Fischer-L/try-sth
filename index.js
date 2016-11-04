const TXT = "QWERTYUIOASDFGHJKLXCVBNMQWERTYUIODFGHJCVBNWERTYUISDFGHJ#$%^&*(ERTYUIDFGHJKCVBNFGHJ#$%^&DFGHJ#$%^&*(ERTYUIFDFGHJHGCCVBNNBFDDFGHJIUYTREERTYU&^%$#$%^UYDFGHGFCVB";
var server;
function saveToIndexedDB(times) {
  db.open({
    server: 'my-app',
    version: 1,
    schema: {
      people: {
        key: {keyPath: 'id', autoIncrement: true}
      }
    }
  }).then(function (s) {
      var p = [];
      server = s;
      while (times) {
        p.push(server.people.add({
          timestamp: Date.now(),
          txt: TXT
        }));
        times--;
      }
      return Promise.all(p);
  }).then(function () {
    console.log("Save to indexedDB ", times, "times done!");
  });
}

function saveToLocalstorage(times) {
  while (times) {
    localStorage.setItem(Date.now(), TXT);
    times--;
  }
  console.log("Save to localStorage ", times, "times done!");
}

saveToIndexedDB(1000000);
saveToLocalstorage(1000000);
