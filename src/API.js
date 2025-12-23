import axios from "axios";

const APIURL = "http://localhost:4000/posts";

export const getPosts = async()=>{
    try{
        const response = await axios.get(APIURL);
        return response.data;
    }
    catch(err){
        console.error("Error fetching posts:",err);
    }
};

export const getPostById = async (id)=>{
    try{
        const response = await axios.get(`${APIURL}/${id}`);
        return response.data;
    }
    catch(err){
        console.error("Error fetching post:",err);
    }
}

export const createPost = async(postData) =>{
    try{
        const response = await axios.post(APIURL,postData);
        return response.data;
    }
    catch (error) {
        console.error("Error creating post:", error);
    }
};

export const updatePost = async (id, postData) => {
    try {
      const response = await axios.patch(`${APIURL}/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
    }
};

export const deletePost = async (id) => {
    try {
      await axios.delete(`${APIURL}/${id}`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
};