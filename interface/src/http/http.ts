async function Post(path: string, value: string) {
  const url = " http://127.0.0.1:8000";

  try {
    const response = await fetch(url + "/" + path, {
      method: "POST",
      body: JSON.stringify({ user_message: value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

export { Post };