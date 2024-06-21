import { BASE_URL } from '../../assets/constants';

export async function UpdateClubInDataBase(
  ID,
  name,
  description,
  department,
  status,
  campus,
  rating,
  numOfRatings,
  facebookLink,
  instagramLink,
  linkedinLink,
  adminEmail
) {
  if (facebookLink === '') {
    facebookLink = 'Not Specified';
  }
  if (instagramLink === '') {
    instagramLink = 'Not Specified';
  }
  if (linkedinLink === '') {
    linkedinLink = 'Not Specified';
  }

  let APIURL = `${BASE_URL}/LIUConnect/ClubQueries/UpdateClub.php`;
  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application.json',
  };
  let Data = {
    ID: ID,
    imageURL: 'Not Specified',
    name: name,
    description: description,
    department: department,
    status: status,
    campus: campus,
    rating: rating,
    numOfRatings: numOfRatings,
    facebookLink: facebookLink,
    instagramLink: instagramLink,
    linkedinLink: linkedinLink,
    adminEmail: adminEmail,
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
