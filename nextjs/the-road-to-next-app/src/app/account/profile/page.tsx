import Link from "next/link";
import { Heading } from "@/components/heading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountPasswordPath, accountProfilePath } from "@/paths";

export default function ProfilePage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        description="All your profile information"
        tabs={
          <Tabs>
            <TabsList>
              <TabsTrigger value="profile" asChild>
                <Link href={accountProfilePath()}>Profile</Link>
              </TabsTrigger>
              <TabsTrigger value="password" asChild>
                <Link href={accountPasswordPath()}>Password</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        }
      />
    </div>
  );
}
