// /src/Checklist.jsx
import React, { useState } from "react";

export default function Checklist({
  checklist,
  onAddTask,
  onToggleTask,
  onRemoveTask,
  onEditTitle,
  onReset
}) {
  const [taskInput, setTaskInput] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(checklist.title);

  const handleAdd = (e) => {
    e && e.preventDefault();
    const t = taskInput.trim();
    if (!t) return;
    onAddTask(t);
    setTaskInput("");
  };

  const completedCount = checklist.tasks.filter((t) => t.done).length;
  const totalCount = checklist.tasks.length;
  const completionPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const saveTitle = () => {
    const t = titleDraft.trim();
    if (t && t !== checklist.title) onEditTitle(t);
    setEditingTitle(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {!editingTitle ? (
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">{checklist.title}</h3>
              <button
                onClick={() => {
                  setTitleDraft(checklist.title);
                  setEditingTitle(true);
                }}
                className="text-xs text-slate-500 px-2 py-1 rounded-md hover:bg-slate-50"
              >
                Ред.
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                className="px-2 py-1 border rounded-md"
              />
              <button onClick={saveTitle} className="btn bg-green-600 text-white">
                Сохранить
              </button>
              <button onClick={() => setEditingTitle(false)} className="btn bg-slate-50 border">
                Отмена
              </button>
            </div>
          )}
          <div className="text-xs text-slate-400 mt-1">{completionPercent}% завершено</div>
        </div>

        <div className="text-xs text-slate-500">
          <button
            onClick={onReset}
            className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100"
            title="Сбросить все галочки"
          >
            Сбросить
          </button>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Добавить задачу..."
          className="flex-1 px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
        />
        <button type="submit" className="btn bg-violet-600 text-white">
          Добавить
        </button>
      </form>

      <ul className="space-y-2">
        {checklist.tasks.length === 0 && (
          <li className="text-sm text-slate-400">Задачи отсутствуют — добавьте первую.</li>
        )}

        {checklist.tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-2 rounded-md border border-slate-100">
            <label className="flex items-center gap-3 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={!!task.done}
                onChange={() => onToggleTask(task.id)}
                className="w-4 h-4"
              />
              <span className={`text-sm ${task.done ? "line-through text-slate-400" : "text-slate-800"}`}>
                {task.text}
              </span>
            </label>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onRemoveTask(task.id)}
                className="text-xs px-2 py-1 rounded-md bg-red-50 text-red-600"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
