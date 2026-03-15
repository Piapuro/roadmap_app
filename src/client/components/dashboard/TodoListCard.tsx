import type { TodoItem, TodoStatus, TaskPriority } from "@/types/dashboard";

const PRIORITY_BADGE: Record<TaskPriority, { bg: string; text: string }> = {
  P0: { bg: "bg-[#fef2f2]", text: "text-[#ef4444]" },
  P1: { bg: "bg-[#fff7ed]", text: "text-[#f97316]" },
  P2: { bg: "bg-[#f4f4f5]", text: "text-[#71717a]" },
};

const STATUS_DOT: Record<TodoStatus, string> = {
  pending:     "bg-[#d4d4d8]",
  in_progress: "bg-[#FF8400]",
  done:        "bg-[#22c55e]",
};

interface TodoListCardProps {
  todos: TodoItem[];
}

export function TodoListCard({ todos }: TodoListCardProps) {
  return (
    <div className="flex-1 rounded-xl bg-white border border-[#CBCCC9] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#CBCCC9] shrink-0">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[15px] font-semibold">
          今日やること
        </span>
        <span className="font-[family-name:var(--font-geist-sans)] text-[#FF8400] text-[13px] cursor-pointer">
          すべて見る →
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col flex-1">
        {todos.map((todo) => {
          const badge = PRIORITY_BADGE[todo.priority];
          const isDone = todo.status === "done";
          return (
            <div
              key={todo.id}
              className="flex items-center justify-between px-5 py-3.5 border-b border-[#CBCCC9] last:border-b-0"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${STATUS_DOT[todo.status]}`} />
                <span
                  className={`font-[family-name:var(--font-geist-sans)] text-[13px] truncate ${
                    isDone ? "line-through text-[#666666]" : "text-[#111111]"
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <span
                className={`font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-semibold px-2 py-0.5 rounded-full ml-3 shrink-0 ${badge.bg} ${badge.text}`}
              >
                {todo.priority}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
