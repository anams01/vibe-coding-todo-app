import type { Item } from "../types";
import Tag from "./Tag";

interface TaskCardProps {
  item: Item;
  onDelete: (itemId: number) => void;
  onEdit: (item: Item) => void;
  onDragStart: (e: React.DragEvent<HTMLElement>, item: Item) => void;
}

// Calculate days remaining and color based on due date
function getDueDateInfo(dueDate: string | undefined): {
  text: string;
  color: string;
} | null {
  if (!dueDate) return null;

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let color = "";
  let text = "";

  if (diffDays < 0) {
    color = "text-red-600 bg-red-50 border-red-200";
    text = `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? "s" : ""}`;
  } else if (diffDays === 0) {
    color = "text-red-600 bg-red-50 border-red-200";
    text = "Due today";
  } else if (diffDays === 1) {
    color = "text-orange-600 bg-orange-50 border-orange-200";
    text = "Due tomorrow";
  } else if (diffDays <= 7) {
    color = "text-orange-600 bg-orange-50 border-orange-200";
    text = `Due in ${diffDays} days`;
  } else {
    color = "text-green-600 bg-green-50 border-green-200";
    text = `Due in ${diffDays} days`;
  }

  return { text, color };
}

export default function TaskCard({
  item,
  onDelete,
  onEdit,
  onDragStart,
}: TaskCardProps) {
  const dueDateInfo = getDueDateInfo(item.due_date);

  return (
    <article
      data-testid={`task-${item.id}`}
      className="group rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md cursor-grab"
      draggable
      onDragStart={(e) => onDragStart(e, item)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-slate-800">{item.name}</h3>
          {item.description && (
            <p className="mt-1 text-xs text-slate-500">{item.description}</p>
          )}
          {dueDateInfo && (
            <div
              data-testid={`task-due-date-${item.id}`}
              className={`mt-2 inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${dueDateInfo.color}`}
            >
              {dueDateInfo.text}
            </div>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <Tag key={tag.id} name={tag.name} color={tag.color} />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            data-testid={`edit-task-${item.id}`}
            onClick={() => onEdit(item)}
            className="opacity-0 group-hover:opacity-100 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300"
          >
            Edit
          </button>
          <button
            data-testid={`delete-task-${item.id}`}
            onClick={() => onDelete(item.id)}
            className="opacity-0 group-hover:opacity-100 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
