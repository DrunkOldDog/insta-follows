import { getNonFollowers } from "@/actions";
import { Button } from "@/components/ui";
import { DropzoneInput } from "./components";

interface UploadFormProps {
  onNonFollowersFound: (nonFollowers: string[]) => void;
}

export default function UploadFormComponent({
  onNonFollowersFound,
}: UploadFormProps) {
  const handleSubmit = async (formData: FormData) => {
    const nonFollowers = await getNonFollowers(formData);
    onNonFollowersFound(nonFollowers);
  };

  return (
    <form action={handleSubmit}>
      <div className="flex gap-6 mb-6">
        <DropzoneInput name="followers" label="Followers" />
        <DropzoneInput name="following" label="Following" />
      </div>
      <Button type="submit">Check Follows</Button>
    </form>
  );
}
