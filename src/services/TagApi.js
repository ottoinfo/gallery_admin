import api from "superagent"

export default class TagApi {
  url = "/api/tags/"

  fetchTags = ()=> {
    return api.get(this.url).accept("application/json")
  }

  saveTag = (tag)=> {
    if (tag.id) {
      return api.put(this.url + tag.id).send(tag).accept("application/json")
    }
    else {
      return api.post(this.url).send(tag).accept("application/json")
    }
  }

  deleteTag = (tag)=>{
    return api.delete(this.url + tag.id).accept("application/json")
  }
}