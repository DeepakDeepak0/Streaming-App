import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VideoUpload from "./components/VideoUpload";
import { Toaster } from "react-hot-toast";

function App() {
  const [videoId, setVideoId] = useState(
    "bb49d1be-7105-4640-82d9-c0afc1214b70"
  );

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center space-y-9 justify-center py-9">
        <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-100 text-center">
          Video Streaming Application
        </h1>

        <div className="flex sm:flex-row-reverse w-full sm:justify-around flex-col-reverse">
          <div className="p-5">
            <h1 className="text-white text-center text-xl">Playing Video</h1>

            <video className='size-96' src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`} controls></video>

            {/* <video
              id="my-video"
              className="video-js"
              controls
              preload="auto"
              width="640"
              data-setup="{}"
            >
              <source
                src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`}
                type="video/mp4"
              />
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that
                <a
                  href="https://videojs.com/html5-video-support/"
                  target="_blank"
                >
                  supports HTML5 video
                </a>
              </p>
            </video> */}
          </div>

          <div className="p-5">
            <VideoUpload />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
