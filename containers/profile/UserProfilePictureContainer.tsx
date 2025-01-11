import { useEffect, useState } from "react";
import UserProfilePictureSkeleton from "../../components/UserProfilePictureSkeleton";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";
import UserProfilePicture from "../../components/UserProfilePicture";
import { Alert } from "react-native";
import { launchImageLibrary as _launchImageLibrary, launchCamera as _launchCamera, ImageLibraryOptions, MediaType } from 'react-native-image-picker';
import { User } from "../../domain/entities/User";
import { useProfileImageUploader } from "../../hooks/useProfileImageUploader";
import { LocalStorageService } from "../../data/storage/LocalStorageService";

interface ProfileImage {
    uri: string;
  }
let launchImageLibrary = _launchImageLibrary;
let launchCamera = _launchCamera;
interface UserProfilePictureContainerProps  {
    showNameAndEmail? : boolean
    user: User | null
    loading: Boolean
}
const storageService = new LocalStorageService()
const UserProfilePictureContainer: React.FC<UserProfilePictureContainerProps> = ({
  showNameAndEmail = true,
  user,
  loading,
}) => {
  const { uploadProfileImage, loading: uploading, error } = useProfileImageUploader();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  console.log(user)
  useEffect(() => {
    if (user?.profilePicture) {
      setProfileImage(user.profilePicture);
    }
  }, [user]); // This effect runs whenever the user prop changes
  const handleResponse = async (response: any) => {
    if (response.didCancel || !response.assets?.[0]?.uri) {
      console.log('Image selection cancelled');
      return;
    }

    const imageUri = response.assets[0].uri;

    if (user?.identifier) {
      const uploadedImageUrl = await uploadProfileImage(user.identifier,imageUri);
      if (uploadedImageUrl) {
          user.profilePicture = uploadedImageUrl;
         await storageService.save<User>('user',user)
    
        setProfileImage(uploadedImageUrl);
      }
    }
  };

  const openImagePickerOptions = () => {
    Alert.alert(
      'Choose an Option',
      'Select how you want to pick the image',
      [
        { text: 'Camera', onPress: () => launchCamera({ mediaType: 'photo' }, handleResponse) },
        { text: 'Gallery', onPress: () => launchImageLibrary({ mediaType: 'photo' }, handleResponse) },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  if (loading || uploading ) {
    return <UserProfilePictureSkeleton />;
  }
  
  return (
    <UserProfilePicture
      profileImage={profileImage || ''}
      name={showNameAndEmail ? user?.name || '' : ''}
      email={showNameAndEmail ? user?.email || '' : ''}
      onEdit={openImagePickerOptions}
    />
  );
};

export default UserProfilePictureContainer;