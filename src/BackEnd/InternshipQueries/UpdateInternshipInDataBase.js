import { BASE_URL } from '../../assets/constants';

export async function UpdateInternshipInDataBase(
  ID,
  publisherEmail,
  name,
  datePosted,
  company,
  type,
  location,
  paid,
  remote,
  duration,
  internshipLink
) {
  if (duration === 'Not Specified') {
    duration = 'Duration Not Specified';
  }
  if (paid === 'Not Specified') {
    instagramLink = 'Payment Not Specified';
  }

  let APIURL = `${BASE_URL}/LIUConnect/InternshipQueries/UpdateInternship.php`;
  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application.json',
  };
  let Data = {
    ID: ID,
    publisherEmail: publisherEmail,
    name: name,
    datePosted: datePosted,
    company: company,
    type: type,
    location: location,
    paid: paid,
    remote: remote,
    duration: duration,
    internshipLink: internshipLink,
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
