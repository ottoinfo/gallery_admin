const target = (process.env.TARGET || "local")

console.log("Node",process.env.NODE_ENV )

const environments = {
  local: {
    NODE_ENV:  process.env.NODE_ENV,
    namingScheme: "",
    uglify: false,
    API_URL: "http://localhost:3000/api/",
    BASE_URL: "http://localhost:8080/",
  },
  production: {
    NODE_ENV:  process.env.NODE_ENV,
    namingScheme: "-[hash]",
    uglify: true,
    API_URL: "https://sparkler.vpip.io",
    BASE_URL: "https://sparkler.vpip.io/",
  },
};

module.exports = environments[target]