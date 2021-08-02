require('dotenv').config()
const SendRequest = require("./controller");
const { mergeImages } = require("./utils");

// request dataset
const dataSet = {
  greeting : 'Hello',
  who : 'You',
  width : 400,
  height : 500,
  color : 'Pink',
  size : 100,
};

console.log("recieving images")

// funtion to receive data
async function fetchDetails() {
  let newdataSet = {...dataSet}
  const firstResp = await new SendRequest().fetchImage(dataSet).then( firstResponse => {
  // changes for the second request dataset
  console.log("first image received")
  newdataSet.greeting = "who";
  return firstResponse
})

  // second request
  const secondResp = await new SendRequest().fetchImage(newdataSet).then( secondResponse => {
    console.log("second image recieved")
    return secondResponse
  })

  //paras : binary : first response , binary : second responce, dict : width and height
  await mergeImages(firstResp, secondResp, (({ width, height }) => ({ width, height }))(dataSet))
}

// receive images
fetchDetails()

console.log("----------------------------")