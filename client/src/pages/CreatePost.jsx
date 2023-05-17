import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const shareBtnClassName = (form.prompt && form.photo) ? 'mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center': 'mt-3 text-white bg-[#ccceff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
  const generateBtnClassName = (form.prompt) ? 'text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' : 'text-white bg-green-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
  const disabled = (form.prompt) ? false : true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })

      await response.json();
      navigate('/');
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }
  
  const handleChange = (e) => {
    /* `setForm({ ...form, [e.target.name]: e.target.value });` is updating the state of the `form`
    object by spreading the current state and updating the value of the property with the name equal
    to the `name` attribute of the input element that triggered the `handleChange` function with the
    value of that input element. This allows for dynamic updating of the form state as the user
    types into the input fields. */
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }
  
  const generateImage = async () => {
    // If prompt field is not empty
    if(form.prompt) {
      try {
        // Display loading indicator on the image field
        setGeneratingImg(true);
        
        /* This code is making a POST request to the URL 'http://localhost:8080/api/v1/dalle' with a
        JSON payload containing the value of the `prompt` field in the `form` state. The `await`
        keyword is used to wait for the response from the server before continuing execution. The
        response from the server is stored in the `response` variable. */
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          /* `method: 'POST',` is setting the HTTP request method to POST. This means that the request
          is intended to create a new resource on the server, and the data to create that resource
          is included in the request body. In this case, the request body is a JSON payload
          containing the value of the `prompt` field in the `form` state. */
          method: 'POST',
          /* `headers: {'Content-Type': 'application/json'}` is setting the content type of the request
          to JSON. This is necessary because the request body is being sent as a JSON payload. By
          setting the content type to JSON, the server knows to expect a JSON payload in the request
          body and can parse it accordingly. */
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Enter a prompt to generate');
    }
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">Create imaginative and visually stunning images through DALL-E AI and share them with the community </p>
      </div>

      <form className="mt-16 max-w-3xl" onClick={(form.prompt && form.photo) ? handleSubmit : null}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
  
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className={generateBtnClassName}
            disabled={disabled}
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Once you have created the image you want, you can share it with others in the community.</p>
          <button
            type="submit"
            className={shareBtnClassName}
            disabled={disabled}
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost;