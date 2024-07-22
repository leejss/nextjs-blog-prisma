import Button from "@/components/Button";
import { selectPostById } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";
import DeletePostButton from "./_components/DeletePostButton";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const result = await selectPostById(+params.id);
  if (result.isFail()) {
    return <div>{result.error.message}</div>;
  }
  const { title, updatedAt, content, id } = result.value;
  return (
    <div className="flex flex-col h-[90vh]">
      <section>
        <header className="pb-4 border-b border-black">
          <h1 className="text-2xl font-bold">{title}</h1>
          <span className="text-sm text-gray-500">{formatDate(updatedAt)}</span>
        </header>
        <div className="mt-4">
          <p>{content}</p>
        </div>
      </section>
      <div className="flex  gap-4 mt-auto">
        {/* Go to edit page */}
        <Button className="flex-1">EDIT</Button>
        {/* Delete form  */}
        <DeletePostButton postId={id} />
      </div>
    </div>
  );
}
