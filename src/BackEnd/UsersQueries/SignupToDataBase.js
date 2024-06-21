import { BASE_URL } from '../../assets/constants';

export async function SignupToDataBase(
  firstName,
  lastName,
  email,
  password,
  phoneExtension,
  phoneNumber,
  role,
  campus
) {
  let userName = email.split('@')[0];
  phoneNumber = phoneExtension + ' ' + phoneNumber;
  if (!campus) {
    let campusIdentifier = userName.charAt(0);
    switch (campusIdentifier) {
      case '1':
        campus = 'Beirut';
        break;
      case '2':
        campus = 'Bekaa';
        break;
      case '3':
        campus = 'Tripoli';
        break;
      case '4':
        campus = 'Saida';
        break;
      case '5':
        campus = 'Nabatieh';
      default:
        campus = 'Bekaa';
        break;
    }
  }

  let APIURL = `${BASE_URL}/LIUConnect/UsersQueries/Signup.php`;
  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application.json',
  };
  let Data = {
    imageURL: 'Not Specified',
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    role: role,
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
