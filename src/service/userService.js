import { userUrl } from "./BaseUrl";

const getUser = async () => {
  try {
    const res = await fetch(userUrl);
    if (res.status == 200) {
      const data = res.json();
      return data;
    }
  } catch (error) {
    console.log("Fetch user--", error);
  }
};

const loadMoreUsers = async (limit, skip) => {
  try {
    const res = await fetch(`${userUrl}?limit=${limit}&skip=${skip}`);
    if (res.status == 200) {
      const data = res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  getUser,
  loadMoreUsers,
};
