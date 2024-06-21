import { BASE_URL } from '../../assets/constants';

export async function GetAllUpcomingEventsFromDataBase(ID, date, time) {
  let APIURL = `${BASE_URL}/LIUConnect/EventQueries/GetAllUpcomingEvents.php`;

  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application.json',
  };

  let Data = {
    ID: ID,
    date: date,
    time: time,
  };

  try {
    const request = await fetch(APIURL, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify(Data),
    });
    const response = await request.json();

    return response;
  } catch (error) {
    console.log(error);
  }
}
