import { useState } from 'react';
import Image from 'next/image';
import ExerciseThumbnail from '@/app/ui/exercises/ExerciseThumbnail';
import { FileInput } from '@/app/ui/FormInputs';

const ImagePicker = ({ id, defaultImage }: { id: string, defaultImage?: string }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  return (
    <div>
      <FileInput
        name={id}
        label="Please provide an image for the exercise"
        onFileChange={handleFileChange}
      />

      {file && (
        <div>
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            height={100}
            width={100}
            style={{objectFit: "contain"}}
          />
        </div>
      )}
      {(!file && defaultImage) && (
        <ExerciseThumbnail media={{ mediaKey: defaultImage, type: "THUMBNAIL" }} />
      )}
    </div>
  );
};

export default ImagePicker;
