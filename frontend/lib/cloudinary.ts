/**
 * Cloudinary Image Upload Utility
 * Handles uploading images to Cloudinary cloud storage
 */

/**
 * Upload an image file to Cloudinary
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} The secure URL of the uploaded image
 * @throws {Error} If the upload fails
 */
export async function uploadImage(file: File): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error('CLOUDINARY_CLOUD_NAME environment variable is not set');
  }

  // Prepare form data for upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portfolio_upload");

  // Upload to Cloudinary
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  // Parse response and return secure URL
  const data = await res.json();
  return data.secure_url;
}