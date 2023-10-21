const createNewQuestion = async (
  baseUrl,
  course_id,
  user_uuid,
  title,
  details
) => {
  return await new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      const payload = {
        user_uuid: user_uuid,
        title: title,
        details: details,
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      };
      try {
        const url = `${baseUrl}/questions/${course_id}`;

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(
            `${response.status} - ${response.statusText} - Cannot submit question!`
          );
        }

        const jsonData = await response.json();

        resolve(jsonData);
      } catch (error) {
        alert(error);
        reject(error);
      }
    });
  }, 2000);
};

const apiService = {
  createNewQuestion,
};

export default apiService;
