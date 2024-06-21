import { BASE_URL } from '../../assets/constants';

export async function UpdateEventInDataBase(
  ID,
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
  let APIURL = `${BASE_URL}/LIUConnect/EventQueries/UpdateEvent.php`;
  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application.json',
  };
  let Data = {
    ID: ID,
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
