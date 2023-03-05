import data from "../data.json";
function transform(date) {
  return new Date(date).getTime();
}

function addWeeks(weeks, date = new Date()) {
  date.setDate(date.getDate() + weeks * 7);
  return date;
}

export function mapDate() {}

export function checkAvailability(roomId, startTime, endTime) {
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

export function getBookingsForWeek({ now, roomId, weekNo }) {
  let setNow = new Date(now);
  let nowAddWeek = addWeeks(weekNo, new Date(now));
  let filterRoom = data.filter(
    (item) =>
      item.roomId === roomId &&
      transform(item.startTime) > transform(setNow) &&
      transform(item.startTime) < transform(nowAddWeek)
  );

  filterRoom.sort((a, b) => {
    return new Date(a.startTime) - new Date(b.startTime);
  });

  let mapDate = [];
  let date;
  let lst = [];
  for (let index = 0; index < filterRoom.length; index++) {
    if (!date) {
      lst.push(filterRoom[index]);
      date = new Date(filterRoom[index].startTime).toDateString();
    } else if (date === new Date(filterRoom[index].startTime).toDateString()) {
      lst.push(filterRoom[index]);
    } else {
      date = new Date(filterRoom[index].startTime).toDateString();
      mapDate.push(lst);
      lst = [filterRoom[index]];
    }
  }
  mapDate.push(lst);

  return mapDate;
}

export function getBookingsForNextWeek(roomId) {
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
