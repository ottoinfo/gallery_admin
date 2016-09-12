import api from "superagent"

// import Evaporate from "evaporate"
// import SparkMD5 from "spark-md5"
// import config from "../../env.js"

/**
 * Uploads a file to AWS and returns a key used to link AWS asset with the model
 * @param {object} file      file object from FileReader API
 * @param {object} account   user's own account aka authStore.me
 */
export async function UploadImage(file, account) {
  // const response = await api.get(`/accounts/${account.id}/signUploadKey?fileName=${file.name}`)
  // const key = response.data.key

  // const evap = new Evaporate({
  //   signerUrl: `${api.defaults.baseURL}accounts/${account.id}/signUpload`,
  //   aws_key: config.AWS_KEY,
  //   bucket: "vpip",
  //   computeContentMd5: true,
  //   s3Acceleration: false,
  //   signResponseHandler(res) {
  //     const data = JSON.parse(res)
  //     const { signature } = data
  //     return signature
  //   },
  //   cryptoMd5Method(data) {
  //     return btoa(SparkMD5.ArrayBuffer.hash(data, true))
  //   },
  // })
}