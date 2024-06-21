import { BASE_URL } from '../../assets/constants';

export async function UpdateItemInDataBase(
  ID,
  name,
  description,
  condition,
  category,
  campus,
  price,
  publisherEmail
) {
  let APIURL = `${BASE_URL}/LIUConnect/ItemQueries/UpdateItem.php`;
  let Headers = {
    Accept: 'application/json',
    'Content-Type': 'application.json',
  };
  let Data = {
    ID: ID,
    name: name,
    description: description,
    condition: condition,
    category: category,
    campus: campus,
    price: price,
    publisherEmail: publisherEmail,
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
