import { BASE_URL } from '../../assets/constants';

export async function DeleteUserFromDataBase(ID) {
  let APIURL = `${BASE_URL}/LIUConnect/UsersQueries/DeleteUser.php`;

  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let Data = { email: ID };

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
