import { useState } from 'react';
import { DIContainer } from '../di/container';
export const useProfileImageUploader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadProfileImage = async (identifier: string, imageUri: string): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
    const profileImageUrl = await DIContainer.updateProfilePictureUseCase.execute(identifier, imageUri);
      return profileImageUrl.profilePicture;
    } catch (err) {
      setError('Failed to upload image');
      const errr = JSON.stringify(err)
      console.error(errr);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadProfileImage, loading, error };
};
