$(function () {
  const saveButton = $(".saveBtn");
  const heading = $("#currentDay");
  const hourDiv = "#hour-";
  let nowHour = dayjs().format("H");
  let events = [];

  saveButton.on("click", saveEvent);

  updateLayout(nowHour);
  displayEvents();
  updateDate();
  setInterval(updateDate, 60000); // Updated once a minute

  // Saves the event to the user's machine and displays the events
  function saveEvent() {
    events = JSON.parse(localStorage.getItem("myEvents"));
    const event = {
      name: "",
      hour: ""
    };
    const clickedButton = $(this);
    const parentEl = clickedButton.parent();
    event.name = parentEl.children(".description").val();
    event.hour = parentEl.attr("id").slice(5);
    if (event.hour !== "") {
      if (!(addIfHourExists())) {
      (events !== null) ? events.push(event) : events = [event];
      }
      localStorage.setItem("myEvents", JSON.stringify(events));
      displayEvents();
    }

    // Checks the event against previously saved events
    // Returns true if the event it exists otherwise returns a false
    // This prevents duplicate hour array items
    function addIfHourExists () {
      if (events !== null) {
        for (let i = 0; i < events.length; i++) {
          if (events[i].hour === event.hour) {
            events[i] = event;
            return true;
          }
        }
      }
      return false;
    }
  }

  // Updates the layout for the hour divs according to the current hour
  function updateLayout(currentHour) {
    // setCurrentHour
    (currentHour < 18 && currentHour > 8) ? setCurrentHour(hourDiv + currentHour) : null;

    // Set upper and lower bounds
    currentHour = (currentHour > 18) ? 18 : currentHour; // upper bounds
    currentHour = (currentHour < 8) ? 8 : currentHour; // lower bounds

    ///Set past classes
    for (let i = currentHour - 1; i > 8 && 18 > i; i--) {
      setPast(hourDiv + i);
    }

    /// Set Future classes
    for (let i = currentHour + 1; i < 18 && i > 8; i++) {
      setFuture(hourDiv + i);
    }

    // Removes future and present classes if they exist.  Then adds a past class.
    function setPast(thisHour) {
      ($(thisHour).hasClass("present")) ? $(thisHour).removeClass("present") : null;
      ($(thisHour).hasClass("future")) ? $(thisHour).removeClass("future") : null;
      (thisHour < currentHour) ? $(thisHour).addClass("past") : null;
    }

    // Removes past and present classes if they exist.  Then adds a future class.
    function setFuture(thisHour) {
      ($(thisHour).hasClass("present")) ? $(thisHour).removeClass("present") : null;
      ($(thisHour).hasClass("past")) ? $(thisHour).removeClass("past") : null;
      (thisHour > currentHour) ? $(thisHour).addClass("future") : null;
    }

    // Removes future and present past if they exist.  Then adds a present class.
    function setCurrentHour(thisHour) {
      ($(thisHour).hasClass("future")) ? $(thisHour).removeClass("future") : null;
      ($(thisHour).hasClass("past")) ? $(thisHour).removeClass("past") : null;
      ($(thisHour).hasClass("present")) ? null : $(thisHour).addClass("present");
    }
  }

  // Displays the events stored on the user's machine
  function displayEvents() {
    events = JSON.parse(localStorage.getItem("myEvents"));
    if (events !== null) {
      for (let i = 0; i < events.length; i++) {
        $(hourDiv + events[i].hour).children(".description").val(events[i].name);
      }
    }
  }

  // Updates the date in the header and the layout if the layout is old
  async function updateDate() {
    heading.text(dayjs().format("MMMM, DD YYYY"));
    nowHour = (nowHour !== dayjs().format("H")) ? updateLayout(dayjs().format("H")) : nowHour;
  }
});
