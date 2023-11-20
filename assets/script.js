
  // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
  // the code isn't run until the browser has finished rendering all the elements
  // in the html.
  const localeSettings = {};
  dayjs.locale(localeSettings);
  // Wait until the DOM is fully loaded before executing the code inside the function.
  $(function () {
    // Get the current hour of the day using the dayjs library.
    const currentHour = dayjs().format('H');
  // The function below changes the color of each time block based for "past, present, or future" relative to the current hour.
    function hourColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  // The function below will save the user's input in a textarea to localStorage when the save button has been clicked.
    function planEntry() {
      $('.saveBtn').on('click', function() {
        const entry = $(this).parent().attr('id');
        const value = $(this).siblings('.schedule').val();
        localStorage.setItem(entry, value);
      });
    }
   // The function refresh the color of each time block based on whether it's in the past(grey), present(red), or future(green) relative to the current time. 
    function refreshColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
        console.log(currentHour);
      });
    }
    // This will get the user input from the localStorage and set textarea values for each time block.
    $('.time-block').each(function() {
      const entry = $(this).attr('id');
      const value = localStorage.getItem(entry);
      $(this).children('.schedule').val(value);
    });
  
    // display current time
    function updateTime() {
      const dateElement = $('#date');
      const timeElement = $('#time');
      const currentDate = dayjs().format('dddd, MMMM D, YYYY');
      const currentTime = dayjs().format('h:mm A');
      dateElement.text(currentDate);
      timeElement.text(currentTime);
    }
    // Call the three main functions to set up the page.
    hourColor();
    planEntry();                
    refreshColor();
    // This will update the time once per second for the current time once per minute using setInterval() 
    setInterval(updateTime, 1);
  });


