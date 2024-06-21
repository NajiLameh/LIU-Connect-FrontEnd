import { BASE_URL } from '../../assets/constants';

export async function JoinClubInDataBase(clubID, userID) {
  let APIURL = `${BASE_URL}/LIUConnect/ClubQueries/JoinClub.php`;
  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application.json',
  };
  let Data = { clubID: clubID, userID: userID };

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
