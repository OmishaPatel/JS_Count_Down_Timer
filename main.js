const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const giveaway = document.querySelector('.giveaway');
  const deadline = document.querySelector('.deadline');
  const items = document.querySelectorAll('.deadline-format h4');
  // to always have 10 days counter from the current date
  let tempDate = new Date();
  let tempYear = tempDate.getFullYear();
  let tempMonth = tempDate.getMonth();
  let tempDay = tempDate.getDate();

  //let futureDate = new Date(2021,6,18,14,20,0);// months start with index of zero for e.g may it would be 4
  const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11,30,0);
  //Extracting values from the futuredate
  const year = futureDate.getFullYear();
  const hours = futureDate.getHours();
  const minutes = futureDate.getMinutes();
  // getting the value of the month e.g 1 for february
  let month = futureDate.getMonth();
  // Accessing the value to name of the month in months array
  month = months[month];
  const date = futureDate.getDate();
  // Accessing the value of the day in weekday array
  const weekday = weekdays[futureDate.getDay()];
 
  giveaway.innerHTML = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}`;// can also use textContent

  // future time in ms
  const futureTime = futureDate.getTime();
  function getRemainingTime() {
    const today = new Date().getTime();// getting todays time
    const t = futureTime - today;
    // 1s = 1000ms
    // 1m = 60s
    // 1 hr = 60min
    // 1day = 24 hours
    // values in ms
    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;
    // calculate all values
    let days = Math.floor(t / oneDay);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);
    //set values array
    const values = [days,hours,minutes,seconds];
    // function to add 0 when the number is below zero
    function format(item) {
        if(item<10) {
            return item = `0${item}`
        }
        return item;
    }
    // adding the values to items
    items.forEach(function(item, index) {
        item.innerHTML = format(values[index]);// calling the format function to add zero when value goes below 10
    });
    // clearing the interval when the deadline is done
    if(t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`
    }
  }
  //countdown
  let countdown = setInterval(getRemainingTime,1000);
  
  getRemainingTime();// important to invoke getremainingtime function after countdown is declared to hace access in clearinterval