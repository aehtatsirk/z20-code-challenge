var Request = require("request");

post();
async function post() {
  const NICKNAME = "krista";

  Request.post(
    {
      url: `http://challenge.z2o.cloud/challenges?nickname=${NICKNAME}`
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      const res = JSON.parse(body);
      return put(res.id);
    }
  );
}

async function put(challengeId) {
  Request.put(
    {
      headers: { "X-Challenge-Id": challengeId },
      url: "http://challenge.z2o.cloud/challenges"
    },
    (error, response, body) => {
      if (error) {
        return console.log(error);
      }
      const res = JSON.parse(body);
      const diffCalc = res["actives_at"] - new Date().getTime();

      if (diffCalc > 0) {
        console.log(res);
        setTimeout(function() {
          return put(res.id);
        }, diffCalc);
      } else {
        if (res.result.url === null) {
          console.log("Failed!");
          setTimeout(function() {
            return post();
          }, diffCalc);
        } else {
          console.log(res);
          console.log("Success");
        }
      }
    }
  );
}
