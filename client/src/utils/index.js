import axios from 'axios'

export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(true);
};

export async function FileUploadToCloud(image) {
  try {
    const formData = new FormData();
    const folder = process.env.REACT_APP_CLOUDINARY_FOLDER || '';
    const name = process.env.REACT_APP_CLOUDINARY_NAME || '';
    formData.append('file', image);
    formData.append('upload_preset', folder);
    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${name}/image/upload`, formData)
    return data
  } catch (error) {
    return error
  }
} 
