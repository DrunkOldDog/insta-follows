import { getNonFollowers } from "@/actions";
import { Button, Input } from "@/components/ui";

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
      <div className="flex gap-12 mb-6">
        <Input type="file" name="followers" />
        <Input type="file" name="following" />
      </div>
      <Button type="submit">Check Follows</Button>
    </form>
  );
}
