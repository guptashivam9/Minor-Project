import {  useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import './image.css';

function Image() {
  const [image, setImage] = useState(null);
  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append('id', id);

    try {
      const result = await axios.post(
        "http://localhost:5001/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result.data);

      navigate("/userprofile", { state: id });
    } catch (error) {
      console.error("Error submitting image:", error);
      // Handle error if needed
    }
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    previewImage(e); // Call previewImage function when input changes
  };

  const previewImage = (e) => {
    const reader = new FileReader();
    reader.onload = function () {
      const preview = document.getElementById('previewImage');
      preview.src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  };
 
  return (
    <div className="upload-card">
      <div className="photo">
        Upload Your Profile Picture
      </div>
      <form onSubmit={submitImage}>  
        <label htmlFor="fileInput" className="custom-file-upload">Choose File</label>
        <input id="fileInput" className="file-input" type="file" accept="image/*" onChange={onInputChange} />
        <div className="image-preview">
          <img id="previewImage" src="#" alt="Preview"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Image;
