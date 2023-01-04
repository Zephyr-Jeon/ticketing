// next.config.js file is loaded up and read in automatically by Next whenever the project starts up

// poll all the different files inside the project direcotry automatically once every 300 milliseconds
// instead of watch for file changes since Next is not always sucessfully watching file changes
module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
