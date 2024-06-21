import { BASE_URL } from '../../assets/constants';

export async function GetAllClubsFromDataBase() {
  let APIURL = `${BASE_URL}/LIUConnect/ClubQueries/GetAllClubs.php`;

  try {
    const request = await fetch(APIURL);
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
