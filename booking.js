const data = [
  {
    id: 1,
    roomId: "A101",
    startTime: "2019-09-28 13:00:00",
    endTime: "2019-09-28 14:00:00",
    title: "Lunch with Petr",
  },
  {
    id: 2,
    roomId: "A101",
    startTime: "2019-09-28 14:00:00",
    endTime: "2019-09-28 15:00:00",
    title: "Sales Weekly Meeting",
  },
  {
    id: 3,
    roomId: "A101",
    startTime: "2019-09-28 16:00:00",
    endTime: "2019-09-28 18:00:00",
    title: "Anastasia Website Warroom",
  },
  {
    id: 4,
    roomId: "A101",
    startTime: "2019-09-29 13:00:00",
    endTime: "2019-09-29 14:00:00",
    title: "One-on-One Session",
  },
  {
    id: 5,
    roomId: "A101",
    startTime: "2019-09-29 16:00:00",
    endTime: "2019-09-29 18:00:00",
    title: "UGC Sprint Planning",
  },
  {
    id: 6,
    roomId: "A102",
    startTime: "2019-09-30 09:00:00",
    endTime: "2019-10-04 18:00:00",
    title: "5-Day Design Sprint Workshop",
  },
  {
    id: 7,
    roomId: "Auditorium",
    startTime: "2019-09-19 09:00:00",
    endTime: "2019-09-23 19:00:00",
    title: "Thai Tech Innovation 2019",
  },
  {
    id: 8,
    roomId: "A101",
    startTime: "2019-09-28 10:00:00",
    endTime: "2019-09-28 13:00:00",
    title: "Raimonland project",
  },
  {
    id: 9,
    roomId: "A102",
    startTime: "2019-09-30 18:00:00",
    endTime: "2019-09-30 20:00:00",
    title: "Management Meetinng",
  },
  {
    id: 10,
    roomId: "A101",
    startTime: "2019-10-04 14:00:00",
    endTime: "2019-10-06 11:00:00",
    title: "3-day workshop Corgi costume",
  },
];

function transform(date) {
  return new Date(date).getTime();
}

function addWeeks(weeks, date = new Date()) {
  date.setDate(date.getDate() + weeks * 7);
  return date;
}

function checkAvailability(roomId, startTime, endTime) {
  let filterRoom = data.filter((item) => item.roomId === roomId);
  for (let index = 0; index < filterRoom.length; index++) {
    if (
      transform(filterRoom[index].startTime) <= transform(startTime) &&
      transform(startTime) < transform(filterRoom[index].endTime)
    ) {
      return false;
    } else if (
      transform(startTime) < transform(filterRoom[index].endTime) &&
      transform(endTime) > transform(filterRoom[index].startTime)
    ) {
      return false;
    }
  }
  return true;
}

function getBookingsForWeek(roomId, weekNo) {
  let now = new Date("2019-09-22");
  let nowAddWeek = addWeeks(weekNo, new Date("2019-09-22"));
  let filterRoom = data.filter(
    (item) =>
      item.roomId === roomId &&
      transform(item.startTime) > transform(now) &&
      transform(item.startTime) < transform(nowAddWeek)
  );
  return filterRoom;
}

function getBookingsForNextWeek(roomId) {
  let now = new Date("2019-09-22").setDate(
    new Date("2019-09-22").getDate() + 7
  );
  let nextWeek = new Date("2019-09-22").setDate(
    new Date("2019-09-22").getDate() + 7
  );
  let nowAddWeek = addWeeks(1, new Date(nextWeek));

  let filterRoom = data.filter(
    (item) =>
      item.roomId === roomId &&
      transform(item.startTime) > transform(now) &&
      transform(item.startTime) < transform(nowAddWeek)
  );
  return filterRoom;
}

// console.log(getBookingsForWeek("A101", 1));
console.log(getBookingsForNextWeek("A101"));
// console.log(
//   checkAvailability("A102", "2019-09-30 18:00:00", "2019-09-30 18:00:00")
// );
