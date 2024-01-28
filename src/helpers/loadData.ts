const loadData = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  }
  catch (e) {
    console.error(e);
  }
};

export default loadData;
