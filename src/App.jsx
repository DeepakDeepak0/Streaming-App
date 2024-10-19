import { useState } from "react";
import VideoUpload from "./components/VideoUpload";
import { Toaster } from "react-hot-toast";
import VideoPlayer from "./components/VideoPlayer";
import { Button, TextInput } from "flowbite-react";

function App() {
  const [videoId, setVideoId] = useState("");

  const [fieldValue, setFieldValue] = useState(null);

  function handleVideoIdChange(event) {
    setFieldValue(event.target.value);
    console.log(fieldValue);
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center space-y-9 justify-center py-9">
        <h1 className=" text-4xl font-bold text-gray-700 dark:text-gray-100 text-center">
          Video Streaming Application
        </h1>

        <div className="flex sm:flex-row-reverse w-full sm:justify-around flex-col-reverse">
          <div className="mx-auto my-7 p-3 sm:mx-0 sm:my-0">
            <h1 className="text-white text-center my-6 text-xl">
              Video Player
            </h1>

            {/* <video className='size-96' src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`} controls poster={image2}></video> */}

            {/* <video src="http://localhost:8080/api/v1/videos/bb49d1be-7105-4640-82d9-c0afc1214b70/master.m3u8"></video> */}

            <VideoPlayer
              src={`http://localhost:8080/api/v1/videos/${videoId}/master.m3u8`}
            ></VideoPlayer>
          </div>

          <div className="p-3">
            <VideoUpload />
          </div>
        </div>

        <div className="flex space-x-2 ">
          <TextInput
            className="dark:shadow-sm rounded-md dark:shadow-white"
            onClick={handleVideoIdChange}
            size={32}
            name="video-id-field"
            placeholder="Enter video Id"
          ></TextInput>
          <Button
            className="dark:shadow-inner dark:shadow-white"
            onClick={() => setVideoId(fieldValue)}
          >
            {" "}
            Play{" "}
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
