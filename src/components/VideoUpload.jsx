import React, { useState } from "react";
import videoLogo from "../assets/icon-1.png";
import {
  Alert,
  Button,
  Card,
  FileInput,
  Label,
  Progress,
  Textarea,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";
const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const handleFieldChange = (event) => {
    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    });
  };

  function resetForm(){
    setMeta({
      title:"",
      description:""
    })
    setSelectedFile(null)
    setUploading(false)
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();
    // console.log(meta);
      // if(!selectedFile){
      //   alert("Select the File!")
      // }

    //submit the file to the server
    saveVideoToServer(selectedFile,meta);
  }

  //submit the file to the server
  const saveVideoToServer = async (video, videoMetaData) => {
    setUploading(true);

    //API call 
    try{

      const formData = new FormData();
      formData.append("title",videoMetaData.title);
      formData.append("description",videoMetaData.description);
      formData.append("file",selectedFile);


     const response = await axios.post('http://localhost:8080/api/v1/videos',formData,{
        headers:{
          "Content-Type":"multipart/formData"
        },
        onUploadProgress:(progressEvent)=>{

          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          console.log(progress)
          setProgress(progress);

        }
      })
      
      console.log(response)
      setMessage("File uploaded")
      setUploading(false);
      toast.success("File uploaded successfully !!")
      resetForm();
    }catch(error){
        console.log(error);
        setMessage("Error in uploading file");
        setUploading(false)
        toast.error("File not uploaded !!");
    }
  };

  return (
    <>
      <Card className="flex flex-col items-center justify-center">
        <h1 className="dark:text-blue-300 text-lg font-semibold text-gray-700">
          Videos Uploads
        </h1>

        <div>
          <form
            onSubmit={handleForm}
            noValidate
            className="space-y-6 flex flex-col"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Video Title" />
              </div>
              <TextInput
              value={meta.title}
                onChange={handleFieldChange}
                name="title"
                placeholder="Enter title"
              />
            </div>

            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Video Description" />
              </div>
              <Textarea
              value={meta.description}
                onChange={handleFieldChange}
                name="description"
                id="comment"
                placeholder="Enter description"
                required
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-7 justify-center">
              <div className="shrink-0">
                <img
                  className="h-16 w-16 object-cover rounded-sm"
                  src={videoLogo}
                />
              </div>
              <label className="block">
                <span className="sr-only">Choose Video file</span>
                <input
                  name="file"
                  onChange={handleFileChange}
                  type="file"
                  className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                />
              </label>
            </div>

            <div>
              {uploading && (
            <Progress progress={progress} textLabel="Uploading" size="xl" labelProgress labelText />
              )}
            </div>

            <div className="">
              {message && (
                <Alert color="success" onDismiss={()=> setMessage('')}>
                <span className="font-medium">Success Alert!</span>
                {message}
              </Alert>
              )}
            </div>

            <div className="flex justify-center">
              <Button disabled={uploading} type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
};

export default VideoUpload;
