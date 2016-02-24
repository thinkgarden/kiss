window.onload=function(){

    // First we create an array of all the checkboxes - we will use this twice in our app
    // we use slice.call to convert the node list to a real array
    var checkboxes = [].slice.call(document.querySelectorAll('.inbox [type="checkbox"]'));

    // we create a variable called lastChecked that will hold a reference to the last checkbox we checked. This will let us figure out which way to go
    var lastChecked;

    // create the handler that will run when someone "clicks" a box
    function handleCheck(e) {
      // check if 1) they are holding shift 2) we checked this box (it's not an un-check)
      if(e.shiftKey && this.checked) {
        // create a flag boolean - more on this in a sec
        var inBetween = false;
        // loop through each input
        checkboxes.forEach( (input,index) => {
          // Here is where we make our sausage.
          // We want to see if the current loop iteration is
          // either input we checked, or the last one we checked
          // This will allow us to turn on the checking (inBetween) when we pass one of them, and turn it off when we pass the other.
          // This might be a little confusing but it allows us to go both ways
          if(input === this || input === lastChecked) {
            inBetween = !inBetween;
          }
          // finally, if we are currently inBetween the lastChecked and the one that
          // was just checked. Go ahead and mark that one as checked
          if(inBetween) {
            console.log(index);
            input.checked = true;
          }
        });
      }//if
      // update last Checked regardless
      lastChecked = this;
    }
    // loop over each checkbox and attach the event listener to it
    checkboxes.forEach(checkbox => checkbox.addEventListener('click',handleCheck));

}
