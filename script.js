const videoElement = document.getElementById("video");
const button = document.getElementById("button");

async function selectMediaStream() {
  try {
    // Prompt to select media stream, pass to video element
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
    // Listen for the end of the stream
    mediaStream.getVideoTracks()[0].addEventListener("ended", () => {
      // Reset button
      button.disabled = false;
      // Stop the video element
      videoElement.pause();
      videoElement.srcObject = null;
    });
  } catch (error) {
    console.error("Error accessing media devices.", error);
  }
}

button.addEventListener("click", async () => {
  await selectMediaStream();
  // Disable button
  button.disabled = true;
  // Start picture in picture
  await videoElement.requestPictureInPicture();
  // Reset button
  button.disabled = false;
});

// On load
selectMediaStream();
