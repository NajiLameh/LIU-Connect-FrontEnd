import { BASE_URL } from '../../assets/constants';

export async function InsertEventToDataBase(
  clubID,
  name,
  info,
  type,
  location,
  date,
  time,
  campus
) {
  clubID = clubID.split('/')[1];
  let APIURL = `${BASE_URL}/LIUConnect/EventQueries/InsertNewEvent.php`;
  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application.json',
  };
  let Data = {
    clubID: clubID,
    name: name,
    info: info,
    type: type,
    location: location,
    date: date,
    time: time,
    campus: campus,
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
