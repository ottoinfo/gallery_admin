import api from "superagent"

export default class GalleryApi {
  url = "/api/galleries/"

  fetchGalleries = ()=> {
    return api.get(this.url).accept("application/json")
  }

  saveGallery = (gallery)=> {
    if (gallery.id) {
      return api.put(this.url + gallery.id).send(gallery).accept("application/json")
    }
    else {
      return api.post(this.url).send(gallery).accept("application/json")
    }
  }

  deleteGallery = (gallery)=>{
    return api.delete(this.url + gallery.id).accept("application/json")
  }
}