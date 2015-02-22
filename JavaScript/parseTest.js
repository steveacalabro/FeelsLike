Parse.initialize("WAZOc6VldvRSqy8KjNPC71O2MoQRf7Q7K5a3xp37","WRZy60GqOSfbsfgZWgTJuELwg0HFqYhHyulIOMOW");
/*
Parse.Cloud.run('phrase', {}, {
  success: function(result) {
    // result is 'Hello world!'
	  console.log(result);
  },
  error: function(error) {
  }
});*/
Parse.Cloud.run('phrase', {
   temp: 1,
   wind: 0,
   humidity: 2,
   serverity: 0,
   type: 3,
   nsfw: false
}).then(function (result) {
   //$scope.phrase = result;
   console.log(result);
});

