import api from "superagent"

export default class ImageApi {
  url = "/api/images/"

  fetchImages() {
    return api.get(this.url).accept("application/json")
  }

  saveImage(image) {
    if (image.id) {
      return api.put(this.url + image.id).send(image).accept("application/json")
    }
    else {
      return api.post(this.url).send(image).accept("application/json")
    }
  }

  deleteImage(image) {
    return api.delete(this.url + image.id).accept("application/json")
  }

  uploadImages(files=[]) {
    console.log("api", files)
    const req = api.post("/api/upload/image").accept("application/json")
    // enctype="multipart/form-data"
    files.map(file => 
      req.attach("files", file)
    )
    return req
  }
}

// ------WebKitFormBoundarytepi9aA17Lfxsgnt
// Content-Disposition: form-data; name="files[]"; filename="IMG_5122.JPG"
// Content-Type: image/jpeg

// ------WebKitFormBoundaryQgpAYEOZkSoPGqHm
// Content-Disposition: form-data; name="IMG_5125.JPG"; filename="IMG_5125.JPG"
// Content-Type: image/jpeg

// ------WebKitFormBoundaryfI6rzfgILo7SuNUY
// Content-Disposition: form-data; name="files[]"; filename="IMG_5111.JPG"
// Content-Type: image/jpeg
