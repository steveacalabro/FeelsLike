Parse.initialize("PMrj1OC7vN86rzkSyZUzLzNVvWgBsLAebUSiO58s","WHbc93eISUY8gcC6rVZMozsKpVvqI7Ash0GSEb9e");

Parse.Cloud.run('phrase', {}, {
  success: function(result) {
    // result is 'Hello world!'
	  console.log(result);
  },
  error: function(error) {
  }
});

