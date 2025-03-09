import { MediaType } from '@prisma/client';
import Image from 'next/image';

interface ExerciseThumbnailProps {
  media: {
    mediaKey: string;
    type: MediaType;
  }
}

const ExerciseThumbnail = ({ media }: ExerciseThumbnailProps) => {
  // const youtubeRegex = /^[a-zA-Z0-9_-]{11}$/;
  const { mediaKey, type } = media;

  if (type === "VIDEO") {
    // const youtubeThumbnailUrl = `https://img.youtube.com/vi/${mediaKey}/0.jpg`;
    // return <Image width={200} height={100} style={{ objectFit: "contain" }} src={youtubeThumbnailUrl} alt="YouTube Thumbnail" />;
  } else if (type === "THUMBNAIL") {
    const thumbnailUrl = process.env.NEXT_PUBLIC_MEDIA_SERVER_THUMBNAILS + mediaKey;
    return (
      <Image
        width={200}
        height={200}
        style={{ objectFit: "contain" }}
        src={thumbnailUrl}
        alt="Exercise Thumbnail"
        />
      );
  }
};

export default ExerciseThumbnail;
