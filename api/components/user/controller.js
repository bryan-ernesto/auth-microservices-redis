const auth = require("../auth");
// const nanoid = require("nanoid");
// import { nanoid } from "nanoid";

const TABLA = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }
  function list() {
    return store.list(TABLA);
  }
  function get(id) {
    return store.get(TABLA, id);
  }
  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = between(1, 9999999);
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return store.upsert(TABLA, user);
  }
  return {
    list,
    get,
    upsert,
  };
};

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
