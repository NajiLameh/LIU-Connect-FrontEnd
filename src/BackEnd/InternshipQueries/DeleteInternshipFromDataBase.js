import { BASE_URL } from '../../assets/constants';

export async function DeleteInternshipFromDataBase(ID) {
  let APIURL = `${BASE_URL}/LIUConnect/InternshipQueries/DeleteInternship.php`;

  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let Data = { ID: ID };

  try {
    const request = await fetch(APIURL, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify(Data),
    });
    const response = await request.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
