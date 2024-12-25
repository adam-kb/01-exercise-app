import React, { useState } from 'react';
import Image from 'next/image';
import FeedbackMessage from '@/app/ui/FeedbackMessage';

const ImagePicker = ({id}: {id: string}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Reset state when no file is selected (e.g., canceled input)
    if (!file) {
      setFile(null);
      setError(null);
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setFile(null);
      setError('Please select a valid image file (jpg, jpeg, png).');
      return;
    }

    // Validate file size
    if (file.size > 4 * 1024 * 1024) {
      setFile(null);
      setError('File size should be less than 4MB.');
      return;
    }

    // File is valid
    setFile(file);
    setError(null);

    // Logic to save it etc.
  };

  return (
    <div>
      <label htmlFor={id}>Please select a thumbnail for the exercise</label>
      <input
        type="file"
        id={id}
        name={id}
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
      {error && <FeedbackMessage type="error" title="Error:" message={error} />}
      {file && (
        <div>
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            height={100}
            width={100}
          />
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
