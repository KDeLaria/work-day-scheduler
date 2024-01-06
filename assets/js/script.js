// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  const saveButton = $(".saveBtn");
  const heading = $("#currentDay");
  const hourDiv = "#hour-";

  let events = [];

  saveButton.on("click", saveEvent);

  displayEvents();
  
  function saveEvent() {
    displayEvents();
    const event = {
      name: "",
      hour: ""
    };
    const clickedButton = $(this);
    const parentEl = clickedButton.parent();
    event.name = parentEl.children(".description").val();
    event.hour = parentEl.attr("id").slice(5);
    console.log(`event.name: ${event.name}`);
    console.log(`event.hour: ${event.hour}
    event: ${event}`);
    if (!(event.name === "" || event.hour === "")) {
      (events !== null) ? events.push(event) : events = [event];
      localStorage.setItem("myEvents", JSON.stringify(events));
    }
    console.log("ON SAVE events array: " + events)
  }


  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  const today = dayjs();
  let currentHour = dayjs().format("H");
  console.log("the current hour is " + currentHour);

  const todayAt9am = dayjs().hour(9);



  // setCurrentHour
  (currentHour < 18 && currentHour > 8) ? setCurrentHour(hourDiv + currentHour) : null;

  // ///Set past
  currentHour = (currentHour > 18) ? 18 : currentHour; ///////////////change variable
  currentHour = (currentHour < 8) ? 8 : currentHour; ///////////////change variable
  console.log("updated hour: " + currentHour);
  for (let i = currentHour - 1; i > 8 && 18 > i; i--) {
    setPast(hourDiv + i);
  }
  /// setFuture
  for (let i = currentHour + 1; i < 18 && i > 8; i++) {
    setFuture(hourDiv + i);
  }

  function setPast(thisHour) {
    ($(thisHour).hasClass("present")) ? $(thisHour).removeClass("present") : null;
    ($(thisHour).hasClass("future")) ? $(thisHour).removeClass("future") : null;
    (thisHour < currentHour) ? $(thisHour).addClass("past") : null;
  }

  function setFuture(thisHour) {
    ($(thisHour).hasClass("present")) ? $(thisHour).removeClass("present") : null;
    ($(thisHour).hasClass("past")) ? $(thisHour).removeClass("past") : null;
    (thisHour > currentHour) ? $(thisHour).addClass("past") : null;
  }

  function setCurrentHour(thisHour) {
    ($(thisHour).hasClass("future")) ? $(thisHour).removeClass("future") : null;
    ($(thisHour).hasClass("past")) ? $(thisHour).removeClass("past") : null;
    ($(thisHour).hasClass("present")) ? null : $(thisHour).addClass("present");
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function displayEvents() {
    events = JSON.parse(localStorage.getItem("myEvents"));
    if (events !== null) {
      for (let i = 0; i < events.length; i++) {
        $(hourDiv + events[i].hour).text(events[i].name);
      }
      console.log("ON DISPLAY events array: " + events)
    }
  }
  // TODO: Add code to display the current date in the header of the page.

});
