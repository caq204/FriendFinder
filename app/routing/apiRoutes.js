var path = require("path");

var friends = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends",function(req, res){
    res.json(friends);
  });  

  app.post('/api/friends', function(req, res){
    console.log("User Data in Post: "+req.body);

    var newFriendScore = req.body.scores;
    var scoresArray = [];
    var firendCount = 0;
    var bestMatch = 0;
    
    for(var i=0; i<friends.length;i++){
      var scoreDiff = 0;

      for(var j=0;i<newFriendScore;j++){
        scoreDiff = scoreDiff + (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScore[j])));
      }

      scoresArray.push(scoreDiff);
    }

    for(var i =0;i<scoresArray.length;i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }
    var bestFriend = friends[bestMatch];
    res.json(bestFriend);

    friends.push(req.body);

  });
};