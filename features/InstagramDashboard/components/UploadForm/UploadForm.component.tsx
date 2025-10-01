import { getNonFollowers } from "@/actions";
import { Dropzone } from "@/components/shared";
import { Button } from "@/components/ui";
import { Label } from "@/components/ui/label";

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
        <div className="grid gap-3 w-full">
          <Label htmlFor="followers">Followers</Label>
          <Dropzone name="followers" />
        </div>

        <div className="grid gap-3 w-full">
          <Label htmlFor="following">Following</Label>
          <Dropzone name="following" />
        </div>
      </div>
      <Button type="submit">Check Follows</Button>
    </form>
  );
}
