"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import { SelectUser } from "@/lib/db";
import { deleteUser } from "./actions";
import { useRouter } from "next/navigation";

export function RewardsTable({
  users,
  offset,
}: {
  users: [];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="w-full rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Transaction Id</TableHead>
              <TableHead className="max-w-[150px] md:table-cell">
                Destination
              </TableHead>
              <TableHead className="w-[80px] md:table-cell">Fee</TableHead>
              <TableHead className="w-[80px] md:table-cell">Miles</TableHead>
              <TableHead className="w-[150px] md:table-cell">
                Journey Duration
              </TableHead>

              <TableHead className="w-[150px] md:table-cell">
                Rewards&Cashback
              </TableHead>
              <TableHead className="w-[50px] md:table-cell">
                Reward Type
              </TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>

              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <RewardsRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function RewardsRow({ user }: { user: [] }) {
  const userId = user.id;
  const deleteUserWithId = deleteUser.bind(null, userId);

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={deleteUserWithId}
          disabled
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
