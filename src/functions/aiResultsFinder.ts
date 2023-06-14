const aiResultsFinder = async (term: string): Promise<any> => {
  let result;
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${term}?limit=5`,
    );
    const json = await response.json();
    result = json;
    console.log('aiResultsFinder json: ', result);
  } catch (error) {
    console.error(error);
  }
  return result;
};

export default aiResultsFinder;
